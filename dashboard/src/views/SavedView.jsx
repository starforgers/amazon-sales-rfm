const pins = [
  {
    title: "Maharashtra — Top Revenue State",
    desc: "₹12.2M in Q2 2022, up +8.2% MoM. Accounts for 30.7% of the top-5 states' combined revenue.",
    tag: "Geography",
    tagColor: "#60a5fa",
    metric: "₹12.2M",
    metricSub: "+8.2% MoM",
    metricColor: "#4ade80",
  },
  {
    title: "Champions Segment — High Retention Priority",
    desc: "21 customers driving ₹1.86 Cr (26% of total revenue). Average RFM score 455. Protect with exclusive tier access.",
    tag: "Customers",
    tagColor: "#10B981",
    metric: "₹1.86 Cr",
    metricSub: "26% of revenue",
    metricColor: "#10B981",
  },
  {
    title: "Cancellation Rate Watch",
    desc: "14.2% Q2 cancel rate is 4.2 pts above the 10% industry benchmark. Set pattern is the highest-volume category — check fulfilment SLAs.",
    tag: "Operations",
    tagColor: "#fb923c",
    metric: "14.2%",
    metricSub: "Benchmark: 10%",
    metricColor: "#f87171",
  },
  {
    title: "Set Category — Volume Leader",
    desc: "50,281 orders (39.1% of total). ₹3.25 Cr revenue. AOV ₹645. Highest revenue concentration — any supply disruption has outsized impact.",
    tag: "Products",
    tagColor: "#a78bfa",
    metric: "50,281",
    metricSub: "39.1% of orders",
    metricColor: "#a78bfa",
  },
  {
    title: "40 At-Risk Customers",
    desc: "Largest RFM segment by count (26.3%). Average recency >190 days. Win-back email campaign personalised by last purchased category recommended.",
    tag: "Customers",
    tagColor: "#EF4444",
    metric: "40",
    metricSub: "26.3% of base",
    metricColor: "#EF4444",
  },
  {
    title: "Revenue MoM Decline",
    desc: "Revenue fell each month in Q2: Apr ₹26.2M → May ₹24.0M (-8.6%) → Jun ₹21.4M (-10.7%). Order volume also dropped in June to 34K from 50K in April.",
    tag: "Sales",
    tagColor: "#f87171",
    metric: "-18.4%",
    metricSub: "Apr → Jun",
    metricColor: "#f87171",
  },
];

export default function SavedView() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>Saved Views</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>Pinned insights · Q2 2022</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "8px 14px", fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
          {pins.length} saved
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {pins.map(pin => (
          <div key={pin.title} className="glass" style={{ padding: "20px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5,
                background: `${pin.tagColor}20`, color: pin.tagColor, border: `1px solid ${pin.tagColor}40`,
                textTransform: "uppercase", letterSpacing: 0.8,
              }}>{pin.tag}</span>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 20, fontWeight: 700, color: pin.metricColor, lineHeight: 1 }}>{pin.metric}</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{pin.metricSub}</p>
              </div>
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{pin.title}</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.55, flex: 1 }}>{pin.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}
