import { rfmSegments, topCustomers, segmentActions } from "../data/dashboardData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "10px 14px", maxWidth: 200 }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.segment}</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{d.customers} customers · {d.pct}%</p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 6, lineHeight: 1.4 }}>
        {segmentActions[d.segment]}
      </p>
    </div>
  );
};

function SegmentBadge({ segment }) {
  const colors = {
    "Champions":           "#34c759",
    "Loyal":               "#007aff",
    "Big Spenders":        "#ff9500",
    "New / Recent":        "#5ac8fa",
    "Potential Loyalists": "#af52de",
    "Needs Attention":     "#ffcc00",
    "At Risk":             "#ff3b30",
    "Hibernating":         "#8e8e93",
    "Lost":                "#636366",
  };
  const c = colors[segment] || "#8e8e93";
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 5,
      background: `${c}20`, color: c,
    }}>{segment}</span>
  );
}

export default function RFMPanel() {
  const [tab, setTab] = useState("segments");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div className="glass-strong" style={{ padding: 4, display: "flex", gap: 2 }}>
        {[["segments", "RFM Segments"], ["customers", "Top Customers"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer",
            background: tab === key ? "#007aff" : "transparent",
            color: tab === key ? "#fff" : "rgba(255,255,255,0.45)",
            fontSize: 12, fontWeight: 600, transition: "all 0.15s",
          }}>{label}</button>
        ))}
      </div>

      {tab === "segments" ? (
        <>
          <div className="glass" style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Customer Segments</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, marginBottom: 12 }}>
              {rfmSegments.reduce((s, d) => s + d.customers, 0)} customers · RFM model
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={rfmSegments} dataKey="customers" innerRadius={50} outerRadius={80}
                  paddingAngle={3} startAngle={90} endAngle={-270}
                >
                  {rfmSegments.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginTop: 4 }}>
              {rfmSegments.map(d => (
                <div key={d.segment} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{d.segment}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", minWidth: 24, textAlign: "right" }}>{d.customers}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: d.color, minWidth: 34, textAlign: "right" }}>{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 12 }}>Segment Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rfmSegments.slice(0, 5).map(d => (
                <div key={d.segment} style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: `${d.color}12`,
                }}>
                  <SegmentBadge segment={d.segment} />
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6, lineHeight: 1.45 }}>
                    {segmentActions[d.segment]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="glass" style={{ padding: "16px 18px" }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Top Customers</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 14, marginTop: 2 }}>by lifetime value</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topCustomers.map((c, i) => (
              <div key={c.customer} style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                padding: "11px 0",
                borderBottom: i < topCustomers.length - 1 ? "1px solid rgba(84,84,88,0.3)" : "none",
                gap: 8,
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", minWidth: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${i * 37 + 200}, 65%, 55%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#fff",
                  }}>
                    {c.customer.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
                      {c.customer}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap", alignItems: "center" }}>
                      <SegmentBadge segment={c.segment} />
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>R={c.recency}d · F={c.frequency}x</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    ₹{(c.monetary / 1e5).toFixed(1)}L
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>RFM {c.rfm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
