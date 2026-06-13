import { statusBreakdown } from "../data/dashboardData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#60a5fa", "#34d399", "#f87171", "#a78bfa", "#fb923c"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "rgba(20,10,5,0.8)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px",
    }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.name}</p>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>{d.value.toLocaleString()} orders</p>
    </div>
  );
};

export default function StatusDonut() {
  const total = statusBreakdown.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Order Status Mix</p>
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>All {total.toLocaleString()} orders</p>

      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie data={statusBreakdown} dataKey="value" innerRadius={38} outerRadius={60}
            paddingAngle={3} startAngle={90} endAngle={-270}>
            {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {statusBreakdown.map((d, i) => (
          <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS[i] }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{d.name}</span>
            </div>
            <span style={{ fontSize: 11, fontWeight: 600, color: COLORS[i] }}>
              {((d.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
