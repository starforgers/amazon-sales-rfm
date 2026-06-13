export default function StatCard({ title, value, sub, trend, trendColor }) {
  return (
    <div className="glass" style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 1 }}>
        {title}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{sub}</p>}
      {trend && (
        <p style={{ fontSize: 12, fontWeight: 600, color: trendColor || "#a78bfa", marginTop: 2 }}>{trend}</p>
      )}
    </div>
  );
}
