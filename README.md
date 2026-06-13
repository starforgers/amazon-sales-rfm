# E-Commerce Sales Dashboard

An end-to-end sales analytics project covering data cleaning, exploratory analysis, RFM customer segmentation, and an interactive dashboard. Built on a real-world Q2 2022 Amazon India fashion dataset covering 128,968 orders and ₹7.17 Cr in revenue across 149 B2B customers.

---

## Project Structure

```
ecommerce-sales-dashboard/
├── csv/
│   ├── amazon_sales_report.csv   Raw Amazon order data (128,968 rows)
│   ├── customer_sales.csv        Raw B2B customer transactions
│   ├── product_catalog.csv       Raw product/SKU inventory data
│   └── clean/
│       ├── amazon_dashboard.csv  Cleaned orders export for dashboard
│       ├── customer_rfm.csv      RFM-scored customer segments
│       └── catalog_export.csv    Normalised product catalog
├── eda.ipynb                     EDA, cleaning, and export notebook
├── clean.py                      Standalone cleaning script
└── dashboard/                    React/Vite frontend
```

---

## Data Pipeline

```
Raw CSVs (csv/)
    │
    ▼
eda.ipynb  ─────────── 8-phase EDA & cleaning
    │
    ▼
Clean CSVs (csv/clean/)
    │
    ▼
dashboard/src/data/dashboardData.js  ─── Static constants for the UI
```

---

## Data Preprocessing & Analysis (`eda.ipynb`)

The notebook walks through 8 structured phases. Each phase is self-contained — findings from one phase drive decisions in the next.

### Datasets

| File | Description | Rows |
|---|---|---|
| `amazon_sales_report.csv` | Per-order transactional data: SKU, category, size, status, fulfilment, city/state, quantity, amount | ~128,000 |
| `customer_sales.csv` | B2B customer purchase history: date, customer name, SKU, pieces, rate, gross amount | ~14,000 |
| `product_catalog.csv` | SKU-level inventory: design number, stock, category, size, colour | ~5,700 |

---

### Phase 0 — Setup
Imports (`pandas`, `numpy`, `matplotlib`, `seaborn`), display settings, and consistent plot theme. All three raw CSVs are loaded here.

---

### Phase 1 — Initial Inspection
Quick structural overview of each dataset: shape, column dtypes, sample rows, and `describe()` stats. This surfaces two early anomalies — a date column in `customer_sales` containing customer names (shifted rows), and `#REF!` Excel errors leaked into the product catalog.

---

### Phase 2 — Data Quality Assessment

Systematic quality checks before any fix is applied:

- **Missing values** — quantified per column with percentage shares
- **Full-row duplicates** — checked across all three datasets
- **Key duplicates** — Order ID uniqueness in `amazon_sales_report`; composite key `(DATE, CUSTOMER, SKU)` in `customer_sales`; SKU Code uniqueness in the catalog
- **Multi-SKU orders** — identifying orders with more than one line item
- **True duplicates** — orders sharing `(Order ID, SKU, ASIN)` flagged as data entry repeats
- **Column misalignment** — rows where `DATE` holds a customer name (subtotal rows from the Excel source)
- **Excel error leakage** — `#REF!`, `#N/A`, `#VALUE!`, and related strings found in the catalog

---

### Phase 3 — Data Cleaning

Each fix maps directly to a finding from Phase 2:

| Issue | Fix |
|---|---|
| True duplicate order lines | Drop on `(Order ID, SKU, ASIN)`, keep first |
| Stray export-index columns (`index`, `Unnamed: 22`) | Dropped |
| `ship-postal-code` stored as float (`400081.0`) | Cast to zero-padded 6-digit string |
| `Date` / `DATE` as strings | Parsed to `datetime` with `format="%m-%d-%y"` |
| Non-numeric `PCS`, `RATE`, `GROSS AMT` | Cast via `pd.to_numeric(errors="coerce")` |
| Category casing inconsistency (`"kurta"` vs `"Kurta"`) | Normalised to title-case |
| Misaligned subtotal rows in `customer_sales` | Dropped (rows where DATE fails the date-pattern regex) |
| Excel errors in catalog | Replaced with `NaN` |
| `Amount = NaN` on cancelled/unshipped orders | Set to 0 |
| Dropped columns | `promotion-ids`, `fulfilled-by` (single-value / mostly null) |
| SKU join-key normalisation | `str.strip().str.upper()` on both tables before any join |

