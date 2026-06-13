import { useState } from "react";
import { categoryData } from "../data/dashboardData";

const COLORS = ["#007aff", "#af52de", "#34c759", "#ff9500", "#ff2d55", "#ffcc00", "#5ac8fa"];

export default function CategoryBreakdown() {
  const [mode, setMode] = useState("orders");

  const total = categoryData.reduce((s, d) => s + (mode === "orders" ? d.orders : d.revenue), 0);

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Category Breakdown</p>
        <div style={{ display: "flex", gap: 2, background: "#2c2c2e", borderRadius: 10, padding: 3 }}>
          {["orders", "revenue"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{
              fontSize: 12, fontWeight: 500, padding: "4px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: mode === m ? "#007aff" : "transparent",
              color: mode === m ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "all 0.15s", textTransform: "capitalize",
            }}>{m}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {categoryData.map((cat, i) => {
          const val = mode === "orders" ? cat.orders : cat.revenue;
          const pct = ((val / total) * 100).toFixed(1);
          const label = mode === "orders" ? cat.orders.toLocaleString() : `₹${(cat.revenue / 1e6).toFixed(1)}M`;
          return (
            <div key={cat.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{cat.name}</span>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{label}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS[i], minWidth: 38, textAlign: "right" }}>{pct}%</span>
                </div>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(84,84,88,0.4)" }}>
                <div style={{
                  height: "100%", borderRadius: 2, width: `${pct}%`,
                  background: COLORS[i],
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
