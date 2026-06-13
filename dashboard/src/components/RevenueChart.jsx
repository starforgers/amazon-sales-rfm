import { monthlyRevenue } from "../data/dashboardData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const COLORS = ["#60a5fa", "#a78bfa", "#34d399"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(20,10,5,0.75)", backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10,
      padding: "10px 14px",
    }}>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, marginBottom: 4 }}>{label}</p>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
        ₹{(payload[0].value / 1e6).toFixed(2)}M
      </p>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
        {payload[0].payload.orders.toLocaleString()} orders
      </p>
    </div>
  );
};

export default function RevenueChart() {
  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Monthly Revenue</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Non-cancelled orders · Apr–Jun 2022</p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: "4px 10px",
          fontSize: 11, color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)",
        }}>Q2 2022</div>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={monthlyRevenue} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1e6).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
            {monthlyRevenue.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