After cleaning: **128,975 → 128,468 rows** in the Amazon dataset; customer and catalog datasets are fully clean with no null key columns.

---

### Phase 4 — Feature Engineering

New columns derived from the cleaned data:

- `order_month` — period string (`"2022-04"`) for monthly aggregation without date logic at query time
- `order_dow` — day-of-week name for temporal pattern analysis
- `is_cancelled`, `is_returned`, `is_shipped` — boolean flags from the verbose `Status` string (regex-matched); simpler for aggregation than parsing at the dashboard layer
- `revenue` — alias for `Amount`, set to 0 for all non-revenue events

**RFM table** (on `customer_sales`)  
Snapshot date = max purchase date + 1 day (2021-08-28).  
Customer-level aggregation: `recency` = days since last purchase, `frequency` = unique purchase dates, `monetary` = sum of `GROSS AMT`.  
Quintile scoring: R 5→1 (lower recency = better), F and M 1→5 (higher = better).  
Composite score: `RFM_score = R_score * 100 + F_score * 10 + M_score`.

**Segment rules (9 segments):**

| Segment | Rule |
|---|---|
| Champions | R≥4, F≥4, M≥4 |
| Loyal | R≥4, F≥3 |
| Big Spenders | R≥4, M≥4 |
| New / Recent | R≥4 |
| Potential Loyalists | R≥3, F≥3 |
| Needs Attention | R=3 |
| At Risk | R=2 |
| Hibernating | R=1, F≥2 |
| Lost | R=1, F=1 |

---

### Phase 5 — Univariate Analysis

Single-variable distributions examined for shape, concentration, and headline metric selection:

- **Revenue per order** — right-skewed; median (₹605) used on dashboard rather than mean, which inflates under B2B/multi-item outliers
- **Orders per month** — Apr 44,980 · May 49,821 · Jun 34,167 (Jun is a partial month at export cutoff)
- **Category mix** — Set (39.1%) and Kurta (38.8%) together carry 78% of volume
- **Size distribution** — peaks at M/L, tapers to large sizes
- **Order status** — ~60% Shipped, 22% Delivered, 14.2% Cancelled (above industry benchmark of ~10%), 1.6% Returned
- **RFM component distributions** — recency bimodal (recent vs lapsed cluster); frequency heavily right-skewed (most customers buy infrequently); monetary log-normal
- **Segment counts** — At Risk (40) is the largest segment; Champions (21) hold the highest revenue share

---

### Phase 6 — Bivariate & Segment Analysis

Cross-variable analysis to find stories the univariate view misses:

- **Revenue vs order count by category** — Kurta and Set lead on volume; Western Dress punches above its order share in revenue (higher AOV), worth a dashboard callout
- **Cancellation rate by category** — dataset-wide baseline ~14.2%; categories visibly above it flagged for stock/listing investigation
- **Revenue by state (top 15)** — Maharashtra and Karnataka lead; top 5 states drive a majority of revenue, indicating geographic concentration
- **Monthly revenue by top categories** — parallel decline across all categories in Jun, consistent with a partial-month data cutoff rather than a real trend
- **RFM segment revenue contribution** — Champions (14% of customers) hold a disproportionate revenue share; At Risk segment quantifies the revenue at stake if churned customers are not won back
- **Fulfilment and B2B effect on AOV** — Amazon-fulfilled orders show slightly higher AOV; B2B flag correlates with meaningfully larger basket sizes

---

### Phase 7 — RFM Deep Dive

- **Segment profile table** — mean R/F/M per segment; confirms Champions have the lowest recency and highest monetary; Lost sit at the opposite extreme
- **R × F heatmap coloured by avg monetary** — top-right corner (R=5, F=5) is the darkest cell, validating the scoring; bottom-right (R=1, F=5) = At Risk high-frequency churners, the most urgent win-back targets
- **Champions vs Lost distribution** — side-by-side R/F/M histograms showing the gap the marketing budget should target
- **Top 20 customers by monetary** — named account list used to populate the dashboard's Top Customers tab; cross-referenced segment labels identify any high-spend customers who have drifted to At Risk or Hibernating
- **Segment action map** — one recommended CRM action per segment, carried directly into the dashboard's RFM Intelligence panel

