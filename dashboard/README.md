# E-Commerce Sales Dashboard

A single-page analytics dashboard built with React and Vite, visualising Q2 2022 (April – June) sales data for an Indian e-commerce fashion retailer. The dashboard covers 128,968 orders, ₹7.17 Cr in revenue, and 149 B2B customers across product categories, geographies, order statuses, and RFM customer segments.

---

## Tech Stack

| Layer | Library / Tool | Version |
| --- | --- | --- |
| Framework | React | 19 |
| Build tool | Vite | 8 |
| Charts | Recharts | 3 |
| Icons | Lucide React | 1 |
| Styling | Inline styles + CSS utility classes | — |
| Language | JavaScript (ESM) | — |

No external CSS framework or router is used. All layout is done with CSS Flexbox and Grid via inline styles. Global utility classes (`.glass`, `.glass-strong`, `.glass-sidebar`) are defined in `src/index.css` and provide the frosted-glass card aesthetic.

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
cd dashboard
npm install

# Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser. Vite provides hot module replacement — any file save is reflected instantly without a full reload.

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

---

## Project Structure

```
dashboard/
├── public/                  Static assets served at root
├── src/
│   ├── assets/              Images (hero.png, SVGs)
│   ├── components/
│   │   ├── Sidebar.jsx      Left navigation panel
│   │   ├── TopBar.jsx       Top header bar
│   │   ├── KPICards.jsx     Four headline metric cards
│   │   ├── RevenueChart.jsx Monthly revenue bar chart
│   │   ├── StatusDonut.jsx  Order status donut chart
│   │   ├── CategoryBreakdown.jsx  Horizontal progress-bar breakdown
│   │   ├── GeographyTable.jsx     Top 5 states by revenue
│   │   ├── RecentOrders.jsx       Latest 7 orders table
│   │   └── RFMPanel.jsx     Right-panel RFM intelligence
│   ├── data/
│   │   └── dashboardData.js All static data constants
│   ├── App.jsx              Root layout and grid composition
│   ├── App.css              (Unused legacy file)
│   ├── index.css            Global reset and glass utility classes
│   └── main.jsx             React DOM entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Layout

The page is divided into three vertical columns:

```
┌─────────────┬──────────────────────────────────┬─────────────┐
│  Sidebar    │  Main content area               │  RFM Panel  │
│  (220 px)   │  (flex: 1)                       │  (320 px)   │
│             │  TopBar                          │             │
│  Nav links  │  ─────────────────────────────── │  Tab: RFM   │
│  User card  │  Welcome header                  │  Segments   │
│             │  KPI Cards (4-col grid)          │  or Top     │
│             │  Revenue Chart + Status Donut    │  Customers  │
│             │  Category Breakdown + Top States │             │
│             │  Recent Orders                   │             │
└─────────────┴──────────────────────────────────┴─────────────┘
```

---

## Components

### Sidebar (`Sidebar.jsx`)

A fixed-width (220 px) left panel with:

- **Logo** — "SalesDash" wordmark with a styled "S" icon.
- **Navigation links** — Six items: Dashboard, Sales, Customers, Products, Analytics, Saved. Each renders a `<button>` with a Lucide icon and label. Active state is managed with `useState`; clicking any button updates the highlighted item with a white left-border, background tint, and a glowing dot indicator.
- **User card** — Displays the analyst name (Megan Dasal) and role at the bottom of the sidebar.

> Note: Navigation is visual only. The dashboard currently has a single view; no routing is wired to the nav items.

---

### TopBar (`TopBar.jsx`)

A sticky header spanning the full width of the main content area. Contains:

- **Search input** — Placeholder reads "Search orders, customers, SKUs…". The input is styled but not wired to any filter logic.
- **Notification bell** — Static red dot badge indicating unread notifications.
- **User identity pill** — Avatar initials (MD), role chip (ANALYST), and name with a chevron dropdown. The dropdown is visual only.

---

### KPI Cards (`KPICards.jsx`)

A 4-column grid of headline metrics, each rendered as a frosted-glass card:

| Card | Value | Detail |
| --- | --- | --- |
| Total Revenue | ₹7.2 Cr | Non-cancelled orders only; sparkline + "+14.2% vs prev period" |
| Total Orders | 1,28,968 | Apr–Jun 2022; sparkline + "+8.6% vs prev period" |
| Cancellation Rate | 14.2% | Benchmarked against industry avg ~10%; flagged as above benchmark |
| Avg Order Value | ₹649 | Median ₹605; return rate 1.6% shown as sub-metric |

Sparklines are rendered with Recharts `LineChart` at 40 px height with no axes or dots.

Currency is formatted as Indian-style: values ≥ ₹1 Cr display as `₹X.XCr`; smaller values as `₹X.XL` (lakhs).

---

### Revenue Chart (`RevenueChart.jsx`)

A Recharts `BarChart` showing monthly revenue for Q2 2022:

| Month | Revenue | Orders |
| --- | --- | --- |
| Apr 2022 | ₹26.2M | 44,980 |
| May 2022 | ₹24.0M | 49,821 |
| Jun 2022 | ₹21.4M | 34,167 |

Each bar is a distinct colour (blue → purple → green). A custom tooltip shows the month, revenue in ₹M, and order count on hover. The Y-axis is formatted as `₹XM`.

---

### Status Donut (`StatusDonut.jsx`)

A Recharts `PieChart` (donut style, `innerRadius: 38`, `outerRadius: 60`) breaking down all orders by fulfilment status:

| Status | Orders | Share |
| --- | --- | --- |
| Shipped | 77,800 | 60.3% |
| Delivered | 28,769 | 22.3% |
| Cancelled | 18,329 | 14.2% |
| Returned | 2,114 | 1.6% |
| Pending | 939 | 0.7% |

A colour-coded legend list appears below the chart. A custom tooltip shows status name and order count on hover.

---

### Category Breakdown (`CategoryBreakdown.jsx`)

A vertical list of product categories, each rendered as a labelled horizontal progress bar showing share of total orders:

| Category | Orders | Share |
| --- | --- | --- |
| Set | 50,281 | 39.1% |
| Kurta | 49,873 | 38.8% |
| Western Dress | 15,500 | 12.1% |
| Top | 10,622 | 8.3% |
| Ethnic Dress | 1,159 | 0.9% |
| Blouse | 926 | 0.7% |
| Bottom | 440 | 0.3% |

Bar widths animate to their percentage width on load (`transition: width 0.6s ease`). Revenue per category is stored in the data but not displayed in this view.

---

### Top States (`GeographyTable.jsx`)

A table listing the top 5 Indian states by revenue, with four columns: State, Revenue, Share of top-5, and MoM trend indicator:

| State | Revenue | Trend |
| --- | --- | --- |
| Maharashtra | ₹12.2M | +8.2% |
| Karnataka | ₹9.6M | +5.1% |
| Telangana | ₹6.3M | +3.4% |
| Uttar Pradesh | ₹6.2M | +6.7% |
| Tamil Nadu | ₹6.0M | -1.2% |

Positive trends render green (`#4ade80`), negative render red (`#f87171`). Each row has a coloured dot derived from `hsl(200 + i*30, 70%, 65%)`.

