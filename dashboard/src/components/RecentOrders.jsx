import { useState } from "react";
import { allOrders } from "../data/dashboardData";

const STATUS_STYLE = {
  Delivered: { bg: "rgba(52,199,89,0.15)",   color: "#34c759" },
  Shipped:   { bg: "rgba(0,122,255,0.15)",   color: "#007aff" },
  Cancelled: { bg: "rgba(255,59,48,0.15)",   color: "#ff3b30" },
  Returned:  { bg: "rgba(175,82,222,0.15)",  color: "#af52de" },
  Pending:   { bg: "rgba(255,149,0,0.15)",   color: "#ff9500" },
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
  const [showAll, setShowAll] = useState(false);
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

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
        <p style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>Recent Orders</p>
        {hasMore && (
          <button onClick={() => setShowAll(s => !s)} style={{
            fontSize: 12, color: "#007aff", background: "transparent",
            border: "none", cursor: "pointer", fontWeight: 500,
          }}>
            {showAll ? "Show less" : `Show all ${sorted.length}`}
          </button>
        )}
      </div>

      <div style={{ display: "flex", gap: 8, padding: "0 0 10px", borderBottom: "1px solid rgba(84,84,88,0.45)" }}>
        {COLS.map(col => (
          <button key={col.key} onClick={() => toggleSort(col.key)} style={{
            ...col.style,
            background: "transparent", border: "none", cursor: "pointer", padding: 0,
            textAlign: col.style.textAlign || "left",
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 500,
              color: sortKey === col.key ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
              textTransform: "uppercase", letterSpacing: 0.4,
            }}>
              {col.label}
            </span>
            {sortKey === col.key && (
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{sortDir === "asc" ? "↑" : "↓"}</span>
            )}
          </button>
        ))}
      </div>

      {displayed.length === 0 ? (
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", padding: "24px 0", textAlign: "center" }}>
          No orders found.
        </p>
      ) : (
        displayed.map((row, i) => {
          const s = STATUS_STYLE[row.status] || STATUS_STYLE.Pending;
          return (
            <div key={row.id} style={{
              display: "flex", gap: 8, padding: "11px 0", alignItems: "center",
              borderBottom: i < displayed.length - 1 ? "1px solid rgba(84,84,88,0.3)" : "none",
            }}>
              <span style={{ ...COLS[0].style, fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "SF Mono, Menlo, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {row.id}
              </span>
              <span style={{ ...COLS[1].style, fontSize: 13, color: "#fff" }}>{row.category}</span>
              <span style={{ ...COLS[2].style, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{row.state}</span>
              <span style={{ ...COLS[3].style, fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{row.date}</span>
              <span style={{
                ...COLS[4].style,
                fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, textAlign: "center",
                background: s.bg, color: s.color,
              }}>{row.status}</span>
              <span style={{ ...COLS[5].style, fontSize: 13, fontWeight: 600, color: "#fff" }}>₹{row.revenue}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
