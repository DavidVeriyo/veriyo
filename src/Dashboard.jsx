import { useState, useRef } from "react";
import Nav from "./Nav";

// ─── VERIYO COMPLIANCE DASHBOARD ─────────────────────────────────────────────
export default function Dashboard({ user, onSection, onLogout }) {
  return (
    <div>
      <Nav user={user} section="dashboard" onSection={onSection} onLogout={onLogout} />
      <VeriyoDashboard />
    </div>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// VERIYO COMPLETE DASHBOARD (inlined from veriyo-complete.jsx)
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  primaryBorder: "#b8deca", accent: "#34d17a",
  white: "#ffffff", bg: "#f7faf8",
  border: "#e3ede8", borderLight: "#f0f5f2",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  blue: "#1a7a4a", blueBg: "#e8f5ee", blueBorder: "#b8deca",
  purple: "#7c3aed", purpleBg: "#f5f3ff", purpleBorder: "#ddd6fe",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
  teal: "#166840", tealBg: "#e8f5ee", tealBorder: "#b8deca",
};

const FACILITIES = [
  { id: "f1", name: "Uniting Aged Care — Parramatta", sector: "agedCare", ndisRequired: true },
  { id: "f2", name: "Uniting Aged Care — Liverpool", sector: "agedCare", ndisRequired: true },
  { id: "f3", name: "Uniting Aged Care — Blacktown", sector: "agedCare", ndisRequired: false },
  { id: "f4", name: "HACC Senior Gym — Sydney", sector: "agedCare", ndisRequired: false },
  { id: "f5", name: "All About Children — Bella Vista", sector: "earlyLearning", ndisRequired: false },
  { id: "f6", name: "All About Children — Castle Hill", sector: "earlyLearning", ndisRequired: false },
  { id: "f7", name: "Explorers Early Learning — Norwest", sector: "earlyLearning", ndisRequired: false },
  { id: "f8", name: "NSW CSE — Singleton", sector: "agedCare", ndisRequired: true },
];

const ALL_CHECKS = [
  { id: "police", label: "National Police Check", sector: "all", mandatory: true, renewYears: 3 },
  { id: "ndis", label: "NDIS Worker Screening", sector: "ndis", mandatory: true, renewYears: 5 },
  { id: "wwcc", label: "Working With Children Check", sector: "earlyLearning", mandatory: true, renewYears: 5 },
  { id: "firstaid", label: "First Aid Certificate", sector: "all", mandatory: true, renewYears: 3 },
  { id: "cpr", label: "CPR Certificate", sector: "all", mandatory: true, renewYears: 1 },
  { id: "covid", label: "COVID-19 Vaccination", sector: "agedCare", mandatory: true, renewYears: null },
  { id: "flu", label: "Influenza Vaccination", sector: "agedCare", mandatory: true, renewYears: 1 },
  { id: "manual", label: "Manual Handling", sector: "all", mandatory: true, renewYears: 3 },
  { id: "infect", label: "Infection Control", sector: "all", mandatory: true, renewYears: 2 },
  { id: "dementia", label: "Dementia Care Training", sector: "agedCare", mandatory: false, renewYears: 3 },
  { id: "anaphylaxis", label: "Anaphylaxis Management", sector: "earlyLearning", mandatory: true, renewYears: 3 },
  { id: "food", label: "Food Safety Certificate", sector: "earlyLearning", mandatory: false, renewYears: 5 },
  { id: "righttowork", label: "Right to Work (Visa / Citizenship)", sector: "all", mandatory: true, renewYears: null },
  { id: "tfn", label: "Tax File Number Declaration", sector: "all", mandatory: true, renewYears: null },
  { id: "super", label: "Superannuation Choice Form", sector: "all", mandatory: true, renewYears: null },
  { id: "bank", label: "Bank Account Details", sector: "all", mandatory: true, renewYears: null },
  { id: "quals", label: "Qualifications / Certificates", sector: "all", mandatory: true, renewYears: null },
  { id: "ref", label: "Reference Checks (x2)", sector: "all", mandatory: true, renewYears: null },
  { id: "uniform", label: "Uniform Size Recorded", sector: "all", mandatory: false, renewYears: null },
];

const STATUS_OPT = ["verified", "pending", "expired", "missing", "not_required"];

function randomStatus(mandatory) {
  if (!mandatory) return Math.random() > 0.4 ? "verified" : "not_required";
  const r = Math.random();
  if (r < 0.55) return "verified";
  if (r < 0.72) return "pending";
  if (r < 0.82) return "expired";
  return "missing";
}

function makeWorkers() {
  const firstNames = ["Sarah","James","Amara","Michael","Priya","Tom","Nguyen","Lisa","David","Julie","Fatima","Marcus","Anna","Leon","Rachel","Kevin","Zoe","Daniel","Mei","Oscar"];
  const lastNames = ["Chen","O'Brien","Diallo","Tran","Sharma","Nguyen","Park","Osei","Williams","Garcia","Smith","Johnson","Brown","Davis","Wilson","Martinez","Anderson","Taylor","Thomas","Jackson"];
  const roles = ["Support Worker","Registered Nurse","Personal Carer","Team Leader","Allied Health","Admin Officer","Care Coordinator","Kitchen Hand","Enrolled Nurse","Early Childhood Educator"];
  const sectors = ["agedCare","agedCare","agedCare","earlyLearning","ndis","agedCare"];

  return Array.from({ length: 22 }, (_, i) => {
    const sector = sectors[i % sectors.length];
    const facility = FACILITIES.filter(f =>
      sector === "earlyLearning" ? f.sector === "earlyLearning" :
      sector === "ndis" ? f.ndisRequired :
      f.sector === "agedCare"
    )[i % 5] || FACILITIES[0];

    const checks = {};
    ALL_CHECKS.forEach(c => {
      const applicable =
        c.sector === "all" ||
        (c.sector === "ndis" && (sector === "ndis" || facility.ndisRequired)) ||
        (c.sector === "agedCare" && sector === "agedCare") ||
        (c.sector === "earlyLearning" && sector === "earlyLearning");
      checks[c.id] = applicable ? randomStatus(c.mandatory) : "not_required";
    });

    const vals = Object.values(checks);
    const total = vals.filter(v => v !== "not_required").length;
    const done = vals.filter(v => v === "verified").length;
    const pct = total ? Math.round((done / total) * 100) : 100;
    const status = vals.includes("missing") ? "risk" : vals.includes("expired") ? "attention" : vals.includes("pending") ? "inprogress" : "compliant";

    return {
      id: `w${i + 1}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      role: roles[i % roles.length],
      sector,
      facility: facility.name,
      facilityId: facility.id,
      startDate: `2024-0${(i % 9) + 1}-${String((i * 3 % 28) + 1).padStart(2, "0")}`,
      pct,
      status,
      checks,
    };
  });
}

const WORKERS = makeWorkers();

const statusMeta = {
  verified:     { label: "Verified",     color: C.green,  bg: C.greenBg,  border: C.greenBorder,  dot: "●" },
  pending:      { label: "Pending",      color: C.amber,  bg: C.amberBg,  border: C.amberBorder,  dot: "●" },
  expired:      { label: "Expired",      color: C.red,    bg: C.redBg,    border: C.redBorder,    dot: "●" },
  missing:      { label: "Missing",      color: C.red,    bg: C.redBg,    border: C.redBorder,    dot: "!" },
  not_required: { label: "N/A",          color: C.grey,   bg: C.greyBg,   border: C.greyBorder,   dot: "–" },
};

const workerStatusMeta = {
  compliant:  { label: "Compliant",   color: C.green,  bg: C.greenBg },
  inprogress: { label: "In Progress", color: C.blue,   bg: C.blueBg },
  attention:  { label: "Attention",   color: C.amber,  bg: C.amberBg },
  risk:       { label: "Risk",        color: C.red,    bg: C.redBg },
};

function Pill({ status }) {
  const m = statusMeta[status] || statusMeta.not_required;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600,
      color: m.color, background: m.bg, border: `1px solid ${m.border}`,
      borderRadius: 20, padding: "2px 8px", whiteSpace: "nowrap" }}>
      {m.dot} {m.label}
    </span>
  );
}

function ProgressBar({ pct, status }) {
  const col = status === "compliant" ? C.green : status === "inprogress" ? C.blue : status === "attention" ? C.amber : C.red;
  return (
    <div style={{ width: "100%", height: 6, background: "#e8ede9", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 4, transition: "width 0.4s" }} />
    </div>
  );
}

// ─── COMPLIANCE TREND CHART (inline SVG) ─────────────────────────────────────
const TREND_DATA = [
  { month: "Apr", pct: 61 }, { month: "May", pct: 67 }, { month: "Jun", pct: 70 },
  { month: "Jul", pct: 74 }, { month: "Aug", pct: 78 }, { month: "Sep", pct: 72 },
  { month: "Oct", pct: 81 }, { month: "Nov", pct: 85 }, { month: "Dec", pct: 83 },
  { month: "Jan", pct: 87 }, { month: "Feb", pct: 91 }, { month: "Mar", pct: 88 },
];

function TrendChart() {
  const W = 560, H = 180, pad = { top: 16, right: 16, bottom: 36, left: 36 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;
  const xStep = chartW / (TREND_DATA.length - 1);
  const yScale = v => chartH - ((v - 50) / 50) * chartH;
  const pts = TREND_DATA.map((d, i) => [pad.left + i * xStep, pad.top + yScale(d.pct)]);
  const pathD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaD = pathD + ` L${pts[pts.length - 1][0]},${pad.top + chartH} L${pts[0][0]},${pad.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: W, display: "block" }}>
      {/* y gridlines */}
      {[60, 70, 80, 90, 100].map(v => {
        const y = pad.top + yScale(v);
        return (
          <g key={v}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="#e3ede8" strokeWidth={1} />
            <text x={pad.left - 6} y={y + 4} fontSize={9} fill="#7a9e8e" textAnchor="end">{v}%</text>
          </g>
        );
      })}
      {/* area fill */}
      <path d={areaD} fill="#1a7a4a" fillOpacity={0.08} />
      {/* line */}
      <path d={pathD} fill="none" stroke="#1a7a4a" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {/* dots + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={4} fill="#1a7a4a" />
          <text x={p[0]} y={pad.top + chartH + 16} fontSize={9} fill="#7a9e8e" textAnchor="middle">
            {TREND_DATA[i].month}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── STATUS DONUT CHART ────────────────────────────────────────────────────────
function StatusDonut({ stats }) {
  const total = stats.total || 1;
  const segments = [
    { key: "compliant",  label: "Compliant",   color: "#1a7a4a", val: stats.compliant },
    { key: "inprogress", label: "In Progress",  color: "#2563eb", val: stats.inprogress },
    { key: "attention",  label: "Attention",    color: "#d97706", val: stats.attention },
    { key: "risk",       label: "At Risk",      color: "#dc2626", val: stats.risk },
  ];
  const cx = 70, cy = 70, r = 54, hole = 36;
  let cumAngle = -Math.PI / 2;
  const arcs = segments.map(seg => {
    const angle = (seg.val / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(cumAngle);
    const y1 = cy + r * Math.sin(cumAngle);
    cumAngle += angle;
    const x2 = cx + r * Math.cos(cumAngle);
    const y2 = cy + r * Math.sin(cumAngle);
    const hx1 = cx + hole * Math.cos(cumAngle - angle);
    const hy1 = cy + hole * Math.sin(cumAngle - angle);
    const hx2 = cx + hole * Math.cos(cumAngle);
    const hy2 = cy + hole * Math.sin(cumAngle);
    const large = angle > Math.PI ? 1 : 0;
    const d = `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} L${hx2},${hy2} A${hole},${hole} 0 ${large} 0 ${hx1},${hy1} Z`;
    return { ...seg, d };
  });

  const compPct = Math.round((stats.compliant / total) * 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
      <svg viewBox="0 0 140 140" style={{ width: 140, minWidth: 140 }}>
        {arcs.map((a, i) => (
          <path key={i} d={a.d} fill={a.color} opacity={0.9} />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={22} fontWeight={800} fill="#1a2e24">{compPct}%</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize={9} fill="#7a9e8e">Compliant</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {segments.map(s => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#4a6357" }}>{s.label}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1a2e24", marginLeft: "auto", paddingLeft: 16 }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADD WORKER MODAL ─────────────────────────────────────────────────────────
const WORKER_ROLES = ["Support Worker","Registered Nurse","Personal Carer","Team Leader","Allied Health","Admin Officer","Care Coordinator","Kitchen Hand","Enrolled Nurse","Early Childhood Educator","Recruiter","Hiring Manager"];

function AddWorkerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", role: "", sector: "agedCare", facility: "", email: "", phone: "", start: "" });
  const [saved, setSaved] = useState(false);

  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }

  function submit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { onAdd(form); onClose(); }, 1200);
  }

  const inp = {
    width: "100%", padding: "9px 12px", border: "1.5px solid #e3ede8", borderRadius: 8,
    fontSize: 13, fontFamily: "inherit", color: "#1a2e24", outline: "none", boxSizing: "border-box",
  };
  const lbl = { fontSize: 12, fontWeight: 700, color: "#4a6357", display: "block", marginBottom: 4 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.18)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e3ede8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1a2e24" }}>Add New Worker</div>
          <button onClick={onClose} style={{ background: "#f8fafc", border: "none", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 18, color: "#4a6357" }}>×</button>
        </div>
        {saved ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1a7a4a" }}>Worker added!</div>
            <div style={{ fontSize: 13, color: "#7a9e8e", marginTop: 4 }}>Compliance checklist created.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={lbl}>Full Name *</label>
                <input style={inp} required value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Jane Smith" />
              </div>
              <div>
                <label style={lbl}>Email</label>
                <input style={inp} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={lbl}>Role *</label>
                <select style={inp} required value={form.role} onChange={e => set("role", e.target.value)}>
                  <option value="">Select role…</option>
                  {WORKER_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Sector *</label>
                <select style={inp} required value={form.sector} onChange={e => set("sector", e.target.value)}>
                  <option value="agedCare">Aged Care</option>
                  <option value="earlyLearning">Early Learning</option>
                  <option value="ndis">NDIS</option>
                </select>
              </div>
            </div>
            <div>
              <label style={lbl}>Facility *</label>
              <select style={inp} required value={form.facility} onChange={e => set("facility", e.target.value)}>
                <option value="">Select facility…</option>
                {FACILITIES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={lbl}>Phone</label>
                <input style={inp} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="04xx xxx xxx" />
              </div>
              <div>
                <label style={lbl}>Start Date</label>
                <input style={inp} type="date" value={form.start} onChange={e => set("start", e.target.value)} />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button type="button" onClick={onClose} style={{ padding: "10px 20px", borderRadius: 8, border: "1.5px solid #e3ede8", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#4a6357" }}>Cancel</button>
              <button type="submit" style={{ padding: "10px 24px", borderRadius: 8, border: "none", background: "#1a7a4a", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add Worker</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ stats, workers }) {
  const expiringSoon = workers.filter(w => w.status === "attention" || w.status === "risk").slice(0, 5);
  const checkBreakdown = [
    { label: "Police Check",   verified: 18, pending: 2, expired: 1, missing: 1 },
    { label: "NDIS Screening", verified: 10, pending: 3, expired: 1, missing: 0 },
    { label: "WWCC",           verified: 7,  pending: 1, expired: 1, missing: 1 },
    { label: "First Aid",      verified: 17, pending: 3, expired: 2, missing: 0 },
    { label: "CPR",            verified: 14, pending: 4, expired: 3, missing: 1 },
  ];
  const card = { background: "#fff", border: "1px solid #e3ede8", borderRadius: 14, padding: "20px 22px" };
  const cardTitle = { fontSize: 13, fontWeight: 800, color: "#1a2e24", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* top row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Trend */}
        <div style={card}>
          <div style={cardTitle}>
            <span>Compliance Rate — Last 12 Months</span>
            <span style={{ fontSize: 11, color: "#7a9e8e", fontWeight: 600 }}>FY 2025–26</span>
          </div>
          <TrendChart />
        </div>
        {/* Donut */}
        <div style={card}>
          <div style={cardTitle}><span>Status Breakdown</span></div>
          <StatusDonut stats={stats} />
          <div style={{ marginTop: 20, padding: "12px 0", borderTop: "1px solid #f0f5f2" }}>
            <div style={{ fontSize: 11, color: "#7a9e8e", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: 8 }}>Sector Split</div>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { label: "Aged Care", count: workers.filter(w => w.sector === "agedCare").length, color: "#1a7a4a" },
                { label: "NDIS", count: workers.filter(w => w.sector === "ndis").length, color: "#7c3aed" },
                { label: "Early Learning", count: workers.filter(w => w.sector === "earlyLearning").length, color: "#2563eb" },
              ].map(s => (
                <div key={s.label} style={{ fontSize: 12, color: s.color, fontWeight: 700 }}>
                  {s.count} <span style={{ fontWeight: 400, color: "#7a9e8e" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Needs Attention */}
        <div style={card}>
          <div style={cardTitle}><span>⚠️ Needs Attention</span></div>
          {expiringSoon.length === 0 ? (
            <div style={{ fontSize: 13, color: "#7a9e8e" }}>All workers are compliant!</div>
          ) : (
            expiringSoon.map(w => (
              <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #f0f5f2" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2e24" }}>{w.name}</div>
                  <div style={{ fontSize: 11, color: "#7a9e8e" }}>{w.role}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: w.status === "risk" ? "#dc2626" : "#d97706" }}>
                  {w.pct}%
                </div>
              </div>
            ))
          )}
        </div>

        {/* Check Breakdown */}
        <div style={card}>
          <div style={cardTitle}><span>Checks by Type</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {checkBreakdown.map(cb => {
              const tot = cb.verified + cb.pending + cb.expired + cb.missing;
              const pct = Math.round((cb.verified / tot) * 100);
              return (
                <div key={cb.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: "#1a2e24", fontWeight: 600 }}>{cb.label}</span>
                    <span style={{ fontSize: 11, color: "#7a9e8e" }}>{cb.verified}/{tot} verified</span>
                  </div>
                  <div style={{ height: 6, background: "#e8ede9", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${pct}%`, background: "#1a7a4a", height: "100%" }} />
                    <div style={{ width: `${Math.round((cb.pending/tot)*100)}%`, background: "#f59e0b", height: "100%" }} />
                    <div style={{ width: `${Math.round(((cb.expired+cb.missing)/tot)*100)}%`, background: "#ef4444", height: "100%" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 14 }}>
            {[["#1a7a4a","Verified"],["#f59e0b","Pending"],["#ef4444","Issues"]].map(([col, lbl]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#7a9e8e" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: col }} />{lbl}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VeriyoDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSector, setFilterSector] = useState("all");
  const [filterFacility, setFilterFacility] = useState("all");
  const [search, setSearch] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [aiResults, setAiResults] = useState({});
  const [aiLoading, setAiLoading] = useState({});
  const [showAddWorker, setShowAddWorker] = useState(false);
  const [extraWorkers, setExtraWorkers] = useState([]);
  const fileRef = useRef();

  const allWorkers = [...WORKERS, ...extraWorkers];

  const filtered = allWorkers.filter(w => {
    if (filterStatus !== "all" && w.status !== filterStatus) return false;
    if (filterSector !== "all" && w.sector !== filterSector) return false;
    if (filterFacility !== "all" && w.facilityId !== filterFacility) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: allWorkers.length,
    compliant: allWorkers.filter(w => w.status === "compliant").length,
    risk: allWorkers.filter(w => w.status === "risk").length,
    attention: allWorkers.filter(w => w.status === "attention").length,
    inprogress: allWorkers.filter(w => w.status === "inprogress").length,
  };

  function handleAddWorker(form) {
    const newWorker = {
      id: `w${Date.now()}`,
      name: form.name,
      role: form.role,
      sector: form.sector,
      facility: FACILITIES.find(f => f.id === form.facility)?.name || form.facility,
      facilityId: form.facility,
      startDate: form.start || new Date().toISOString().slice(0, 10),
      pct: 0,
      status: "inprogress",
      checks: Object.fromEntries(ALL_CHECKS.map(c => [c.id, "missing"])),
    };
    setExtraWorkers(p => [...p, newWorker]);
  }

  function simulateAiRead(workerId, checkId) {
    const key = `${workerId}_${checkId}`;
    setAiLoading(p => ({ ...p, [key]: true }));
    setTimeout(() => {
      setAiLoading(p => ({ ...p, [key]: false }));
      setAiResults(p => ({
        ...p,
        [key]: {
          ok: true,
          name: selectedWorker?.name,
          expiry: "2027-06-30",
          issuer: "NSW Police Force",
          confidence: 97,
        },
      }));
    }, 2200);
  }

  const s = {
    wrap: { minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif", color: C.text },
    header: { background: C.white, borderBottom: `1px solid ${C.border}`, padding: "0 24px" },
    headerInner: { maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 },
    hLeft: { display: "flex", alignItems: "center", gap: 16 },
    hTitle: { fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" },
    hSub: { fontSize: 13, color: C.textMuted },
    tabs: { display: "flex", gap: 2, background: "#f0f5f2", borderRadius: 10, padding: 3 },
    tab: (active) => ({
      padding: "6px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit",
      background: active ? C.white : "transparent",
      color: active ? C.primary : C.textMuted,
      boxShadow: active ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
    }),
    main: { maxWidth: 1300, margin: "0 auto", padding: "24px 24px" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: 24 },
    statCard: (color, bg) => ({
      background: bg, border: `1px solid ${color}30`, borderRadius: 14, padding: "20px 20px",
      display: "flex", flexDirection: "column", gap: 4,
    }),
    statNum: (color) => ({ fontSize: 32, fontWeight: 800, color, lineHeight: 1, letterSpacing: "-1px" }),
    statLabel: { fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px" },
    filterRow: { display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" },
    searchInput: {
      flex: "1 1 200px", padding: "8px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8,
      fontSize: 14, fontFamily: "inherit", color: C.text, background: C.white, outline: "none",
    },
    select: {
      padding: "8px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8,
      fontSize: 13, fontFamily: "inherit", color: C.textMid, background: C.white, cursor: "pointer", outline: "none",
    },
    table: { width: "100%", borderCollapse: "collapse", background: C.white, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}` },
    th: { padding: "10px 14px", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left", background: "#f4f8f6", borderBottom: `1px solid ${C.border}` },
    td: { padding: "12px 14px", fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}`, verticalAlign: "middle" },
    rowHover: { cursor: "pointer", transition: "background 0.15s" },
    nameCell: { fontWeight: 600, color: C.text, fontSize: 14 },
    roleCell: { fontSize: 12, color: C.textMuted, marginTop: 2 },
    pctCell: { display: "flex", flexDirection: "column", gap: 4, minWidth: 100 },
    pctNum: (status) => ({ fontSize: 12, fontWeight: 700, color: workerStatusMeta[status]?.color }),
    statusBadge: (status) => {
      const m = workerStatusMeta[status] || {};
      return {
        display: "inline-block", fontSize: 11, fontWeight: 700, padding: "3px 10px",
        borderRadius: 20, color: m.color, background: m.bg,
      };
    },
    panel: {
      position: "fixed", top: 52, right: 0, bottom: 0, width: 480, background: C.white,
      borderLeft: `1.5px solid ${C.border}`, overflowY: "auto", zIndex: 200,
      boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
    },
    panelHeader: { padding: "20px 24px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.white, zIndex: 1 },
    panelTitle: { fontSize: 17, fontWeight: 800, color: C.text, margin: 0 },
    panelRole: { fontSize: 13, color: C.textMuted, marginTop: 4 },
    closeBtn: {
      position: "absolute", top: 16, right: 16, background: C.greyBg, border: "none", borderRadius: 8,
      width: 32, height: 32, cursor: "pointer", fontSize: 18, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center",
    },
    checkItem: { display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 0", borderBottom: `1px solid ${C.borderLight}` },
    checkLabel: { fontSize: 13, fontWeight: 600, color: C.text, flex: 1 },
    uploadBtn: {
      background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 6, padding: "4px 10px",
      fontSize: 11, fontWeight: 600, color: C.blue, cursor: "pointer", fontFamily: "inherit",
    },
    aiBox: (ok) => ({
      marginTop: 6, padding: "8px 12px", borderRadius: 8, fontSize: 11,
      background: ok ? C.greenBg : C.amberBg, border: `1px solid ${ok ? C.greenBorder : C.amberBorder}`,
      color: ok ? C.green : C.amber,
    }),
  };

  return (
    <div style={s.wrap}>
      {/* Sub-header */}
      <div style={s.header}>
        <div style={s.headerInner}>
          <div style={s.hLeft}>
            <div>
              <div style={s.hTitle}>Compliance Dashboard</div>
              <div style={s.hSub}>Workforce compliance pipeline · {FACILITIES.length} facilities</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={s.tabs}>
              {["overview", "workers", "documents"].map(t => (
                <button key={t} style={s.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddWorker(true)}
              style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}
            >
              + Add Worker
            </button>
          </div>
        </div>
      </div>

      {showAddWorker && (
        <AddWorkerModal onClose={() => setShowAddWorker(false)} onAdd={handleAddWorker} />
      )}

      <div style={s.main}>
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <OverviewTab stats={stats} workers={allWorkers} />
        )}

        {activeTab !== "overview" && <>
        {/* STATS */}
        <div style={s.statsRow}>
          {[
            { label: "Total Workers", num: stats.total, color: C.primary, bg: C.primaryXLight },
            { label: "Fully Compliant", num: stats.compliant, color: C.green, bg: C.greenBg },
            { label: "In Progress", num: stats.inprogress, color: C.blue, bg: C.blueBg },
            { label: "Need Attention", num: stats.attention, color: C.amber, bg: C.amberBg },
            { label: "At Risk", num: stats.risk, color: C.red, bg: C.redBg },
          ].map((stat, i) => (
            <div key={i} style={s.statCard(stat.color, stat.bg)}>
              <div style={s.statNum(stat.color)}>{stat.num}</div>
              <div style={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={s.filterRow}>
          <input
            style={s.searchInput}
            placeholder="Search workers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select style={s.select} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="all">All statuses</option>
            <option value="compliant">Compliant</option>
            <option value="inprogress">In Progress</option>
            <option value="attention">Attention</option>
            <option value="risk">Risk</option>
          </select>
          <select style={s.select} value={filterSector} onChange={e => setFilterSector(e.target.value)}>
            <option value="all">All sectors</option>
            <option value="agedCare">Aged Care</option>
            <option value="earlyLearning">Early Learning</option>
            <option value="ndis">NDIS</option>
          </select>
          <select style={s.select} value={filterFacility} onChange={e => setFilterFacility(e.target.value)}>
            <option value="all">All facilities</option>
            {FACILITIES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
          </select>
        </div>

        {/* TABLE */}
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Worker</th>
              <th style={s.th}>Facility</th>
              <th style={s.th}>Sector</th>
              <th style={s.th}>Compliance</th>
              <th style={s.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(w => (
              <tr
                key={w.id}
                style={s.rowHover}
                onClick={() => setSelectedWorker(w)}
                onMouseEnter={e => e.currentTarget.style.background = "#f7faf8"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={s.td}>
                  <div style={s.nameCell}>{w.name}</div>
                  <div style={s.roleCell}>{w.role}</div>
                </td>
                <td style={{ ...s.td, fontSize: 12, color: C.textMid, maxWidth: 200 }}>{w.facility}</td>
                <td style={{ ...s.td, fontSize: 12, color: C.textMid, textTransform: "capitalize" }}>{w.sector.replace("agedCare","Aged Care").replace("earlyLearning","Early Learning").replace("ndis","NDIS")}</td>
                <td style={s.td}>
                  <div style={s.pctCell}>
                    <div style={s.pctNum(w.status)}>{w.pct}%</div>
                    <ProgressBar pct={w.pct} status={w.status} />
                  </div>
                </td>
                <td style={s.td}>
                  <span style={s.statusBadge(w.status)}>{workerStatusMeta[w.status]?.label}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: C.textMuted, fontSize: 14 }}>
            No workers match your filters.
          </div>
        )}
        </>}
      </div>

      {/* WORKER PANEL */}
      {selectedWorker && (
        <div style={s.panel}>
          <div style={s.panelHeader}>
            <button style={s.closeBtn} onClick={() => setSelectedWorker(null)}>×</button>
            <div style={s.panelTitle}>{selectedWorker.name}</div>
            <div style={s.panelRole}>{selectedWorker.role} · {selectedWorker.facility}</div>
            <div style={{ marginTop: 12 }}>
              <ProgressBar pct={selectedWorker.pct} status={selectedWorker.status} />
              <div style={{ fontSize: 12, color: workerStatusMeta[selectedWorker.status]?.color, fontWeight: 700, marginTop: 4 }}>
                {selectedWorker.pct}% complete · {workerStatusMeta[selectedWorker.status]?.label}
              </div>
            </div>
          </div>

          <div style={{ padding: "16px 24px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              Compliance Checklist
            </div>
            {ALL_CHECKS.map(check => {
              const st = selectedWorker.checks[check.id];
              const key = `${selectedWorker.id}_${check.id}`;
              const aiR = aiResults[key];
              const aiL = aiLoading[key];
              return (
                <div key={check.id} style={s.checkItem}>
                  <div style={{ flex: 1 }}>
                    <div style={s.checkLabel}>{check.label}</div>
                    {aiL && (
                      <div style={s.aiBox(false)}>🔍 Reading document…</div>
                    )}
                    {aiR && (
                      <div style={s.aiBox(true)}>
                        ✅ AI Verified · Expires {aiR.expiry} · {aiR.confidence}% confidence
                      </div>
                    )}
                    {uploadedDocs[key] && !aiR && !aiL && (
                      <button style={s.uploadBtn} onClick={() => simulateAiRead(selectedWorker.id, check.id)}>
                        🤖 Run AI Check
                      </button>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <Pill status={st} />
                    {st !== "not_required" && (
                      <button
                        style={s.uploadBtn}
                        onClick={() => {
                          setUploadedDocs(p => ({ ...p, [key]: true }));
                          simulateAiRead(selectedWorker.id, check.id);
                        }}
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
