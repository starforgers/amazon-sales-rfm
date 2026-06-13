import { useState } from "react";
import Sidebar from "./components/Sidebar";
import RFMPanel from "./components/RFMPanel";
import DashboardView from "./views/DashboardView";
import SalesView from "./views/SalesView";
import CustomersView from "./views/CustomersView";
import ProductsView from "./views/ProductsView";
import AnalyticsView from "./views/AnalyticsView";
import SavedView from "./views/SavedView";

const VIEWS = {
  Dashboard: DashboardView,
  Sales: SalesView,
  Customers: CustomersView,
  Products: ProductsView,
  Analytics: AnalyticsView,
  Saved: SavedView,
};

export default function App() {
  const [activeView, setActiveView] = useState("Dashboard");

  const ViewComponent = VIEWS[activeView] || DashboardView;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeView={activeView} onNav={setActiveView} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <main style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20, overflowY: "auto" }}>
          <ViewComponent />
        </main>
      </div>

      {activeView === "Dashboard" && (
        <div className="rfm-panel-col" style={{
          width: 320, flexShrink: 0,
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(30px)",
          borderLeft: "1px solid rgba(255,255,255,0.15)",
          padding: "24px 16px",
          overflowY: "auto",
          display: "flex", flexDirection: "column", gap: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: 1.2, textTransform: "uppercase" }}>
              RFM Intelligence
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>
              Customer Sales dataset · 149 customers
            </p>
          </div>
          <RFMPanel />
        </div>
      )}
    </div>
  );
}