---

### Recent Orders (`RecentOrders.jsx`)

A table showing the 7 most recent orders (all dated 2022-06-29 or 2022-06-30), with columns:

- **Order ID** — Amazon-style ID, truncated to 20 characters with an ellipsis, rendered in monospace.
- **Category** — Product type (Set, Kurta, Top, Western Dress).
- **State** — Indian state of the customer.
- **Status** — Colour-coded pill badge: Delivered (green), Shipped (blue), Cancelled (red), Pending (orange).
- **Revenue** — Order value in ₹.

A "Full list →" button is present in the header but not wired to any action.

---

### RFM Panel (`RFMPanel.jsx`)

A fixed 320 px right panel providing B2B customer intelligence using an RFM (Recency, Frequency, Monetary) model applied to 149 customers. It has two tabs:

#### Tab 1 — RFM Segments

A donut `PieChart` followed by a legend and a segment action map. The 9 segments are:

| Segment | Customers | Revenue | Action |
| --- | --- | --- | --- |
| At Risk | 40 | ₹84.2L | Win-back email. Personalise with last category. |
| Loyal | 22 | ₹98.1L | Offer loyalty tiers. Protect from competitors. |
| Champions | 21 | ₹1.86Cr | Reward & upsell. Feature in referral programmes. |
| Potential Loyalists | 15 | ₹52.3L | Targeted nudge. Time-limited offer to reactivate. |
| Needs Attention | 13 | ₹31.8L | Re-engagement campaign before they go cold. |
| Hibernating | 12 | ₹20.4L | Low-cost reactivation. Accept lower conversion. |
| New / Recent | 11 | ₹18.7L | Strong onboarding. Second purchase is the goal. |
| Lost | 8 | ₹6.8L | Suppression list. Re-market only if CAC justifies. |
| Big Spenders | 7 | ₹39.2L | Push frequency. One re-purchase locks them in. |

Hovering a donut segment shows a tooltip with the segment name, customer count, percentage, and the recommended action.

The Segment Actions block shows the top 5 segments as colour-tinted cards with the action text below each badge.

#### Tab 2 — Top Customers

A ranked list of the top 7 customers by lifetime monetary value, showing:

- Avatar initial (coloured by index)
- Customer name (truncated with ellipsis at 160 px)
- RFM segment badge
- Recency (days since last order) and frequency (number of orders)
- Monetary value in ₹L
- Composite RFM score (e.g. 455, 255)

---

## Data

All data lives in `src/data/dashboardData.js` as named exports. There is no API or database — the dashboard is entirely static. The dataset covers a real-world Indian fashion e-commerce export (Amazon India seller data, Q2 2022).

| Export | Description |
| --- | --- |
| `kpis` | Six headline metrics (revenue, orders, rates, AOV) |
| `monthlyRevenue` | Revenue and order count per month (3 rows) |
| `categoryData` | Orders and revenue per product category (7 rows) |
| `topStates` | Top 5 states with revenue and trend string |
| `rfmSegments` | 9 RFM segments with customer count, revenue, pct, colour |
| `topCustomers` | 7 top customers with R/F/M scores and segment |
| `segmentActions` | Recommended CRM action per segment (keyed by segment name) |
| `statusBreakdown` | Order counts by fulfilment status (5 rows) |
| `recentOrders` | Last 7 orders with ID, date, category, status, revenue, state |

---

## Known Limitations

- **No routing** — The sidebar navigation updates the active highlight visually but does not render different views. All nav items show the same dashboard.
- **No filtering or interactivity** — The search bar, notification bell, "Full list →" button, and user dropdown are UI shells without wired logic.
- **Static data** — All figures are hardcoded. There is no data-fetching layer.
- **Single breakpoint** — The layout uses fixed pixel widths (sidebar: 220 px, RFM panel: 320 px) and a 3-column main grid. It is designed for wide desktop screens and will not reflow gracefully at narrow widths.
