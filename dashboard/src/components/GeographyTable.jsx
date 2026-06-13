import { topStates } from "../data/dashboardData";

export default function GeographyTable() {
  const total = topStates.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Top States</p>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>by revenue</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 60px 60px", gap: 8, padding: "0 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {["State", "Revenue", "Share", "Trend"].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</span>
          ))}
        </div>

        {topStates.map((row, i) => {
          const share = ((row.revenue / total) * 100).toFixed(1);
          const up = row.trend.startsWith("+");
          return (
            <div key={row.state} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 60px 60px", gap: 8,
              padding: "10px 0", alignItems: "center",
              borderBottom: i < topStates.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: `hsl(${200 + i * 30}, 70%, 65%)` }} />
                <span style={{ fontSize: 12, color: "#fff" }}>{row.state}</span>
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                ₹{(row.revenue / 1e6).toFixed(1)}M
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{share}%</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: up ? "#4ade80" : "#f87171" }}>
                {row.trend}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
