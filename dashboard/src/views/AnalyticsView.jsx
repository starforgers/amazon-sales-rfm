import RevenueChart from "../components/RevenueChart";
import StatusDonut from "../components/StatusDonut";
import StatCard from "../components/StatCard";
import { kpis, monthlyRevenue, statusBreakdown } from "../data/dashboardData";

const total = statusBreakdown.reduce((s, d) => s + d.value, 0);
const cancelledPct = ((statusBreakdown.find(d => d.name === "Cancelled").value / total) * 100).toFixed(1);
const deliveredPct = ((statusBreakdown.find(d => d.name === "Delivered").value / total) * 100).toFixed(1);

const aprToMay = (((monthlyRevenue[1].revenue - monthlyRevenue[0].revenue) / monthlyRevenue[0].revenue) * 100).toFixed(1);
const mayToJun = (((monthlyRevenue[2].revenue - monthlyRevenue[1].revenue) / monthlyRevenue[1].revenue) * 100).toFixed(1);

const insights = [
  {
    title: "Revenue Declining Month-over-Month",
    body: `Apr ₹26.2M → May ₹24.0M (${aprToMay}%) → Jun ₹21.4M (${mayToJun}%). Overall Q2 decline of -18.4%. Investigate root cause before Q3.`,
    color: "#f87171",
    icon: "↘",
  },
  {
    title: "Champions Drive Outsized Revenue",
    body: "21 customers (14% of base) generated ₹1.86 Cr — the single highest-revenue segment. Protecting this cohort is the highest-ROI retention action.",
    color: "#10B981",
    icon: "★",
  },
  {
    title: "Cancellation Rate Above Benchmark",
    body: `At ${(kpis.cancelRate * 100).toFixed(1)}%, cancellations are 4.2 pts above the 10% industry average. ${cancelledPct}% of Q2 orders cancelled — worth a category-level drill-down.`,
    color: "#fb923c",
    icon: "⚠",
  },
];

export default function AnalyticsView() {
  const fmt = n => "₹" + (n >= 1e7 ? (n / 1e7).toFixed(1) + " Cr" : (n / 1e5).toFixed(1) + "L");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Analytics Overview</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Key metrics and trends · Q2 2022</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
          Q2 2022
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <StatCard title="Total Revenue"      value={fmt(kpis.totalRevenue)} sub="Non-cancelled"        trend="+14.2% vs Q1"      trendColor="#4ade80" />
        <StatCard title="Total Orders"       value={kpis.totalOrders.toLocaleString()} sub="All statuses"     trend="+8.6% vs Q1"       trendColor="#60a5fa" />
        <StatCard title="Cancellation Rate"  value={(kpis.cancelRate * 100).toFixed(1) + "%"} sub="Industry avg 10%"  trend="⚠ 4.2 pts above avg" trendColor="#fb923c" />
        <StatCard title="Delivery Rate"      value={deliveredPct + "%"} sub="Delivered orders"        trend={`${(kpis.returnRate * 100).toFixed(1)}% return rate`} trendColor="#a78bfa" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1 / 3" }}><RevenueChart /></div>
        <StatusDonut />
      </div>

      {/* Monthly breakdown table */}
      <div className="glass" style={{ padding: "20px 22px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Monthly Breakdown</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8, padding: "0 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          {["Month", "Revenue", "Orders", "AOV", "MoM Change"].map(h => (
            <span key={h} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</span>
          ))}
        </div>
        {monthlyRevenue.map((m, i) => {
          const prev = monthlyRevenue[i - 1];
          const mom  = prev ? (((m.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1) : null;
          const up   = mom && parseFloat(mom) >= 0;
          return (
            <div key={m.month} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 8,
              padding: "12px 0", borderBottom: i < monthlyRevenue.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", alignItems: "center",
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{m.month}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>₹{(m.revenue / 1e6).toFixed(2)}M</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{m.orders.toLocaleString()}</span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>₹{Math.round(m.revenue / m.orders)}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: mom ? (up ? "#4ade80" : "#f87171") : "rgba(255,255,255,0.4)" }}>
                {mom ? `${up ? "+" : ""}${mom}%` : "—"}
              </span>
            </div>
          );
        })}
      </div>

      {/* Insight cards */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Key Insights</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {insights.map(ins => (
            <div key={ins.title} style={{
              padding: "18px 20px", borderRadius: 14,
              background: `${ins.color}12`, border: `1px solid ${ins.color}35`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 18, color: ins.color }}>{ins.icon}</span>
                <p style={{ fontSize: 13, fontWeight: 700, color: ins.color }}>{ins.title}</p>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{ins.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
