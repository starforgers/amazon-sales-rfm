import KPICards from "../components/KPICards";
import RevenueChart from "../components/RevenueChart";
import StatusDonut from "../components/StatusDonut";
import CategoryBreakdown from "../components/CategoryBreakdown";
import GeographyTable from "../components/GeographyTable";
import RecentOrders from "../components/RecentOrders";

export default function DashboardView() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0, letterSpacing: -0.3 }}>
            Sales Overview
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
            Apr – Jun 2022
          </p>
        </div>
        <span style={{
          fontSize: 12, color: "rgba(255,255,255,0.35)",
          background: "#1c1c1e", borderRadius: 8, padding: "6px 12px",
        }}>
          Last updated Jun 30, 2022
        </span>
      </div>

      <KPICards />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignItems: "stretch" }}>
        <div style={{ gridColumn: "1 / 3", display: "flex" }}><RevenueChart /></div>
        <StatusDonut />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <CategoryBreakdown />
        <GeographyTable />
      </div>

      <RecentOrders />
    </>
  );
}
