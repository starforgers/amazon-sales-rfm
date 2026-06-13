import { statusBreakdown } from "../data/dashboardData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#007aff", "#34c759", "#ff3b30", "#af52de", "#ff9500"];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background: "#2c2c2e", borderRadius: 12, padding: "10px 14px" }}>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.name}</p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 2 }}>{d.value.toLocaleString()} orders</p>
    </div>
  );
};

export default function StatusDonut() {
  const total = statusBreakdown.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass" style={{ padding: "20px 22px", height: "100%" }}>
      <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Order Status</p>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2, marginBottom: 4 }}>
        {total.toLocaleString()} total orders
      </p>

      <ResponsiveContainer width="100%" height={140}>
        <PieChart>
          <Pie data={statusBreakdown} dataKey="value" innerRadius={38} outerRadius={60}
            paddingAngle={3} startAngle={90} endAngle={-270}>
            {statusBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {statusBreakdown.map((d, i) => (
          <div key={d.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: COLORS[i], flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{d.name}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS[i] }}>
              {((d.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
