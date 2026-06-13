# amazon-sales-rfm

End-to-end sales analysis on a Q2 2022 Amazon India fashion dataset — 128,968 orders, ₹7.17 Cr revenue, 149 B2B customers. Covers data cleaning, EDA, RFM segmentation, and an interactive dashboard.

## Dataset

| File | Description |
|---|---|
| `csv/amazon_sales_report.csv` | Raw order data (~128k rows) |
| `csv/customer_sales.csv` | B2B customer purchase history |
| `csv/product_catalog.csv` | SKU-level inventory |
| `csv/clean/` | Cleaned exports used by the dashboard |

## Structure

```
eda.ipynb        EDA, cleaning, and RFM analysis
clean.py         Standalone cleaning script
csv/             Raw and cleaned datasets
dashboard/       React/Vite frontend
```

## Dashboard

Live at **[dashboard-sy-projs.vercel.app](https://dashboard-sy-projs.vercel.app)**

To run locally:

```bash
cd dashboard
npm install
npm run dev      # http://localhost:5173
```

## Key findings

- Cancellation rate 14.2% — above the ~10% industry benchmark
- Top categories: Set (39.1%) and Kurta (38.8%) account for 78% of volume
- Champions segment: 21 customers, ₹1.86 Cr revenue
- Largest at-risk segment: 40 customers, ₹84.2 L in recoverable revenue
- Top state: Maharashtra
