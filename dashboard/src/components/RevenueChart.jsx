import { monthlyRevenue } from "../data/dashboardData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from "recharts";

const COLORS = ["#007aff", "#af52de", "#34c759"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#2c2c2e",
      borderRadius: 12, padding: "10px 14px",
    }}>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginBottom: 4 }}>{label}</p>
      <p style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>
        ₹{(payload[0].value / 1e6).toFixed(2)}M
      </p>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>
        {payload[0].payload.orders.toLocaleString()} orders
      </p>
    </div>
  );
};

export default function RevenueChart() {
  return (
    <div className="glass" style={{ padding: "20px 22px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Monthly Revenue</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Non-cancelled · Apr – Jun 2022</p>
        </div>
        <span style={{
          background: "#2c2c2e", borderRadius: 8, padding: "5px 10px",
          fontSize: 12, color: "rgba(255,255,255,0.5)",
        }}>Q2 2022</span>
      </div>

      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={monthlyRevenue} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(84,84,88,0.3)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "system-ui" }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12, fontFamily: "system-ui" }} axisLine={false} tickLine={false}
            tickFormatter={(v) => `₹${(v / 1e6).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
            {monthlyRevenue.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
