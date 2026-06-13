import { useRef, useEffect, useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";
import { notifications } from "../data/dashboardData";

const NOTIF_COLORS = { warning: "#fb923c", success: "#4ade80", info: "#60a5fa" };

export default function TopBar({ searchQuery, onSearch }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen]   = useState(false);
  const notifRef = useRef(null);
  const userRef  = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (userRef.current  && !userRef.current.contains(e.target))  setUserOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: "16px 28px",
      background: "rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(20px)",
      flexShrink: 0,
    }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", gap: 10,
        background: "rgba(255,255,255,0.15)", borderRadius: 10,
        padding: "8px 14px", border: "1px solid rgba(255,255,255,0.25)",
        maxWidth: 460,
      }}>
        <Search size={15} color="rgba(255,255,255,0.6)" />
        <input
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "#fff", width: "100%" }}
          placeholder="Search orders, customers, categories…"
        />
        {searchQuery && (
          <button onClick={() => onSearch("")} style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1, padding: 0 }}>
            ✕
          </button>
        )}
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        {/* Notification bell */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button onClick={() => { setNotifOpen(o => !o); setUserOpen(false); }} style={{
            background: "transparent", border: "none", cursor: "pointer", padding: 4, position: "relative", display: "flex",
          }}>
            <Bell size={18} color="rgba(255,255,255,0.8)" />
            <span style={{
              position: "absolute", top: 2, right: 2,
              width: 8, height: 8, borderRadius: "50%",
              background: "#EF4444", border: "1px solid rgba(255,255,255,0.5)",
            }} />
          </button>

          {notifOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "rgba(10,8,5,0.96)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14,
              padding: 8, width: 310, zIndex: 200,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: 1.2, textTransform: "uppercase", padding: "4px 10px 8px" }}>
                Notifications
              </p>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: "10px 12px", borderRadius: 8, cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: NOTIF_COLORS[n.type] }}>{n.title}</p>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{n.time}</span>
                  </div>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User menu */}
        <div ref={userRef} style={{ position: "relative" }}>
          <button onClick={() => { setUserOpen(o => !o); setNotifOpen(false); }} style={{
            display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
            background: "transparent", border: "none", padding: 0,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #f5a76b, #c4543a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 700, fontSize: 12,
              border: "2px solid rgba(255,255,255,0.4)", flexShrink: 0,
            }}>MD</div>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>ANALYST</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Megan Dasal</p>
            </div>
            <ChevronDown size={14} color="rgba(255,255,255,0.6)" style={{ transition: "transform 0.2s", transform: userOpen ? "rotate(180deg)" : "none" }} />
          </button>

          {userOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "rgba(10,8,5,0.96)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14,
              padding: 10, width: 210, zIndex: 200,
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}>
              <div style={{ padding: "8px 10px 12px", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Megan Dasal</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>dasalmegan@gmail.com</p>
              </div>
              {[["Profile Settings", false], ["Team", false], ["Sign Out", true]].map(([label, danger]) => (
                <button key={label} onClick={() => setUserOpen(false)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "9px 12px", borderRadius: 8, border: "none",
                  background: "transparent", color: danger ? "#f87171" : "rgba(255,255,255,0.75)",
                  fontSize: 12, cursor: "pointer", transition: "background 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
