import { LayoutDashboard, TrendingUp, Users, Package, BarChart3, BookMarked } from "lucide-react";

const nav = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: TrendingUp,      label: "Sales"     },
  { icon: Users,           label: "Customers" },
  { icon: Package,         label: "Products"  },
  { icon: BarChart3,       label: "Analytics" },
  { icon: BookMarked,      label: "Saved"     },
];

export default function Sidebar({ activeView, onNav }) {
  return (
    <aside className="sidebar-aside glass-sidebar" style={{
      width: 220, minHeight: "100vh", display: "flex", flexDirection: "column",
      padding: "32px 12px", gap: 4, flexShrink: 0,
    }}>
      {nav.map(({ icon: Icon, label }) => {
        const isActive = activeView === label;
        return (
          <button key={label} onClick={() => onNav(label)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 12, border: "none", cursor: "pointer", width: "100%", textAlign: "left",
            background: isActive ? "rgba(0,122,255,0.18)" : "transparent",
            transition: "background 0.15s",
          }}>
            <Icon size={16} color={isActive ? "#007aff" : "rgba(255,255,255,0.4)"} style={{ flexShrink: 0 }} />
            <span className="sidebar-label" style={{
              fontSize: 13, fontWeight: isActive ? 600 : 400,
              color: isActive ? "#007aff" : "rgba(255,255,255,0.55)",
            }}>
              {label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
