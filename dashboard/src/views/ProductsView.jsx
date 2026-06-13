import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import StatCard from "../components/StatCard";
import { categoryData } from "../data/dashboardData";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15", "#38bdf8"];

const totalOrders  = categoryData.reduce((s, d) => s + d.orders, 0);
const totalRevenue = categoryData.reduce((s, d) => s + d.revenue, 0);
const topCat       = categoryData[0];

const enriched = categoryData.map(d => ({
  ...d,
  aov:          Math.round(d.revenue / d.orders),
  orderShare:   ((d.orders  / totalOrders)  * 100).toFixed(1),
  revenueShare: ((d.revenue / totalRevenue) * 100).toFixed(1),
}));

const SORT_COLS = [
  { key: "name",         label: "Category"     },
  { key: "orders",       label: "Orders"       },
  { key: "orderShare",   label: "Order %"      },
  { key: "revenue",      label: "Revenue"      },
  { key: "revenueShare", label: "Rev %"        },
  { key: "aov",          label: "AOV"          },
];

const BarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "rgba(10,8,5,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.name}</p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>₹{(d.revenue / 1e6).toFixed(2)}M revenue</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{d.orders.toLocaleString()} orders · AOV ₹{d.aov}</p>
    </div>
  );
};

export default function ProductsView() {
  const [sortKey, setSortKey] = useState("orders");
  const [sortDir, setSortDir] = useState("desc");

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const sorted = [...enriched].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    return (parseFloat(a[sortKey]) < parseFloat(b[sortKey]) ? -1 : 1) * dir;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Product Performance</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Category-level breakdown · Q2 2022</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
          7 categories
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <StatCard title="Top Category" value={topCat.name} sub={`${((topCat.orders / totalOrders) * 100).toFixed(1)}% of all orders`} trend={`${topCat.orders.toLocaleString()} orders`} trendColor="#60a5fa" />
        <StatCard title="Highest AOV" value={`₹${enriched.reduce((m, d) => d.aov > m.aov ? d : m).aov}`} sub={enriched.reduce((m, d) => d.aov > m.aov ? d : m).name} trend="Avg revenue per order" trendColor="#4ade80" />
        <StatCard title="Top Revenue Cat" value={`₹${(topCat.revenue / 1e6).toFixed(1)}M`} sub={topCat.name} trend={`${((topCat.revenue / totalRevenue) * 100).toFixed(1)}% of total revenue`} trendColor="#a78bfa" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Performance table */}
        <div className="glass" style={{ padding: "20px 22px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Category Performance</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 50px 70px 50px 50px", gap: 8, padding: "0 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {SORT_COLS.map(({ key, label }) => (
              <button key={key} onClick={() => toggleSort(key)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: sortKey === key ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                  {label}{sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                </span>
              </button>
            ))}
          </div>
          {sorted.map((cat, i) => (
            <div key={cat.name} style={{
              display: "grid", gridTemplateColumns: "1fr 60px 50px 70px 50px 50px", gap: 8,
              padding: "10px 0", alignItems: "center",
              borderBottom: i < sorted.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[categoryData.findIndex(d => d.name === cat.name)], flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#fff" }}>{cat.name}</span>
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{cat.orders.toLocaleString()}</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{cat.orderShare}%</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>₹{(cat.revenue / 1e6).toFixed(1)}M</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{cat.revenueShare}%</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>₹{cat.aov}</span>
            </div>
          ))}
        </div>

        {/* Revenue bar chart */}
        <div className="glass" style={{ padding: "20px 22px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Revenue by Category</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Sorted by revenue</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[...categoryData].sort((a, b) => b.revenue - a.revenue)} layout="vertical" barSize={16} margin={{ left: 80, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1e6).toFixed(0)}M`} />
              <YAxis type="category" dataKey="name" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                {[...categoryData].sort((a, b) => b.revenue - a.revenue).map((d, i) => (
                  <Cell key={i} fill={COLORS[categoryData.findIndex(c => c.name === d.name)]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
