import { useState } from "react";
import { categoryData } from "../data/dashboardData";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#fb923c", "#f472b6", "#facc15", "#38bdf8"];

export default function CategoryBreakdown() {
  const [mode, setMode] = useState("orders");

  const total = categoryData.reduce((s, d) => s + (mode === "orders" ? d.orders : d.revenue), 0);

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Category Breakdown</p>
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.08)", borderRadius: 8, padding: 3 }}>
          {["orders", "revenue"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, border: "none", cursor: "pointer",
              background: mode === m ? "rgba(255,255,255,0.2)" : "transparent",
              color: mode === m ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "all 0.15s", textTransform: "capitalize",
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {categoryData.map((cat, i) => {
          const val = mode === "orders" ? cat.orders : cat.revenue;
          const pct = ((val / total) * 100).toFixed(1);
          const label = mode === "orders" ? cat.orders.toLocaleString() : `₹${(cat.revenue / 1e6).toFixed(1)}M`;
          return (
            <div key={cat.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{cat.name}</span>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS[i], minWidth: 38, textAlign: "right" }}>{pct}%</span>
                </div>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.1)" }}>
                <div style={{
                  height: "100%", borderRadius: 3, width: `${pct}%`,
                  background: `linear-gradient(90deg, ${COLORS[i]}, ${COLORS[i]}99)`,
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
