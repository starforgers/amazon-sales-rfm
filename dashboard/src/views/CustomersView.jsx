import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../components/StatCard";
import { rfmSegments, topCustomers, segmentActions } from "../data/dashboardData";

const SEG_COLORS = {
  "Champions":           "#10B981",
  "Loyal":               "#3B82F6",
  "Big Spenders":        "#F97316",
  "New / Recent":        "#06B6D4",
  "Potential Loyalists": "#8B5CF6",
  "Needs Attention":     "#F59E0B",
  "At Risk":             "#EF4444",
  "Hibernating":         "#6B7280",
  "Lost":                "#9CA3AF",
};

function SegmentBadge({ segment }) {
  const c = SEG_COLORS[segment] || "#9CA3AF";
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 5,
      background: `${c}25`, color: c, border: `1px solid ${c}40`,
    }}>{segment}</span>
  );
}

const DonutTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "rgba(10,8,5,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.segment}</p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{d.customers} customers · {d.pct}%</p>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, marginTop: 4, maxWidth: 180, lineHeight: 1.4 }}>{segmentActions[d.segment]}</p>
    </div>
  );
};

const totalCustomers = rfmSegments.reduce((s, d) => s + d.customers, 0);
const champions      = rfmSegments.find(d => d.segment === "Champions");
const atRisk         = rfmSegments.find(d => d.segment === "At Risk");

export default function CustomersView() {
  const [sortKey, setSortKey] = useState("monetary");
  const [sortDir, setSortDir] = useState("desc");

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const sortedCustomers = [...topCustomers].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    return (a[sortKey] < b[sortKey] ? -1 : 1) * dir;
  });

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Customer Intelligence</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>RFM segmentation · 149 B2B customers</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
          Q2 2022
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <StatCard title="Total Customers" value={totalCustomers} sub="B2B wholesale accounts" trend="149 active in Q2" trendColor="#60a5fa" />
        <StatCard title="Champions" value={`${champions?.customers} customers`} sub={`₹${(champions?.revenue / 1e7).toFixed(2)} Cr revenue`} trend={`${champions?.pct}% of customer base`} trendColor="#10B981" />
        <StatCard title="At Risk" value={`${atRisk?.customers} customers`} sub="Need win-back campaign" trend={`${atRisk?.pct}% of customer base`} trendColor="#EF4444" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* RFM Segment Donut */}
        <div className="glass" style={{ padding: "20px 22px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Customer Segments</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>RFM model · hover for actions</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={rfmSegments} dataKey="customers" innerRadius={55} outerRadius={85} paddingAngle={3} startAngle={90} endAngle={-270}>
                {rfmSegments.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip content={<DonutTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
            {rfmSegments.map(d => (
              <div key={d.segment} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{d.segment}</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", minWidth: 22, textAlign: "right" }}>{d.customers}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: d.color, minWidth: 34, textAlign: "right" }}>{d.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers Table */}
        <div className="glass" style={{ padding: "20px 22px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Top Customers</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Click column header to sort</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 48px 48px 80px", gap: 8, padding: "0 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {[["customer","Customer"],["monetary","Revenue"],["recency","R (d)"],["frequency","F (x)"],["segment","Segment"]].map(([key, label]) => (
              <button key={key} onClick={() => toggleSort(key)} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: sortKey === key ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                  {label}{sortKey === key ? (sortDir === "asc" ? " ↑" : " ↓") : ""}
                </span>
              </button>
            ))}
          </div>
          {sortedCustomers.map((c, i) => (
            <div key={c.customer} style={{
              display: "grid", gridTemplateColumns: "1fr 80px 48px 48px 80px", gap: 8,
              padding: "10px 0", alignItems: "center",
              borderBottom: i < sortedCustomers.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <p style={{ fontSize: 12, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.customer}</p>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>₹{(c.monetary / 1e5).toFixed(1)}L</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{c.recency}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{c.frequency}</p>
              <SegmentBadge segment={c.segment} />
            </div>
          ))}
        </div>
      </div>

      {/* Segment Actions */}
      <div className="glass" style={{ padding: "20px 22px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Segment Action Playbook</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {rfmSegments.map(d => (
            <div key={d.segment} style={{ padding: "12px 14px", borderRadius: 10, background: `${d.color}12`, border: `1px solid ${d.color}30` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <SegmentBadge segment={d.segment} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{d.customers} cust.</span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", lineHeight: 1.45 }}>{segmentActions[d.segment]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
