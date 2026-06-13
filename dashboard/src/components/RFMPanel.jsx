import { rfmSegments, topCustomers, segmentActions } from "../data/dashboardData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(20,10,5,0.8)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px",
    }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.segment}</p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{d.customers} customers · {d.pct}%</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginTop: 4, maxWidth: 180 }}>
        {segmentActions[d.segment]}
      </p>
    </div>
  );
};

function SegmentBadge({ segment, size = "sm" }) {
  const colors = {
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
  const c = colors[segment] || "#9CA3AF";
  return (
    <span style={{
      fontSize: size === "sm" ? 10 : 11, fontWeight: 600, padding: "2px 7px", borderRadius: 5,
      background: `${c}25`, color: c, border: `1px solid ${c}40`,
    }}>{segment}</span>
  );
}

export default function RFMPanel() {
  const [tab, setTab] = useState("segments");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Tab switcher */}
      <div className="glass" style={{ padding: "4px", display: "flex", gap: 4 }}>
        {[["segments", "RFM Segments"], ["customers", "Top Customers"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: 1, padding: "8px", borderRadius: 10, border: "none", cursor: "pointer",
            background: tab === key ? "rgba(255,255,255,0.25)" : "transparent",
            color: tab === key ? "#fff" : "rgba(255,255,255,0.5)",
            fontSize: 12, fontWeight: 600, transition: "all 0.2s",
            backdropFilter: tab === key ? "blur(10px)" : "none",
          }}>{label}</button>
        ))}
      </div>

      {tab === "segments" ? (
        <>
          {/* Donut chart */}
          <div className="glass" style={{ padding: "16px 22px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Customer Segments</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
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

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {rfmSegments.map(d => (
                <div key={d.segment} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{d.segment}</span>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", minWidth: 28, textAlign: "right" }}>{d.customers}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, color: d.color, minWidth: 34, textAlign: "right" }}>{d.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action map */}
          <div className="glass" style={{ padding: "16px 22px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Segment Actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rfmSegments.slice(0, 5).map(d => (
                <div key={d.segment} style={{
                  padding: "8px 10px", borderRadius: 8,
                  background: `${d.color}12`, border: `1px solid ${d.color}25`,
                }}>
                  <SegmentBadge segment={d.segment} />
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.4 }}>
                    {segmentActions[d.segment]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="glass" style={{ padding: "16px 22px" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Top Customers</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>by lifetime monetary value</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {topCustomers.map((c, i) => (
              <div key={c.customer} style={{
                display: "flex", alignItems: "flex-start", justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: i < topCustomers.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                gap: 8,
              }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", minWidth: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    background: `hsl(${i * 37}, 60%, 55%)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: "#fff",
                  }}>
                    {c.customer.charAt(0)}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>
                      {c.customer}
                    </p>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                      <SegmentBadge segment={c.segment} />
                      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>R={c.recency}d · F={c.frequency}x</span>
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
                    ₹{(c.monetary / 1e5).toFixed(1)}L
                  </p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>RFM {c.rfm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
