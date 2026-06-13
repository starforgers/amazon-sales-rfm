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
      padding: "28px 16px", gap: 8, flexShrink: 0,
    }}>
{nav.map(({ icon: Icon, label }) => {
        const isActive = activeView === label;
        return (
          <button key={label} onClick={() => onNav(label)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
            borderRadius: 10, border: "none", cursor: "pointer", width: "100%", textAlign: "left",
            background: isActive ? "rgba(255,255,255,0.22)" : "transparent",
            backdropFilter: isActive ? "blur(10px)" : "none",
            boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3)" : "none",
            borderLeft: isActive ? "2px solid rgba(255,255,255,0.6)" : "2px solid transparent",
            transition: "all 0.2s",
          }}>
            <Icon size={16} color={isActive ? "#fff" : "rgba(255,255,255,0.55)"} style={{ flexShrink: 0 }} />
            <span className="sidebar-label" style={{ fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "rgba(255,255,255,0.55)" }}>
              {label}
            </span>
            {isActive && (
              <div className="sidebar-label" style={{
                marginLeft: "auto", width: 6, height: 6, borderRadius: "50%",
                background: "#fff", boxShadow: "0 0 6px #fff",
              }} />
            )}
          </button>
        );
      })}
    </aside>
  );
}
