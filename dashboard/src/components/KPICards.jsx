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
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        <Tooltip contentStyle={{ display: "none" }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function KPICard({ title, value, sub, trend, trendColor, spark, sparkColor }) {
  return (
    <div className="glass" style={{ padding: "20px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
      <p style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {title}
      </p>
      <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: -0.5 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{sub}</p>}
      {spark && (
        <div style={{ marginTop: 4 }}>
          <Sparkline data={spark} color={sparkColor} />
        </div>
      )}
      {trend && (
        <p style={{ fontSize: 12, fontWeight: 500, color: trendColor }}>{trend}</p>
      )}
    </div>
  );
}

export default function KPICards() {
  const fmt = (n) => "₹" + (n >= 1e7 ? (n / 1e7).toFixed(1) + " Cr" : (n / 1e5).toFixed(1) + "L");
  const pct = (n) => (n * 100).toFixed(1) + "%";

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
      <KPICard
        title="Total Revenue"
        value={fmt(kpis.totalRevenue)}
        sub="Non-cancelled orders"
        spark={sparkRevenue}
        sparkColor="#34c759"
        trend="+14.2% vs prev period"
        trendColor="#34c759"
      />
      <KPICard
        title="Total Orders"
        value={kpis.totalOrders.toLocaleString()}
        sub="Apr – Jun 2022"
        spark={sparkOrders}
        sparkColor="#007aff"
        trend="+8.6% vs prev period"
        trendColor="#007aff"
      />
      <KPICard
        title="Cancellation Rate"
        value={pct(kpis.cancelRate)}
        sub="Industry avg ~10%"
        trend="Above benchmark"
        trendColor="#ff9500"
      />
      <KPICard
        title="Avg Order Value"
        value={"₹" + kpis.avgOrderValue.toFixed(0)}
        sub="Median ₹605"
        trend={`Return rate ${pct(kpis.returnRate)}`}
        trendColor="#af52de"
      />
    </div>
  );
}
