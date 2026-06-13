import KPICards from "../components/KPICards";
import RevenueChart from "../components/RevenueChart";
import StatusDonut from "../components/StatusDonut";
import CategoryBreakdown from "../components/CategoryBreakdown";
import GeographyTable from "../components/GeographyTable";
import RecentOrders from "../components/RecentOrders";

export default function DashboardView() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>E-Commerce Sales Dashboard</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
            Apr – Jun 2022
          </p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10,
          padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)",
        }}>
          Last updated: Jun 30, 2022
        </div>
      </div>

      <KPICards />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ gridColumn: "1 / 3" }}><RevenueChart /></div>
        <StatusDonut />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <CategoryBreakdown />
        <GeographyTable />
      </div>

      <RecentOrders />
    </>
  );
}
