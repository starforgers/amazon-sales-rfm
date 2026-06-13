import { kpis } from "../data/dashboardData";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

const sparkRevenue = [
  { v: 18 }, { v: 22 }, { v: 19 }, { v: 28 }, { v: 24 }, { v: 31 }, { v: 26 },
];
const sparkOrders = [
  { v: 42 }, { v: 38 }, { v: 45 }, { v: 50 }, { v: 44 }, { v: 49 }, { v: 44 },
];

function Sparkline({ data, color }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
        <Tooltip contentStyle={{ display: "none" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function KPICard({ title, value, sub, trend, trendColor, spark, sparkColor }) {
  return (
    <div className="glass" style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 6 }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 1 }}>
        {title}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{sub}</p>}
      {spark && (
        <div style={{ marginTop: 4 }}>
          <Sparkline data={spark} color={sparkColor} />
        </div>
      )}
      {trend && (
        <p style={{ fontSize: 12, fontWeight: 600, color: trendColor, marginTop: 2 }}>{trend}</p>
      )}
    </div>
  );
}

export default function KPICards() {
  const fmt = (n) => "₹" + (n >= 1e7 ? (n / 1e7).toFixed(1) + "Cr" : (n / 1e5).toFixed(1) + "L");
  const pct = (n) => (n * 100).toFixed(1) + "%";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      <KPICard
        title="Total Revenue"
        value={fmt(kpis.totalRevenue)}
        sub="Non-cancelled orders"
        spark={sparkRevenue}
        sparkColor="#4ade80"
        trend="+14.2% vs prev period"
        trendColor="#4ade80"
      />
      <KPICard
        title="Total Orders"
        value={kpis.totalOrders.toLocaleString()}
        sub="Apr – Jun 2022"
        spark={sparkOrders}
        sparkColor="#60a5fa"
        trend="+8.6% vs prev period"
        trendColor="#60a5fa"
      />
      <KPICard
        title="Cancellation Rate"
        value={pct(kpis.cancelRate)}
        sub="Industry avg ~10%"
        trend="⚠ Above benchmark"
        trendColor="#fb923c"
      />
      <KPICard
        title="Avg Order Value"
        value={"₹" + kpis.avgOrderValue.toFixed(0)}
        sub="Median ₹605"
        trend={`Return rate ${pct(kpis.returnRate)}`}
        trendColor="#a78bfa"
      />
    </div>
  );
}
