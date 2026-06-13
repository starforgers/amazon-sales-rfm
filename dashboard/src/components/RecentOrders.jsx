import { useState } from "react";
import { allOrders } from "../data/dashboardData";

const STATUS_STYLE = {
  Delivered: { bg: "rgba(52,211,153,0.2)",  color: "#34d399", border: "rgba(52,211,153,0.3)"  },
  Shipped:   { bg: "rgba(96,165,250,0.2)",  color: "#60a5fa", border: "rgba(96,165,250,0.3)"  },
  Cancelled: { bg: "rgba(248,113,113,0.2)", color: "#f87171", border: "rgba(248,113,113,0.3)" },
  Returned:  { bg: "rgba(167,139,250,0.2)", color: "#a78bfa", border: "rgba(167,139,250,0.3)" },
  Pending:   { bg: "rgba(251,146,60,0.2)",  color: "#fb923c", border: "rgba(251,146,60,0.3)"  },
};

const COLS = [
  { key: "id",       label: "Order ID",   style: { flex: "0 0 200px" } },
  { key: "category", label: "Category",   style: { flex: 1 } },
  { key: "state",    label: "State",      style: { flex: 1 } },
  { key: "date",     label: "Date",       style: { flex: "0 0 96px" } },
  { key: "status",   label: "Status",     style: { flex: "0 0 90px" } },
  { key: "revenue",  label: "Revenue",    style: { flex: "0 0 80px", textAlign: "right" } },
];

const PREVIEW = 7;

export default function RecentOrders() {
  const [showAll, setShowAll]   = useState(false);
  const [sortKey, setSortKey]   = useState("date");
  const [sortDir, setSortDir]   = useState("desc");

  function toggleSort(key) {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("desc"); }
  }

  const sorted = [...allOrders].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    if (sortKey === "revenue") return (a.revenue - b.revenue) * dir;
    return (a[sortKey] < b[sortKey] ? -1 : 1) * dir;
  });

  const displayed = showAll ? sorted : sorted.slice(0, PREVIEW);
  const hasMore = sorted.length > PREVIEW;

  return (
    <div className="glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Recent Orders</p>
        </div>
        {hasMore && (
          <button onClick={() => setShowAll(s => !s)} style={{
            fontSize: 11, color: "rgba(255,255,255,0.6)", background: "transparent",
            border: "none", cursor: "pointer",
          }}>
            {showAll ? "Show less ↑" : `Show all ${sorted.length} →`}
          </button>
        )}
      </div>

      {/* Header */}
      <div style={{ display: "flex", gap: 8, padding: "0 0 8px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        {COLS.map(col => (
          <button key={col.key} onClick={() => toggleSort(col.key)} style={{
            ...col.style,
            background: "transparent", border: "none", cursor: "pointer", padding: 0,
            textAlign: col.style.textAlign || "left",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: sortKey === col.key ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>
              {col.label}
            </span>
            {sortKey === col.key && (
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.6)" }}>{sortDir === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", padding: "24px 0", textAlign: "center" }}>
          No orders found.
        </p>
      ) : (
        displayed.map((row, i) => {
          const s = STATUS_STYLE[row.status] || STATUS_STYLE.Pending;
          return (
            <div key={row.id} style={{
              display: "flex", gap: 8, padding: "10px 0", alignItems: "center",
              borderBottom: i < displayed.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <span style={{ ...COLS[0].style, fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.id}
              </span>
              <span style={{ ...COLS[1].style, fontSize: 12, color: "#fff" }}>{row.category}</span>
              <span style={{ ...COLS[2].style, fontSize: 12, color: "rgba(255,255,255,0.7)" }}>{row.state}</span>
              <span style={{ ...COLS[3].style, fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{row.date}</span>
              <span style={{
                ...COLS[4].style,
                fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, textAlign: "center",
                background: s.bg, color: s.color, border: `1px solid ${s.border}`,
              }}>{row.status}</span>
              <span style={{ ...COLS[5].style, fontSize: 12, fontWeight: 600, color: "#fff" }}>₹{row.revenue}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
