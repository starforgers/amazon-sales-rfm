import { topStates } from "../data/dashboardData";

export default function GeographyTable() {
  const total = topStates.reduce((s, d) => s + d.revenue, 0);

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Top States</p>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>by revenue</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 60px 60px", gap: 8,
          padding: "0 0 10px", borderBottom: "1px solid rgba(84,84,88,0.45)",
        }}>
          {["State", "Revenue", "Share", "Trend"].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.4 }}>{h}</span>
          ))}
        </div>

        {topStates.map((row, i) => {
          const share = ((row.revenue / total) * 100).toFixed(1);
          const up = row.trend.startsWith("+");
          return (
            <div key={row.state} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 60px 60px", gap: 8,
              padding: "11px 0", alignItems: "center",
              borderBottom: i < topStates.length - 1 ? "1px solid rgba(84,84,88,0.3)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: `hsl(${210 + i * 28}, 80%, 60%)`, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#fff" }}>{row.state}</span>
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                ₹{(row.revenue / 1e6).toFixed(1)}M
              </span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{share}%</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: up ? "#34c759" : "#ff3b30" }}>
                {row.trend}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