---

### Phase 8 — Dashboard Prep & Export

Final column selection, renaming, and quality gate before writing to disk:

| Export | Columns | Purpose |
|---|---|---|
| `amazon_dashboard.csv` | order_id, date, order_month, order_dow, Category, Size, SKU, ASIN, Fulfilment, service_level, courier_status, status, is_shipped, is_cancelled, is_returned, qty, revenue, B2B, city, state, postal_code, country | Sales KPIs, time series, geography, category, status |
| `customer_rfm.csv` | customer, recency, frequency, monetary, R_score, F_score, M_score, RFM_score, segment | RFM segments, top-customer view |
| `catalog_export.csv` | SKU, design_no, stock, category, size, color | Product metadata / SKU drill-downs |

A pre-write quality gate confirms zero unexpected nulls or duplicate rows across all three exports.

---

## Dashboard (`dashboard/`)

A React single-page application built with Vite. All data is static (loaded from `src/data/dashboardData.js`); there is no backend or API.

### Tech Stack

| Layer | Tool | Version |
|---|---|---|
| Framework | React | 19 |
| Build tool | Vite | 8 |
| Charts | Recharts | 3 |
| Icons | Lucide React | 1 |
| Styling | Inline styles + CSS utility classes | — |

### Getting Started

```bash
cd dashboard
npm install
npm run dev        # http://localhost:5173
npm run build      # Production build → dist/
npm run preview    # Preview production build locally
```

### Views

The sidebar navigates between six views:

| View | Description |
|---|---|
| **Dashboard** | Overview with KPI cards, revenue chart, order status donut, category breakdown, top states, recent orders, and the RFM Intelligence side panel |
| **Sales** | Detailed sales analytics |
| **Customers** | Customer-level data |
| **Products** | Product and SKU breakdown |
| **Analytics** | Extended analysis views |
| **Saved** | Saved reports |

### Key Components

- **KPI Cards** — Total Revenue (₹7.2 Cr), Total Orders (128,968), Cancellation Rate (14.2%), Avg Order Value (₹649); each with a Recharts sparkline and period-over-period delta
- **Revenue Chart** — Monthly Recharts `BarChart` for Apr / May / Jun 2022
- **Status Donut** — Recharts `PieChart` breaking down Shipped / Delivered / Cancelled / Returned / Pending
- **Category Breakdown** — Animated horizontal progress bars per product category
- **Top States** — Revenue table for the top 5 Indian states with MoM trend indicators
- **Recent Orders** — Last 7 orders with colour-coded status badges
- **RFM Panel** — Fixed 320 px right panel with two tabs: *RFM Segments* (donut + segment action cards) and *Top Customers* (ranked by lifetime monetary value with R/F/M scores)

### Layout

```
┌─────────────┬──────────────────────────────────┬─────────────┐
│  Sidebar    │  Main content area               │  RFM Panel  │
│  (220 px)   │  TopBar + search                 │  (320 px)   │
│  Nav links  │  KPI Cards (4-col grid)          │  Segments / │
│  User card  │  Revenue Chart + Status Donut    │  Top        │
│             │  Category + Top States           │  Customers  │
│             │  Recent Orders                   │             │
└─────────────┴──────────────────────────────────┴─────────────┘
```

The layout uses CSS Flexbox with fixed pixel widths for the sidebar and RFM panel; designed for wide desktop screens.

---

## Key Findings

| Metric | Value |
|---|---|
| Total revenue (non-cancelled) | ₹7.17 Cr |
| Total orders | 128,968 |
| Date range | Apr – Jun 2022 |
| Cancellation rate | 14.2% (above ~10% industry benchmark) |
| Return rate | 1.6% |
| Median order value | ₹605 |
| Top categories by volume | Set (39.1%), Kurta (38.8%) |
| Top state by revenue | Maharashtra |
| B2B customers analysed | 149 |
| Largest RFM segment | At Risk (40 customers) |
| Highest-revenue RFM segment | Champions (21 customers, ₹1.86 Cr) |
