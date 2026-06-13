import RevenueChart from "../components/RevenueChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import StatusDonut from "../components/StatusDonut";
import GeographyTable from "../components/GeographyTable";
import StatCard from "../components/StatCard";
import { kpis } from "../data/dashboardData";

export default function SalesView() {
  const fmt = n => "₹" + (n >= 1e7 ? (n / 1e7).toFixed(1) + " Cr" : (n / 1e5).toFixed(1) + "L");

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Sales Analytics</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Q2 2022 · Apr – Jun</p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10,
          padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)",
        }}>
          Q2 2022
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <StatCard
          title="Total Revenue"
          value={fmt(kpis.totalRevenue)}
          sub="Non-cancelled orders"
          trend="+14.2% vs prev period"
          trendColor="#4ade80"
        />
        <StatCard
          title="Total Orders"
          value={kpis.totalOrders.toLocaleString()}
          sub="Across all statuses"
          trend="+8.6% vs prev period"
          trendColor="#60a5fa"
        />
        <StatCard
          title="Avg Order Value"
          value={"₹" + kpis.avgOrderValue.toFixed(0)}
          sub="Median ₹605"
          trend={`${kpis.shippedOrders.toLocaleString()} shipped`}
          trendColor="#a78bfa"
        />
      </div>

      <RevenueChart />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <CategoryBreakdown />
        <StatusDonut />
      </div>

      <GeographyTable />
    </>
  );
}
