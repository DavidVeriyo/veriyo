import { useState, useRef } from "react";
import Nav from "./Nav";

export default function Dashboard({ user, onSection, onLogout, onOpenPortal }) {
  return (
    <div>
      <Nav user={user} section="dashboard" onSection={onSection} onLogout={onLogout} />
      <VeriyoDashboard user={user} onOpenPortal={onOpenPortal} />
    </div>
  );
}

// ─── BRAND COLOURS ────────────────────────────────────────────────────────────
const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  primaryBorder: "#b8deca",
  white: "#ffffff", bg: "#f4f7f5",
  border: "#e3ede8", borderLight: "#f0f5f2",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
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
  { id: "police",      label: "National Police Check",            sector: "all",           mandatory: true,  renewYears: 3 },
  { id: "ndis",        label: "NDIS Worker Screening",            sector: "ndis",          mandatory: true,  renewYears: 5 },
  { id: "banning",     label: "NDIS Banning Order Check",         sector: "ndis",          mandatory: true,  renewYears: null },
  { id: "wwcc",        label: "Working With Children Check",      sector: "earlyLearning", mandatory: true,  renewYears: 5 },
  { id: "firstaid",    label: "First Aid Certificate",            sector: "all",           mandatory: true,  renewYears: 3 },
  { id: "cpr",         label: "CPR Certificate",                  sector: "all",           mandatory: true,  renewYears: 1 },
  { id: "covid",       label: "COVID-19 Vaccination",             sector: "agedCare",      mandatory: true,  renewYears: null },
  { id: "flu",         label: "Influenza Vaccination",            sector: "agedCare",      mandatory: true,  renewYears: 1 },
  { id: "manual",      label: "Manual Handling",                  sector: "all",           mandatory: true,  renewYears: 3 },
  { id: "infect",      label: "Infection Control",                sector: "all",           mandatory: true,  renewYears: 2 },
  { id: "dementia",    label: "Dementia Care Training",           sector: "agedCare",      mandatory: false, renewYears: 3 },
  { id: "anaphylaxis", label: "Anaphylaxis Management",           sector: "earlyLearning", mandatory: true,  renewYears: 3 },
  { id: "food",        label: "Food Safety Certificate",          sector: "earlyLearning", mandatory: false, renewYears: 5 },
  { id: "righttowork", label: "Right to Work (Visa / Citizenship)", sector: "all",         mandatory: true,  renewYears: null },
  { id: "tfn",         label: "Tax File Number Declaration",      sector: "all",           mandatory: true,  renewYears: null },
  { id: "super",       label: "Superannuation Choice Form",       sector: "all",           mandatory: true,  renewYears: null },
  { id: "bank",        label: "Bank Account Details",             sector: "all",           mandatory: true,  renewYears: null },
  { id: "quals",       label: "Qualifications / Certificates",    sector: "all",           mandatory: true,  renewYears: null },
  { id: "ref",         label: "Reference Checks (x2)",            sector: "all",           mandatory: true,  renewYears: null },
  { id: "uniform",     label: "Uniform Size Recorded",            sector: "all",           mandatory: false, renewYears: null },
];

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
  const lastNames  = ["Chen","O'Brien","Diallo","Tran","Sharma","Nguyen","Park","Osei","Williams","Garcia","Smith","Johnson","Brown","Davis","Wilson","Martinez","Anderson","Taylor","Thomas","Jackson"];
  const roles      = ["Support Worker","Registered Nurse","Personal Carer","Team Leader","Allied Health","Admin Officer","Care Coordinator","Kitchen Hand","Enrolled Nurse","Early Childhood Educator"];
  const sectors    = ["agedCare","agedCare","agedCare","earlyLearning","ndis","agedCare"];

  return Array.from({ length: 22 }, (_, i) => {
    const sector   = sectors[i % sectors.length];
    const facility = FACILITIES.filter(f =>
      sector === "earlyLearning" ? f.sector === "earlyLearning" :
      sector === "ndis"          ? f.ndisRequired :
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

    const vals   = Object.values(checks);
    const total  = vals.filter(v => v !== "not_required").length;
    const done   = vals.filter(v => v === "verified").length;
    const pct    = total ? Math.round((done / total) * 100) : 100;
    const status = vals.includes("missing") ? "risk" : vals.includes("expired") ? "attention" : vals.includes("pending") ? "inprogress" : "compliant";

    return {
      id: `w${i + 1}`,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      role: roles[i % roles.length],
      sector, facility: facility.name, facilityId: facility.id,
      startDate: `2024-0${(i % 9) + 1}-${String((i * 3 % 28) + 1).padStart(2, "0")}`,
      pct, status, checks,
    };
  });
}

const WORKERS = makeWorkers();

// ─── ACTIVE STAFF DATA ────────────────────────────────────────────────────────
function daysFromNow(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const ACTIVE_STAFF = [
  {
    id: "s1", name: "Sarah Chen", role: "Support Worker", sector: "agedCare",
    facility: "Uniting Aged Care — Parramatta", startDate: "2022-03-14",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(312),  renewYears: 3,  status: "current" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(841),  renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(28),   renewYears: 3,  status: "expiring" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(28),   renewYears: 1,  status: "expiring" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(204),  renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s2", name: "James O'Brien", role: "Registered Nurse", sector: "agedCare",
    facility: "Uniting Aged Care — Liverpool", startDate: "2021-07-01",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(14),   renewYears: 3,  status: "expiring" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(620),  renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(190),  renewYears: 3,  status: "current" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(-5),   renewYears: 1,  status: "expired" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(88),   renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s3", name: "Amara Diallo", role: "Personal Carer", sector: "ndis",
    facility: "Uniting Aged Care — Blacktown", startDate: "2023-01-09",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(540),  renewYears: 3,  status: "current" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(42),   renewYears: 5,  status: "expiring" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(380),  renewYears: 3,  status: "current" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(42),   renewYears: 1,  status: "expiring" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(130),  renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s4", name: "Michael Tran", role: "Team Leader", sector: "agedCare",
    facility: "HACC Senior Gym — Sydney", startDate: "2020-11-23",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(-12),  renewYears: 3,  status: "expired" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(700),  renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(55),   renewYears: 3,  status: "expiring" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(-30),  renewYears: 1,  status: "expired" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(160),  renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s5", name: "Priya Sharma", role: "Care Coordinator", sector: "agedCare",
    facility: "Uniting Aged Care — Parramatta", startDate: "2022-08-15",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(480),  renewYears: 3,  status: "current" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(910),  renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(290),  renewYears: 3,  status: "current" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(60),   renewYears: 1,  status: "expiring" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(310),  renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s6", name: "Lindiwe Dube", role: "Early Childhood Educator", sector: "earlyLearning",
    facility: "All About Children — Bella Vista", startDate: "2023-04-03",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(730),  renewYears: 3,  status: "current" },
      { id: "wwcc",     label: "Working With Children",    expiryDate: daysFromNow(1100), renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(420),  renewYears: 3,  status: "current" },
      { id: "anaphylaxis", label: "Anaphylaxis Management", expiryDate: daysFromNow(55), renewYears: 3,  status: "expiring" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(250),  renewYears: 1,  status: "current" },
    ],
  },
  {
    id: "s7", name: "Kevin Park", role: "Support Worker", sector: "ndis",
    facility: "NSW CSE — Singleton", startDate: "2023-09-18",
    checks: [
      { id: "police",   label: "National Police Check",    expiryDate: daysFromNow(600),  renewYears: 3,  status: "current" },
      { id: "ndis",     label: "NDIS Worker Screening",    expiryDate: daysFromNow(1200), renewYears: 5,  status: "current" },
      { id: "firstaid", label: "First Aid Certificate",    expiryDate: daysFromNow(500),  renewYears: 3,  status: "current" },
      { id: "cpr",      label: "CPR Certificate",          expiryDate: daysFromNow(180),  renewYears: 1,  status: "current" },
      { id: "flu",      label: "Influenza Vaccination",    expiryDate: daysFromNow(340),  renewYears: 1,  status: "current" },
    ],
  },
];

function staffOverallStatus(staff) {
  const statuses = staff.checks.map(c => c.status);
  if (statuses.includes("expired")) return "expired";
  if (statuses.includes("expiring")) return "expiring";
  return "current";
}

const staffStatusMeta = {
  current:      { label: "All Current",    color: C.green,   bg: C.greenBg,  border: C.greenBorder },
  expiring:     { label: "Expiring Soon",  color: C.amber,   bg: C.amberBg,  border: C.amberBorder },
  expired:      { label: "Action Needed",  color: C.red,     bg: C.redBg,    border: C.redBorder   },
  onLeave:      { label: "On Leave",       color: "#7c3aed", bg: "#f5f3ff",  border: "#c4b5fd"     },
  returningSoon:{ label: "⚠️ Renewal Due", color: "#7c3aed", bg: "#faf5ff",  border: "#c4b5fd"     },
};

const statusMeta = {
  verified:     { label: "Verified",    color: C.green, bg: C.greenBg, border: C.greenBorder, dot: "✓" },
  pending:      { label: "Pending",     color: C.amber, bg: C.amberBg, border: C.amberBorder, dot: "◷" },
  expired:      { label: "Expired",     color: C.red,   bg: C.redBg,   border: C.redBorder,   dot: "!" },
  missing:      { label: "Missing",     color: C.red,   bg: C.redBg,   border: C.redBorder,   dot: "✕" },
  not_required: { label: "N/A",         color: C.grey,  bg: C.greyBg,  border: C.greyBorder,  dot: "–" },
};

const workerStatusMeta = {
  compliant:  { label: "Compliant",   color: C.green, bg: C.greenBg },
  inprogress: { label: "In Progress", color: C.blue,  bg: C.blueBg  },
  attention:  { label: "Attention",   color: C.amber, bg: C.amberBg },
  risk:       { label: "Risk",        color: C.red,   bg: C.redBg   },
};

const SECTOR_LABELS = { agedCare: "Aged Care", earlyLearning: "Early Learning", ndis: "NDIS" };

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Pill({ status }) {
  const m = statusMeta[status] || statusMeta.not_required;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700,
      color: m.color, background: m.bg, border: `1px solid ${m.border}`,
      borderRadius: 20, padding: "2px 9px", whiteSpace: "nowrap",
    }}>
      {m.dot} {m.label}
    </span>
  );
}

function ProgressBar({ pct, status }) {
  const col = status === "compliant" ? C.green : status === "inprogress" ? C.blue : status === "attention" ? C.amber : C.red;
  return (
    <div style={{ width: "100%", height: 6, background: "#dde8e4", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 4, transition: "width 0.4s" }} />
    </div>
  );
}

function StatCard({ num, label, color, bg, border, onClick, active }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? color : bg,
        border: `2px solid ${active ? color : (border || color + "30")}`,
        borderRadius: 14, padding: "18px 20px",
        display: "flex", flexDirection: "column", gap: 6, minWidth: 0,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.15s",
        boxShadow: active ? `0 4px 16px ${color}40` : "none",
      }}
      onMouseEnter={e => { if (onClick && !active) e.currentTarget.style.boxShadow = `0 2px 10px ${color}30`; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: 34, fontWeight: 900, color: active ? "#fff" : color, lineHeight: 1, letterSpacing: "-1.5px" }}>{num}</div>
      <div style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.85)" : C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
        {label}{active ? " ✕" : ""}
      </div>
    </div>
  );
}

// ─── TREND CHART ──────────────────────────────────────────────────────────────
const TREND_DATA = [
  { month: "Apr", pct: 61 }, { month: "May", pct: 67 }, { month: "Jun", pct: 70 },
  { month: "Jul", pct: 74 }, { month: "Aug", pct: 78 }, { month: "Sep", pct: 72 },
  { month: "Oct", pct: 81 }, { month: "Nov", pct: 85 }, { month: "Dec", pct: 83 },
  { month: "Jan", pct: 87 }, { month: "Feb", pct: 91 }, { month: "Mar", pct: 88 },
];

function TrendChart() {
  const W = 520, H = 160, pad = { top: 12, right: 12, bottom: 32, left: 34 };
  const cW = W - pad.left - pad.right;
  const cH = H - pad.top - pad.bottom;
  const xStep = cW / (TREND_DATA.length - 1);
  const yScale = v => cH - ((v - 55) / 45) * cH;
  const pts = TREND_DATA.map((d, i) => [pad.left + i * xStep, pad.top + yScale(d.pct)]);
  const pathD = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const areaD = pathD + ` L${pts[pts.length-1][0]},${pad.top+cH} L${pts[0][0]},${pad.top+cH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a7a4a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a7a4a" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {[65, 75, 85, 95].map(v => {
        const y = pad.top + yScale(v);
        return (
          <g key={v}>
            <line x1={pad.left} y1={y} x2={W - pad.right} y2={y} stroke="#e3ede8" strokeWidth={1} strokeDasharray="4 3" />
            <text x={pad.left - 6} y={y + 4} fontSize={9} fill="#7a9e8e" textAnchor="end">{v}%</text>
          </g>
        );
      })}
      <path d={areaD} fill="url(#trendGrad)" />
      <path d={pathD} fill="none" stroke="#1a7a4a" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 5 : 3.5} fill="#1a7a4a" />
          {i === pts.length - 1 && (
            <text x={p[0]} y={p[1] - 10} fontSize={10} fill="#1a7a4a" textAnchor="middle" fontWeight="700">
              {TREND_DATA[i].pct}%
            </text>
          )}
          <text x={p[0]} y={pad.top + cH + 16} fontSize={9} fill="#7a9e8e" textAnchor="middle">
            {TREND_DATA[i].month}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
function StatusDonut({ stats }) {
  const total = stats.total || 1;
  const segments = [
    { key: "compliant",  label: "Compliant",   color: "#1a7a4a", val: stats.compliant },
    { key: "inprogress", label: "In Progress",  color: "#2563eb", val: stats.inprogress },
    { key: "attention",  label: "Attention",    color: "#d97706", val: stats.attention },
    { key: "risk",       label: "At Risk",      color: "#dc2626", val: stats.risk },
  ];
  const cx = 68, cy = 68, r = 52, hole = 34;
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
    <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <svg viewBox="0 0 136 136" style={{ width: 136, minWidth: 136 }}>
        {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} />)}
        <text x={cx} y={cy - 5} textAnchor="middle" fontSize={24} fontWeight={900} fill="#1a2e24">{compPct}%</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize={9} fill="#7a9e8e" fontWeight={600} letterSpacing="0.5">COMPLIANT</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 120 }}>
        {segments.map(s => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: C.textMid, flex: 1 }}>{s.label}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADD WORKER MODAL ─────────────────────────────────────────────────────────
const WORKER_ROLES = ["Support Worker","Registered Nurse","Personal Carer","Team Leader","Allied Health","Admin Officer","Care Coordinator","Kitchen Hand","Enrolled Nurse","Early Childhood Educator"];

function AddWorkerModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", role: "", sector: "agedCare", facility: "", email: "", phone: "", start: "" });
  const [saved, setSaved] = useState(false);
  function set(k, v) { setForm(p => ({ ...p, [k]: v })); }
  function submit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { onAdd(form); onClose(); }, 1200);
  }
  const inp = { width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: C.text, outline: "none", boxSizing: "border-box", background: "#fff" };
  const lbl = { fontSize: 12, fontWeight: 700, color: C.textMid, display: "block", marginBottom: 5 };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 500, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", boxShadow: "0 -8px 40px rgba(0,0,0,0.18)" }}>
        <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.text }}>Add New Candidate</div>
          <button onClick={onClose} style={{ background: C.greyBg, border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 20, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        {saved ? (
          <div style={{ padding: "48px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>✅</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.green }}>Candidate added!</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6 }}>Compliance checklist created automatically.</div>
          </div>
        ) : (
          <form onSubmit={submit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div><label style={lbl}>Full Name *</label><input style={inp} required value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Jane Smith" /></div>
              <div><label style={lbl}>Email</label><input style={inp} type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@example.com" /></div>
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
              <div><label style={lbl}>Phone</label><input style={inp} value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="04xx xxx xxx" /></div>
              <div><label style={lbl}>Start Date</label><input style={inp} type="date" value={form.start} onChange={e => set("start", e.target.value)} /></div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button type="button" onClick={onClose} style={{ padding: "10px 20px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: C.textMid }}>Cancel</button>
              <button type="submit" style={{ padding: "10px 28px", borderRadius: 8, border: "none", background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Add Candidate</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ stats, workers }) {
  const needsAttention = workers.filter(w => w.status === "attention" || w.status === "risk").slice(0, 5);
  const checkBreakdown = [
    { label: "Police Check",        verified: 18, pending: 2, expired: 1, missing: 1 },
    { label: "NDIS Screening",      verified: 10, pending: 3, expired: 1, missing: 0 },
    { label: "WWCC",                verified: 7,  pending: 1, expired: 1, missing: 1 },
    { label: "First Aid",           verified: 17, pending: 3, expired: 2, missing: 0 },
    { label: "Infection Control",   verified: 15, pending: 2, expired: 1, missing: 1 },
  ];

  // Live active staff stats derived from ACTIVE_STAFF
  const staffTotal    = ACTIVE_STAFF.length;
  const staffAllChecks = ACTIVE_STAFF.filter(s => staffOverallStatus(s) === "current").length;
  const staffExpired  = ACTIVE_STAFF.filter(s => staffOverallStatus(s) === "expired").length;
  const staffExpiring = ACTIVE_STAFF.filter(s => staffOverallStatus(s) === "expiring").length;
  const staffCompliantPct = Math.round((staffAllChecks / staffTotal) * 100);

  // Check-type breakdown across all active staff
  const checkTypes = [
    { id: "police",      label: "Police Check" },
    { id: "ndis",        label: "NDIS Screening" },
    { id: "firstaid",    label: "First Aid" },
    { id: "cpr",         label: "CPR" },
    { id: "flu",         label: "Flu Vaccination" },
    { id: "anaphylaxis", label: "Anaphylaxis Mgmt" },
    { id: "child",       label: "Child Protection" },
    { id: "wwcc",        label: "WWCC" },
  ];
  const staffCheckBreakdown = checkTypes.map(ct => {
    const relevant = ACTIVE_STAFF.filter(s => s.checks.some(c => c.id === ct.id));
    if (relevant.length === 0) return null;
    const current  = relevant.filter(s => s.checks.find(c => c.id === ct.id)?.status === "current").length;
    const expiring = relevant.filter(s => s.checks.find(c => c.id === ct.id)?.status === "expiring").length;
    const expired  = relevant.filter(s => s.checks.find(c => c.id === ct.id)?.status === "expired").length;
    return { ...ct, total: relevant.length, current, expiring, expired };
  }).filter(Boolean);

  // Staff expiring within 30 days
  const expiringWithin30 = ACTIVE_STAFF.filter(s =>
    s.checks.some(c => {
      const d = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
      return d >= 0 && d <= 30;
    })
  ).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        <div style={card}>
          <div style={cardTitle}>
            <span>Compliance Rate — Last 12 Months</span>
            <span style={{ fontSize: 11, color: C.textMuted, fontWeight: 600 }}>FY 2025–26</span>
          </div>
          <TrendChart />
        </div>
        <div style={card}>
          <div style={cardTitle}><span>Candidate Status Breakdown</span></div>
          <StatusDonut stats={stats} />
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.borderLight}` }}>
            <div style={{ fontSize: 11, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>By Sector</div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Aged Care",      count: workers.filter(w => w.sector === "agedCare").length,      color: C.green },
                { label: "NDIS",           count: workers.filter(w => w.sector === "ndis").length,           color: "#7c3aed" },
                { label: "Early Learning", count: workers.filter(w => w.sector === "earlyLearning").length,  color: C.blue },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.count}</span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
        {/* Needs Attention */}
        <div style={card}>
          <div style={cardTitle}><span>⚠️ Needs Attention</span></div>
          {needsAttention.length === 0 ? (
            <div style={{ fontSize: 13, color: C.textMuted, padding: "12px 0" }}>All candidates are compliant — great work!</div>
          ) : needsAttention.map(w => (
            <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}` }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: workerStatusMeta[w.status].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: workerStatusMeta[w.status].color }}>
                  {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{w.role}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: workerStatusMeta[w.status].color }}>{w.pct}%</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: workerStatusMeta[w.status].color }}>{workerStatusMeta[w.status].label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Check breakdown */}
        <div style={card}>
          <div style={cardTitle}><span>Checks by Type</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {checkBreakdown.map(cb => {
              const tot = cb.verified + cb.pending + cb.expired + cb.missing;
              const pct = Math.round((cb.verified / tot) * 100);
              return (
                <div key={cb.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{cb.label}</span>
                    <span style={{ fontSize: 11, color: C.textMuted }}>{cb.verified}/{tot} verified</span>
                  </div>
                  <div style={{ height: 7, background: "#e8ede9", borderRadius: 4, overflow: "hidden", display: "flex" }}>
                    <div style={{ width: `${pct}%`, background: C.green, height: "100%" }} />
                    <div style={{ width: `${Math.round((cb.pending/tot)*100)}%`, background: C.amber, height: "100%" }} />
                    <div style={{ width: `${Math.round(((cb.expired+cb.missing)/tot)*100)}%`, background: C.red, height: "100%" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 16 }}>
            {[["#1a7a4a","Verified"],["#d97706","Pending"],["#dc2626","Issues"]].map(([col, lbl]) => (
              <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.textMuted }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: col }} />{lbl}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACTIVE STAFF COMPLIANCE REPORT ────────────────────────────── */}
      <div style={{ paddingTop: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <span>Active Staff — Compliance Summary</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, padding: "2px 10px", background: C.greyBg, borderRadius: 20 }}>Veriyo Monitor</span>
        </div>

        {/* 4 key numbers */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 20 }}>
          {[
            { num: staffTotal,           label: "Total Active Staff",     color: C.primary,  bg: C.primaryXLight },
            { num: `${staffCompliantPct}%`, label: "Fully Compliant",    color: C.green,    bg: C.greenBg },
            { num: expiringWithin30,     label: "Expiring ≤ 30 days",    color: C.amber,    bg: C.amberBg },
            { num: staffExpired,         label: "Overdue — Action Now",  color: C.red,      bg: C.redBg },
          ].map(item => (
            <div key={item.label} style={{ background: item.bg, borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontSize: 11, color: item.color, fontWeight: 700, marginTop: 4, opacity: 0.8 }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Check-type breakdown table */}
        <div style={card}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 14 }}>Compliance by Check Type — Active Staff</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  {["Check Type", "Staff Holding", "Current", "Expiring ≤ 60d", "Overdue", "Rate"].map(h => (
                    <th key={h} style={{ padding: "7px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.4px", borderBottom: `1.5px solid ${C.border}`, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffCheckBreakdown.map((cb, i) => {
                  const pct = Math.round((cb.current / cb.total) * 100);
                  return (
                    <tr key={cb.id} style={{ background: i % 2 === 0 ? "white" : "#f9fbfa" }}>
                      <td style={{ padding: "9px 12px", fontWeight: 600, color: C.text, borderBottom: `1px solid ${C.borderLight}` }}>{cb.label}</td>
                      <td style={{ padding: "9px 12px", color: C.textMid, borderBottom: `1px solid ${C.borderLight}` }}>{cb.total}</td>
                      <td style={{ padding: "9px 12px", borderBottom: `1px solid ${C.borderLight}` }}>
                        <span style={{ color: C.green, fontWeight: 700 }}>{cb.current}</span>
                      </td>
                      <td style={{ padding: "9px 12px", borderBottom: `1px solid ${C.borderLight}` }}>
                        {cb.expiring > 0
                          ? <span style={{ color: C.amber, fontWeight: 700 }}>{cb.expiring}</span>
                          : <span style={{ color: C.textMuted }}>—</span>}
                      </td>
                      <td style={{ padding: "9px 12px", borderBottom: `1px solid ${C.borderLight}` }}>
                        {cb.expired > 0
                          ? <span style={{ color: C.red, fontWeight: 700 }}>{cb.expired}</span>
                          : <span style={{ color: C.textMuted }}>—</span>}
                      </td>
                      <td style={{ padding: "9px 12px", borderBottom: `1px solid ${C.borderLight}` }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 6, background: "#e8ede9", borderRadius: 4, overflow: "hidden", minWidth: 60 }}>
                            <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? C.green : pct >= 80 ? C.amber : C.red, borderRadius: 4 }} />
                          </div>
                          <span style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? C.green : pct >= 80 ? C.amber : C.red, flexShrink: 0 }}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: C.textMuted }}>
            Updated in real time from Active Staff tab · Includes all sectors
          </div>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "20px 22px",
};
const cardTitle = {
  fontSize: 13, fontWeight: 800, color: C.text, marginBottom: 16,
  display: "flex", alignItems: "center", justifyContent: "space-between",
};

// ─── WORKER CARD (mobile-friendly alternative to table rows) ──────────────────
function WorkerCard({ w, onClick, onOpenPortal }) {
  const sm = workerStatusMeta[w.status];
  const [copied, setCopied] = useState(false);

  function handleSendPortal(e) {
    e.stopPropagation();
    if (onOpenPortal) {
      onOpenPortal(w);
    }
  }

  function handleCopyLink(e) {
    e.stopPropagation();
    const link = `${window.location.origin}/?candidate=${w.id}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      onClick={onClick}
      style={{
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 14,
        padding: "14px 16px", cursor: "pointer", transition: "box-shadow 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%", background: sm.bg, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: sm.color }}>
            {w.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{w.name}</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>{w.role}</div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
          color: sm.color, background: sm.bg, flexShrink: 0,
        }}>{sm.label}</span>
      </div>
      <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {SECTOR_LABELS[w.sector]} · {w.facility}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1 }}><ProgressBar pct={w.pct} status={w.status} /></div>
        <span style={{ fontSize: 12, fontWeight: 800, color: sm.color, flexShrink: 0 }}>{w.pct}%</span>
      </div>
      {/* Portal actions */}
      <div style={{ display: "flex", gap: 6 }} onClick={e => e.stopPropagation()}>
        <button
          onClick={handleSendPortal}
          style={{ flex: 1, fontSize: 11, fontWeight: 700, padding: "6px 0", borderRadius: 7, border: `1.5px solid ${C.primaryBorder}`, background: C.primaryXLight, color: C.primary, cursor: "pointer" }}
        >📋 Preview portal</button>
        <button
          onClick={handleCopyLink}
          style={{ flex: 1, fontSize: 11, fontWeight: 700, padding: "6px 0", borderRadius: 7, border: `1.5px solid ${C.border}`, background: copied ? C.greenBg : "white", color: copied ? C.green : C.textMid, cursor: "pointer", transition: "all 0.2s" }}
        >{copied ? "✓ Link copied!" : "🔗 Copy link"}</button>
      </div>
    </div>
  );
}

// ─── WORKER DETAIL PANEL ─────────────────────────────────────────────────────
// Generate a realistic-looking portal activity trail for a candidate
function generatePortalActivity(worker) {
  const now = new Date();
  const hoursAgo = h => new Date(now - h * 3600000);
  const fmtTime = d => d.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
  const fmtDate = d => {
    const today = new Date(); today.setHours(0,0,0,0);
    const dd = new Date(d); dd.setHours(0,0,0,0);
    const diff = Math.round((today - dd) / 86400000);
    if (diff === 0) return `Today ${fmtTime(d)}`;
    if (diff === 1) return `Yesterday ${fmtTime(d)}`;
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short" }) + ` ${fmtTime(d)}`;
  };

  // Different scenarios based on worker status
  if (worker.status === "compliant") {
    return {
      lastSeen: fmtDate(hoursAgo(3)),
      completionPct: 100,
      stuckOn: null,
      nudgeSent: false,
      events: [
        { time: fmtDate(hoursAgo(3)),   type: "submitted",  icon: "🎉", color: "#1a7a4a", label: "Submitted all documents",         detail: "All 8 checks uploaded and AI-verified" },
        { time: fmtDate(hoursAgo(3.1)), type: "approved",   icon: "✓",  color: "#1a7a4a", label: "Qualifications verified",          detail: "Certificate III in Individual Support · Confidence 92%" },
        { time: fmtDate(hoursAgo(3.2)), type: "approved",   icon: "✓",  color: "#1a7a4a", label: "Right to Work verified",           detail: "Australian Passport detected · Expiry 2029" },
        { time: fmtDate(hoursAgo(3.5)), type: "approved",   icon: "✓",  color: "#1a7a4a", label: "COVID-19 vaccination confirmed",   detail: "3 doses recorded · Meets NSW Health requirements" },
        { time: fmtDate(hoursAgo(3.7)), type: "approved",   icon: "✓",  color: "#1a7a4a", label: "First Aid Certificate verified",   detail: "HLTAID011 · Expires August 2026" },
        { time: fmtDate(hoursAgo(4)),   type: "opened",     icon: "👁",  color: "#2563eb", label: "Opened portal",                   detail: "Accessed from mobile device · Sydney, NSW" },
        { time: fmtDate(hoursAgo(28)),  type: "link_sent",  icon: "📨",  color: "#7c3aed", label: "Portal link sent",                detail: `Sent by ${worker.facility}` },
      ],
    };
  }

  if (worker.status === "pending") {
    return {
      lastSeen: fmtDate(hoursAgo(18)),
      completionPct: 38,
      stuckOn: "NDIS Worker Screening",
      nudgeSent: true,
      events: [
        { time: fmtDate(hoursAgo(18)),  type: "stalled",    icon: "⏸",  color: "#d97706", label: "Session ended — incomplete",       detail: "Left portal at NDIS Worker Screening step" },
        { time: fmtDate(hoursAgo(18.2)),type: "failed",     icon: "⚠️",  color: "#d97706", label: "Upload flagged — NDIS Screening",  detail: "Document appears expired · Candidate notified" },
        { time: fmtDate(hoursAgo(18.5)),type: "upload",     icon: "📄",  color: "#2563eb", label: "Uploaded NDIS Screening",          detail: "File: NDIS_check.pdf · 312 KB" },
        { time: fmtDate(hoursAgo(18.8)),type: "approved",   icon: "✓",  color: "#1a7a4a", label: "National Police Check verified",   detail: "No disclosable outcomes · Expires March 2027 · Confidence 98%" },
        { time: fmtDate(hoursAgo(19)),  type: "upload",     icon: "📄",  color: "#2563eb", label: "Uploaded National Police Check",   detail: "File: police_check_2024.pdf · 1.2 MB" },
        { time: fmtDate(hoursAgo(19.5)),type: "opened",     icon: "👁",  color: "#2563eb", label: "Opened portal",                   detail: "Accessed from iPhone · Sydney, NSW" },
        { time: fmtDate(hoursAgo(20)),  type: "nudge",      icon: "📲",  color: "#7c3aed", label: "Nudge sent by you",               detail: "\"Hi, just checking in — let me know if you need help with the portal\"" },
        { time: fmtDate(hoursAgo(46)),  type: "link_sent",  icon: "📨",  color: "#7c3aed", label: "Portal link sent",                detail: `Sent by ${worker.facility}` },
      ],
    };
  }

  // expired / missing — never opened
  return {
    lastSeen: null,
    completionPct: 0,
    stuckOn: null,
    nudgeSent: false,
    events: [
      { time: fmtDate(hoursAgo(72)),  type: "link_sent",  icon: "📨",  color: "#7c3aed", label: "Portal link sent",   detail: `Sent by ${worker.facility}` },
      { time: fmtDate(hoursAgo(71.9)),type: "email_open", icon: "📬",  color: "#2563eb", label: "Invite email opened", detail: "Opened on mobile device" },
    ],
  };
}

function WorkerPanel({ worker, onClose, aiResults, aiLoading, uploadedDocs, onUpload, alreadyGraduated, onGraduate, onOpenPortal }) {
  const isCompliant = worker.status === "compliant";
  const [portalCopied, setPortalCopied] = useState(false);
  const [nudgeSent,    setNudgeSent]    = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const portalActivity = generatePortalActivity(worker);

  function handleCopyPortalLink(e) {
    e.stopPropagation();
    const link = `${window.location.origin}/?candidate=${worker.id}`;
    navigator.clipboard.writeText(link).catch(() => {});
    setPortalCopied(true);
    setTimeout(() => setPortalCopied(false), 2000);
  }
  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 190 }}
      />
      {/* panel — slides from right on desktop, bottom sheet on mobile */}
      <div style={{
        position: "fixed", zIndex: 200,
        top: 0, right: 0, bottom: 0, width: "min(480px, 100vw)",
        background: C.white, borderLeft: `1.5px solid ${C.border}`,
        overflowY: "auto", boxShadow: "-6px 0 32px rgba(0,0,0,0.1)",
      }}>
        <div style={{
          padding: "18px 20px", borderBottom: `1px solid ${C.border}`,
          position: "sticky", top: 0, background: C.white, zIndex: 1,
        }}>
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 16, right: 16,
              background: C.greyBg, border: "none", borderRadius: 8,
              width: 34, height: 34, cursor: "pointer", fontSize: 20, color: C.textMid,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.text, paddingRight: 40 }}>{worker.name}</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{worker.role} · {worker.facility}</div>
          <div style={{ marginTop: 12 }}>
            <ProgressBar pct={worker.pct} status={worker.status} />
            <div style={{ fontSize: 12, color: workerStatusMeta[worker.status]?.color, fontWeight: 700, marginTop: 5 }}>
              {worker.pct}% complete · {workerStatusMeta[worker.status]?.label}
            </div>
          </div>

          {/* Portal link row */}
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button
              onClick={() => onOpenPortal && onOpenPortal(worker)}
              style={{ flex: 1, fontSize: 11, fontWeight: 700, padding: "7px 0", borderRadius: 8, border: `1.5px solid ${C.primaryBorder}`, background: C.primaryXLight, color: C.primary, cursor: "pointer" }}
            >📋 Preview candidate portal</button>
            <button
              onClick={handleCopyPortalLink}
              style={{ flex: 1, fontSize: 11, fontWeight: 700, padding: "7px 0", borderRadius: 8, border: `1.5px solid ${C.border}`, background: portalCopied ? C.greenBg : "white", color: portalCopied ? C.green : C.textMid, cursor: "pointer", transition: "all 0.2s" }}
            >{portalCopied ? "✓ Link copied!" : "🔗 Copy portal link"}</button>
          </div>

          {/* Graduate to Active Staff banner */}
          {isCompliant && !alreadyGraduated && (
            <div style={{ marginTop: 14, padding: "12px 14px", background: C.greenBg, border: `1.5px solid ${C.greenBorder}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.green }}>🎉 Onboarding complete!</div>
                <div style={{ fontSize: 11, color: C.textMid, marginTop: 1 }}>All checks passed — ready to join Active Staff.</div>
              </div>
              <button
                onClick={() => onGraduate(worker)}
                style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 8, border: "none", background: C.green, color: "white", fontSize: 12, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}
              >Move to Active Staff →</button>
            </div>
          )}
          {alreadyGraduated && (
            <div style={{ marginTop: 14, padding: "10px 14px", background: "#f0f9ff", border: "1.5px solid #bae6fd", borderRadius: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0369a1" }}>✓ Graduated to Active Staff</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>This worker's compliance is now monitored in the Active Staff tab.</div>
            </div>
          )}
        </div>

        <div style={{ padding: "14px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
            Compliance Checklist
          </div>
          {ALL_CHECKS.map(check => {
            const st  = worker.checks[check.id];
            const key = `${worker.id}_${check.id}`;
            const aiR = aiResults[key];
            const aiL = aiLoading[key];
            return (
              <div key={check.id} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "11px 0", borderBottom: `1px solid ${C.borderLight}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{check.label}</div>
                  {aiL && (
                    <div style={{ marginTop: 5, padding: "6px 10px", borderRadius: 7, fontSize: 11, background: C.amberBg, border: `1px solid ${C.amberBorder}`, color: C.amber }}>
                      🔍 Reading document…
                    </div>
                  )}
                  {aiR && !aiL && (
                    <div style={{ marginTop: 5, padding: "6px 10px", borderRadius: 7, fontSize: 11, background: C.greenBg, border: `1px solid ${C.greenBorder}`, color: C.green }}>
                      ✅ AI Verified · Expires {aiR.expiry} · {aiR.confidence}% confidence
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
                  <Pill status={st} />
                  {st !== "not_required" && (
                    <button
                      onClick={() => onUpload(worker.id, check.id)}
                      style={{
                        background: C.blueBg, border: `1px solid ${C.blueBorder}`, borderRadius: 6,
                        padding: "3px 10px", fontSize: 11, fontWeight: 600, color: C.blue,
                        cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {uploadedDocs[key] ? "🤖 Re-run" : "Upload"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── PORTAL ACTIVITY ── */}
        <div style={{ padding: "0 20px 24px" }}>
          <button
            onClick={() => setShowActivity(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "14px 0 10px", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", width: "100%" }}
          >
            <span style={{ fontSize: 13 }}>{showActivity ? "▾" : "▸"}</span>
            Portal Activity
            {portalActivity.lastSeen
              ? <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, color: C.textMuted, padding: "2px 8px", background: C.greyBg, border: `1px solid ${C.greyBorder}`, borderRadius: 20 }}>Last seen {portalActivity.lastSeen}</span>
              : <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 600, color: C.amber, padding: "2px 8px", background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 20 }}>Not yet opened</span>
            }
          </button>

          {showActivity && (
            <>
              {/* Progress + stuck banner */}
              <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1, background: C.greyBg, border: `1px solid ${C.greyBorder}`, borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Portal progress</div>
                  <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
                    <div style={{ width: `${portalActivity.completionPct}%`, height: "100%", background: portalActivity.completionPct === 100 ? C.green : portalActivity.completionPct > 0 ? C.amber : C.greyBorder, borderRadius: 3, transition: "width 0.4s" }} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: portalActivity.completionPct === 100 ? C.green : C.textMid }}>{portalActivity.completionPct}% complete</div>
                </div>
                {portalActivity.stuckOn && (
                  <div style={{ flex: 1, background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.amber, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>⚠️ Stuck on</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e" }}>{portalActivity.stuckOn}</div>
                    <div style={{ fontSize: 11, color: "#92400e", marginTop: 2 }}>Document flagged by AI</div>
                  </div>
                )}
              </div>

              {/* Nudge button */}
              {worker.status !== "compliant" && (
                <button
                  onClick={() => setNudgeSent(true)}
                  disabled={nudgeSent || portalActivity.nudgeSent}
                  style={{
                    width: "100%", padding: "9px 0", borderRadius: 9, fontSize: 12, fontWeight: 700, marginBottom: 14,
                    border: `1.5px solid ${nudgeSent || portalActivity.nudgeSent ? C.greenBorder : "#c4b5fd"}`,
                    background: nudgeSent || portalActivity.nudgeSent ? C.greenBg : "#f5f3ff",
                    color: nudgeSent || portalActivity.nudgeSent ? C.green : "#7c3aed",
                    cursor: nudgeSent || portalActivity.nudgeSent ? "default" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {nudgeSent ? "✓ Nudge sent!" : portalActivity.nudgeSent ? "✓ Nudge already sent" : `📲 Send nudge to ${worker.name.split(" ")[0]}`}
                </button>
              )}

              {/* Timeline */}
              <div style={{ position: "relative" }}>
                {/* vertical line */}
                <div style={{ position: "absolute", left: 14, top: 8, bottom: 8, width: 2, background: C.border, borderRadius: 1 }} />
                {portalActivity.events.map((ev, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, position: "relative" }}>
                    {/* dot */}
                    <div style={{ width: 30, height: 30, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: "white", border: `2px solid ${ev.color}`, zIndex: 1 }}>
                      {ev.icon}
                    </div>
                    <div style={{ flex: 1, paddingTop: 4 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{ev.label}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{ev.detail}</div>
                      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 2, opacity: 0.7 }}>{ev.time}</div>
                    </div>
                  </div>
                ))}

                {portalActivity.events.length === 0 && (
                  <div style={{ padding: "16px 0", textAlign: "center", fontSize: 12, color: C.textMuted }}>
                    No portal activity yet — link not yet sent.
                  </div>
                )}
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
}

// ─── ACTIVE STAFF TAB ─────────────────────────────────────────────────────────
function ActiveStaffTab({ graduatedStaff = [], alumniStaff = [], onResign, onRehire }) {
  const [selectedStaff,    setSelectedStaff]    = useState(null);
  const [filterStaffStatus, setFilterStaffStatus] = useState("all");
  const [showAlumni,       setShowAlumni]       = useState(false);
  const [resignModal,      setResignModal]      = useState(null); // staffId
  const [leaveRecords,     setLeaveRecords]     = useState({});   // { staffId: { returnDate, leaveType } }
  const [leaveModal,       setLeaveModal]       = useState(null); // staffId being edited
  const [leaveForm,        setLeaveForm]        = useState({ returnDate: "", leaveType: "Parental leave" });

  function isOnLeave(staffId) {
    const rec = leaveRecords[staffId];
    if (!rec) return false;
    return new Date(rec.returnDate) > new Date();
  }

  function daysUntilReturn(staffId) {
    const rec = leaveRecords[staffId];
    if (!rec) return null;
    return Math.round((new Date(rec.returnDate) - new Date()) / 86400000);
  }

  // When on leave, suppress expiry alerts unless something expires during leave AND return is within 60 days
  function effectiveStatus(s) {
    if (isOnLeave(s.id)) {
      const rec = leaveRecords[s.id];
      const daysLeft = daysUntilReturn(s.id);
      // Check if anything expires during leave period and return is soon (within 60 days)
      const expiresInLeave = s.checks.some(c => {
        const expDays = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
        return expDays > 0 && expDays < (daysLeft || 0);
      });
      if (expiresInLeave && daysLeft <= 60) return "returningSoon";
      return "onLeave";
    }
    return staffOverallStatus(s);
  }

  const [filterStaffSector,  setFilterStaffSector]  = useState("all");
  const [filterExpiryWindow, setFilterExpiryWindow] = useState("all"); // "all" | "30" | "60" | "expired"
  const [staffSearch,        setStaffSearch]        = useState("");

  // Convert graduated candidates into Active Staff format (give them all-current checks)
  const graduatedAsStaff = graduatedStaff.map(w => ({
    id: w.id, name: w.name, role: w.role, sector: w.sector,
    facility: w.facility, startDate: w.graduatedDate || w.startDate,
    checks: [
      { id: "police",   label: "National Police Check", expiryDate: daysFromNow(365 * 3 - 30), renewYears: 3, status: "current" },
      { id: "firstaid", label: "First Aid Certificate",  expiryDate: daysFromNow(365 * 3 - 60), renewYears: 3, status: "current" },
      { id: "cpr",      label: "CPR Certificate",        expiryDate: daysFromNow(270),          renewYears: 1, status: "current" },
    ],
    isGraduated: true,
  }));

  const allActiveStaff = [...ACTIVE_STAFF, ...graduatedAsStaff.filter(g => !alumniStaff.some(a => a.id === g.id))];
  const staffWithStatus = allActiveStaff.map(s => ({ ...s, overallStatus: effectiveStatus(s) }));

  const leaveTypes = ["Parental leave", "Maternity leave", "Paternity leave", "Long service leave", "Extended sick leave", "Carer's leave", "Other leave"];

  const onLeaveCount    = staffWithStatus.filter(s => s.overallStatus === "onLeave" || s.overallStatus === "returningSoon").length;
  const expiredCount    = staffWithStatus.filter(s => s.overallStatus === "expired").length;
  const expiringCount   = staffWithStatus.filter(s => s.overallStatus === "expiring").length;
  const currentCount    = staffWithStatus.filter(s => s.overallStatus === "current").length;

  // Apply all filters
  const filtered = staffWithStatus.filter(s => {
    // Status filter (from stat cards)
    if (filterStaffStatus === "onLeave") {
      if (s.overallStatus !== "onLeave" && s.overallStatus !== "returningSoon") return false;
    } else if (filterStaffStatus !== "all" && s.overallStatus !== filterStaffStatus) {
      return false;
    }
    // Sector filter
    if (filterStaffSector !== "all" && s.sector !== filterStaffSector) return false;
    // Search
    if (staffSearch && !s.name.toLowerCase().includes(staffSearch.toLowerCase()) && !s.role.toLowerCase().includes(staffSearch.toLowerCase())) return false;
    // Expiry window filter
    if (filterExpiryWindow !== "all") {
      if (filterExpiryWindow === "expired") {
        if (!s.checks.some(c => c.status === "expired")) return false;
      } else {
        const days = parseInt(filterExpiryWindow);
        if (!s.checks.some(c => {
          const d = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
          return d >= 0 && d <= days;
        })) return false;
      }
    }
    return true;
  });

  // Flatten all upcoming expiries — skip staff fully on leave (alerts paused)
  const allExpiries = staffWithStatus
    .filter(s => s.overallStatus !== "onLeave")
    .flatMap(s =>
      s.checks
        .filter(c => c.status === "expiring" || c.status === "expired")
        .map(c => {
          const days = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
          return { staffName: s.name, staffId: s.id, check: c.label, days, status: c.status, expiryDate: c.expiryDate, returningSoon: s.overallStatus === "returningSoon" };
        })
    ).sort((a, b) => a.days - b.days);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* stat cards */}
      <div className="dash-stats">
        <StatCard num={staffWithStatus.length} label="Active Staff"       color={C.primary} bg={C.primaryXLight} onClick={() => setFilterStaffStatus("all")}         active={filterStaffStatus === "all"} />
        <StatCard num={currentCount}           label="All Checks Current" color={C.green}   bg={C.greenBg}       onClick={() => setFilterStaffStatus(s => s === "current"  ? "all" : "current")}  active={filterStaffStatus === "current"} />
        <StatCard num={expiringCount}          label="Expiring Soon"      color={C.amber}   bg={C.amberBg}       onClick={() => setFilterStaffStatus(s => s === "expiring" ? "all" : "expiring")} active={filterStaffStatus === "expiring"} />
        <StatCard num={expiredCount}           label="Action Needed"      color={C.red}     bg={C.redBg}         onClick={() => setFilterStaffStatus(s => s === "expired"  ? "all" : "expired")}  active={filterStaffStatus === "expired"} />
        {onLeaveCount > 0 && <StatCard num={onLeaveCount} label="On Leave" color="#7c3aed" bg="#f5f3ff" onClick={() => setFilterStaffStatus(s => s === "onLeave" ? "all" : "onLeave")} active={filterStaffStatus === "onLeave"} />}
      </div>

      {/* filter bar */}
      <div className="dash-filters">
        <input
          style={{ flex: "1 1 180px", padding: "9px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.text, background: C.white, outline: "none" }}
          placeholder="🔍  Search staff…"
          value={staffSearch}
          onChange={e => setStaffSearch(e.target.value)}
        />
        <select className="dash-select" value={filterStaffSector} onChange={e => setFilterStaffSector(e.target.value)}>
          <option value="all">All sectors</option>
          <option value="agedCare">Aged Care</option>
          <option value="earlyLearning">Early Learning</option>
          <option value="ndis">NDIS</option>
        </select>
        <select className="dash-select" value={filterExpiryWindow} onChange={e => setFilterExpiryWindow(e.target.value)}>
          <option value="all">All expiry dates</option>
          <option value="expired">Overdue now</option>
          <option value="30">Expiring within 30 days</option>
          <option value="60">Expiring within 60 days</option>
        </select>
        {(filterStaffSector !== "all" || filterExpiryWindow !== "all" || staffSearch || filterStaffStatus !== "all") && (
          <button
            onClick={() => { setFilterStaffSector("all"); setFilterExpiryWindow("all"); setStaffSearch(""); setFilterStaffStatus("all"); }}
            style={{ padding: "9px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, background: "white", fontSize: 13, color: C.textMid, cursor: "pointer", fontWeight: 600, whiteSpace: "nowrap" }}
          >✕ Clear filters</button>
        )}
      </div>

      {/* filter result count */}
      {filtered.length !== staffWithStatus.length && (
        <div style={{ fontSize: 12, color: C.textMuted }}>Showing {filtered.length} of {staffWithStatus.length} staff</div>
      )}

      {/* alerts banner */}
      {allExpiries.length > 0 && (
        <div style={{ background: "#fff9ec", border: `1.5px solid ${C.amberBorder}`, borderRadius: 14, padding: "14px 18px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.amber, marginBottom: 10 }}>
            ⏰ {allExpiries.length} compliance item{allExpiries.length !== 1 ? "s" : ""} need attention
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {allExpiries.slice(0, 4).map((e, i) => {
              const isExpired = e.status === "expired";
              const col = isExpired ? C.red : C.amber;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: col, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontWeight: 700, color: C.text }}>{e.staffName}</span>
                  <span style={{ color: C.textMid }}>—</span>
                  <span style={{ color: C.textMid, flex: 1 }}>{e.check}</span>
                  <span style={{ fontWeight: 700, color: col, flexShrink: 0 }}>
                    {isExpired ? `Expired ${Math.abs(e.days)}d ago` : `${e.days}d left`}
                  </span>
                </div>
              );
            })}
            {allExpiries.length > 4 && (
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>+{allExpiries.length - 4} more — click a staff member to see full details</div>
            )}
          </div>
        </div>
      )}

      {/* staff list */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {filtered.map(s => {
          const sm = staffStatusMeta[s.overallStatus];
          const onLeave = s.overallStatus === "onLeave" || s.overallStatus === "returningSoon";
          const leaveRec = leaveRecords[s.id];
          const expiringChecks = s.checks.filter(c => c.status === "expiring" || c.status === "expired");
          const returnDays = daysUntilReturn(s.id);
          // Checks expiring before return date
          const expiringDuringLeave = onLeave && leaveRec ? s.checks.filter(c => {
            const expDays = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
            return expDays > 0 && expDays < returnDays;
          }) : [];
          return (
            <div
              key={s.id}
              onClick={() => !onLeave && setSelectedStaff(selectedStaff?.id === s.id ? null : s)}
              style={{
                background: onLeave ? "#faf9ff" : C.white,
                border: `1.5px solid ${selectedStaff?.id === s.id ? sm.color : onLeave ? "#c4b5fd" : C.border}`,
                borderRadius: 14, padding: "16px 18px", cursor: onLeave ? "default" : "pointer", transition: "all 0.15s",
                boxShadow: selectedStaff?.id === s.id ? `0 0 0 3px ${sm.color}22` : "none",
                opacity: onLeave ? 0.88 : 1,
              }}
              onMouseEnter={e => { if (!onLeave && selectedStaff?.id !== s.id) e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { if (!onLeave && selectedStaff?.id !== s.id) e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: sm.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: sm.color }}>{s.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{s.role}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.facility}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: sm.color, background: sm.bg, flexShrink: 0 }}>{sm.label}</span>
              </div>

              {/* On leave info */}
              {onLeave && leaveRec && (
                <div style={{ marginBottom: 10, padding: "8px 12px", background: "#ede9fe", borderRadius: 8, border: "1px solid #c4b5fd" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#6d28d9" }}>🏖️ {leaveRec.leaveType}</div>
                  <div style={{ fontSize: 11, color: "#7c3aed", marginTop: 2 }}>
                    Returns {new Date(leaveRec.returnDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                    {returnDays !== null && ` · ${returnDays}d away`}
                  </div>
                  <div style={{ fontSize: 11, color: "#7c3aed", marginTop: 1 }}>Alerts paused until 60 days before return</div>
                </div>
              )}

              {/* Checks expiring during leave — warn manager */}
              {expiringDuringLeave.length > 0 && (
                <div style={{ marginBottom: 10, padding: "7px 12px", background: "#fff7ed", borderRadius: 8, border: "1px solid #fed7aa" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#c2410c" }}>⚠️ Renewal needed before return</div>
                  {expiringDuringLeave.map(c => (
                    <div key={c.id} style={{ fontSize: 11, color: "#c2410c", marginTop: 2 }}>{c.label} expires before {s.name.split(" ")[0]} returns</div>
                  ))}
                </div>
              )}

              {/* check status row — only when not on leave */}
              {!onLeave && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s.checks.map(c => {
                    const col = c.status === "current" ? C.green : c.status === "expiring" ? C.amber : C.red;
                    const days = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
                    return (
                      <div key={c.id} title={`${c.label}: ${c.status === "expired" ? "Expired" : `${days}d left`}`}
                        style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: col, background: col + "18", border: `1px solid ${col}44`, borderRadius: 20, padding: "2px 8px", fontWeight: 700 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: col, display: "inline-block" }} />
                        {c.id === "firstaid" ? "FA" : c.id === "anaphylaxis" ? "Ana" : c.id.charAt(0).toUpperCase() + c.id.slice(1, 3)}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* show expiring details inline — only when not on leave */}
              {!onLeave && expiringChecks.length > 0 && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderLight}` }}>
                  {expiringChecks.map(c => {
                    const days = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
                    const isExpired = c.status === "expired";
                    return (
                      <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textMid, marginBottom: 4 }}>
                        <span>{c.label}</span>
                        <span style={{ fontWeight: 700, color: isExpired ? C.red : C.amber }}>
                          {isExpired ? `Expired ${Math.abs(days)}d ago` : `${days}d left`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Leave action buttons */}
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "flex-end" }}>
                {onLeave ? (
                  <button
                    onClick={e => { e.stopPropagation(); setLeaveRecords(p => { const n = {...p}; delete n[s.id]; return n; }); }}
                    style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 8, border: "1.5px solid #c4b5fd", background: "white", color: "#7c3aed", cursor: "pointer" }}
                  >✓ Mark as returned</button>
                ) : (
                  <button
                    onClick={e => { e.stopPropagation(); setLeaveModal(s.id); setLeaveForm({ returnDate: "", leaveType: "Parental leave" }); }}
                    style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, background: "white", color: C.textMid, cursor: "pointer" }}
                  >Set leave dates</button>
                )}
                <button
                  onClick={e => { e.stopPropagation(); setResignModal(s.id); }}
                  style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 8, border: `1.5px solid ${C.greyBorder}`, background: "white", color: C.textMuted, cursor: "pointer" }}
                >Resign</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── ALUMNI SECTION ── */}
      {(alumniStaff.length > 0) && (
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => setShowAlumni(v => !v)}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "10px 0", fontSize: 13, fontWeight: 700, color: C.textMid }}
          >
            <span style={{ fontSize: 16 }}>{showAlumni ? "▾" : "▸"}</span>
            Alumni — {alumniStaff.length} former staff member{alumniStaff.length !== 1 ? "s" : ""}
            <span style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, padding: "2px 8px", background: C.greyBg, borderRadius: 20, border: `1px solid ${C.greyBorder}` }}>
              Records retained
            </span>
          </button>

          {showAlumni && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14, marginTop: 8 }}>
              {alumniStaff.map(a => (
                <div key={a.id} style={{ background: "#f8fafc", border: `1.5px solid ${C.greyBorder}`, borderRadius: 14, padding: "16px 18px", opacity: 0.8 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.greyBg, border: `1px solid ${C.greyBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: C.grey }}>{a.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.textMid }}>{a.name}</div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{a.role}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.facility}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: C.grey, background: C.greyBg, border: `1px solid ${C.greyBorder}`, flexShrink: 0 }}>Alumni</span>
                  </div>

                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 12 }}>
                    <span>Resigned: {a.resignedDate ? new Date(a.resignedDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—"}</span>
                    {a.startDate && <span style={{ marginLeft: 10 }}>Started: {new Date(a.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => onRehire && onRehire(a)}
                      style={{ flex: 1, fontSize: 11, fontWeight: 700, padding: "6px 0", borderRadius: 8, border: `1.5px solid ${C.greenBorder}`, background: C.greenBg, color: C.green, cursor: "pointer" }}
                    >↩ Rehire</button>
                    <div style={{ flex: 2, fontSize: 11, color: C.textMuted, padding: "6px 8px", background: "white", border: `1px solid ${C.borderLight}`, borderRadius: 8, textAlign: "center" }}>
                      All check records retained
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Resign confirmation modal */}
      {resignModal && (
        <>
          <div onClick={() => setResignModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 300 }} />
          <div style={{ position: "fixed", zIndex: 310, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", borderRadius: 16, padding: "28px 28px 24px", width: "min(400px, 90vw)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            {(() => {
              const s = allActiveStaff.find(s => s.id === resignModal);
              return s ? (
                <>
                  <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 6 }}>Mark as resigned?</div>
                  <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>
                    <strong>{s.name}</strong> will move to Alumni. Their compliance records are retained and they can be rehired at any time.
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setResignModal(null)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: `1.5px solid ${C.border}`, background: "white", fontSize: 13, fontWeight: 700, color: C.textMid, cursor: "pointer" }}>Cancel</button>
                    <button
                      onClick={() => { onResign && onResign(s); setResignModal(null); setSelectedStaff(null); }}
                      style={{ flex: 2, padding: "10px 0", borderRadius: 9, border: "none", background: C.grey, color: "white", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                    >Yes, move to Alumni</button>
                  </div>
                </>
              ) : null;
            })()}
          </div>
        </>
      )}

      {/* Leave modal */}
      {leaveModal && (
        <>
          <div onClick={() => setLeaveModal(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 300 }} />
          <div style={{ position: "fixed", zIndex: 310, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "white", borderRadius: 16, padding: "28px 28px 24px", width: "min(400px, 90vw)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: C.text, marginBottom: 4 }}>
              Mark staff member on leave
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginBottom: 20 }}>
              {ACTIVE_STAFF.find(s => s.id === leaveModal)?.name} — alerts will pause during leave and resume 60 days before their return.
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.text, display: "block", marginBottom: 5 }}>Leave type</label>
              <select
                value={leaveForm.leaveType}
                onChange={e => setLeaveForm(f => ({ ...f, leaveType: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text, background: "white", outline: "none" }}
              >
                {leaveTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 22 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: C.text, display: "block", marginBottom: 5 }}>Expected return date</label>
              <input
                type="date"
                value={leaveForm.returnDate}
                min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
                onChange={e => setLeaveForm(f => ({ ...f, returnDate: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`, fontSize: 13, color: C.text, boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => setLeaveModal(null)}
                style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: `1.5px solid ${C.border}`, background: "white", fontSize: 13, fontWeight: 700, color: C.textMid, cursor: "pointer" }}
              >Cancel</button>
              <button
                disabled={!leaveForm.returnDate}
                onClick={() => {
                  if (!leaveForm.returnDate) return;
                  setLeaveRecords(p => ({ ...p, [leaveModal]: { returnDate: leaveForm.returnDate, leaveType: leaveForm.leaveType } }));
                  setLeaveModal(null);
                }}
                style={{ flex: 2, padding: "10px 0", borderRadius: 9, border: "none", background: leaveForm.returnDate ? "#7c3aed" : "#c4b5fd", fontSize: 13, fontWeight: 700, color: "white", cursor: leaveForm.returnDate ? "pointer" : "not-allowed" }}
              >Save & pause alerts</button>
            </div>
          </div>
        </>
      )}

      {/* detail panel for selected staff */}
      {selectedStaff && (
        <>
          <div onClick={() => setSelectedStaff(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 190 }} />
          <div style={{ position: "fixed", zIndex: 200, top: 0, right: 0, bottom: 0, width: "min(480px, 100vw)", background: C.white, borderLeft: `1.5px solid ${C.border}`, overflowY: "auto", boxShadow: "-6px 0 32px rgba(0,0,0,0.1)" }}>
            <div style={{ padding: "18px 20px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.white, zIndex: 1 }}>
              <button onClick={() => setSelectedStaff(null)} style={{ position: "absolute", top: 16, right: 16, background: C.greyBg, border: "none", borderRadius: 8, width: 34, height: 34, cursor: "pointer", fontSize: 20, color: C.textMid, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
              <div style={{ fontSize: 17, fontWeight: 800, color: C.text, paddingRight: 40 }}>{selectedStaff.name}</div>
              <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{selectedStaff.role} · {selectedStaff.facility}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Started {new Date(selectedStaff.startDate).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</div>
            </div>

            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Ongoing Compliance — Expiry Tracking</div>

              {selectedStaff.checks.map(c => {
                const days = Math.round((new Date(c.expiryDate) - new Date()) / 86400000);
                const isExpired = c.status === "expired";
                const isExpiring = c.status === "expiring";
                const col = isExpired ? C.red : isExpiring ? C.amber : C.green;
                const renewDate = new Date(c.expiryDate);
                renewDate.setFullYear(renewDate.getFullYear() + (c.renewYears || 1));
                const pct = isExpired ? 0 : Math.min(100, Math.round((days / (c.renewYears * 365)) * 100));

                return (
                  <div key={c.id} style={{ padding: "14px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{c.label}</div>
                        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                          Renews every {c.renewYears} year{c.renewYears !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: col, background: col + "18", border: `1px solid ${col}44`, flexShrink: 0, marginLeft: 8 }}>
                        {isExpired ? `Expired ${Math.abs(days)}d ago` : isExpiring ? `${days}d left` : `${days}d left`}
                      </span>
                    </div>
                    <div style={{ height: 6, background: "#e8ede9", borderRadius: 4, overflow: "hidden", marginBottom: 5 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: col, borderRadius: 4 }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted }}>
                      <span>Expiry: {new Date(c.expiryDate).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}</span>
                      {c.renewYears && <span>Next renewal due: {renewDate.toLocaleDateString("en-AU", { month: "short", year: "numeric" })}</span>}
                    </div>
                    {(isExpired || isExpiring) && (
                      <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 7, background: col + "12", border: `1px solid ${col}44`, fontSize: 11, color: col, fontWeight: 600 }}>
                        {isExpired ? "⚠️ This check has lapsed — worker may not be compliant for rostering" : "🔔 Reminder sent to worker — renewal required soon"}
                      </div>
                    )}
                  </div>
                );
              })}

              <div style={{ marginTop: 20, padding: "14px 16px", background: C.primaryXLight, borderRadius: 10, border: `1px solid ${C.primaryBorder}` }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 4 }}>🔔 Auto-reminders active</div>
                <div style={{ fontSize: 12, color: C.textMid }}>Veriyo sends renewal reminders to {selectedStaff.name.split(" ")[0]} at 60, 30, 14 and 7 days before expiry — and alerts you if they don't act.</div>
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
function VeriyoDashboard({ user, onOpenPortal }) {
  const [activeTab,      setActiveTab]      = useState("overview");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [filterStatus,   setFilterStatus]   = useState("all");
  const [filterSector,   setFilterSector]   = useState("all");
  const [filterFacility, setFilterFacility] = useState("all");
  const [search,         setSearch]         = useState("");
  const [uploadedDocs,   setUploadedDocs]   = useState({});
  const [aiResults,      setAiResults]      = useState({});
  const [aiLoading,      setAiLoading]      = useState({});
  const [showAddWorker,  setShowAddWorker]  = useState(false);
  const [extraWorkers,   setExtraWorkers]   = useState([]);
  const [graduatedStaff, setGraduatedStaff] = useState([]); // workers who completed onboarding → Active Staff
  const [alumniStaff,    setAlumniStaff]    = useState([]); // active staff who resigned

  const allWorkers = [...WORKERS, ...extraWorkers];
  const filtered   = allWorkers.filter(w => {
    if (filterStatus   !== "all" && w.status     !== filterStatus)   return false;
    if (filterSector   !== "all" && w.sector     !== filterSector)   return false;
    if (filterFacility !== "all" && w.facilityId !== filterFacility) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total:      allWorkers.length,
    compliant:  allWorkers.filter(w => w.status === "compliant").length,
    risk:       allWorkers.filter(w => w.status === "risk").length,
    attention:  allWorkers.filter(w => w.status === "attention").length,
    inprogress: allWorkers.filter(w => w.status === "inprogress").length,
  };

  function handleAddWorker(form) {
    setExtraWorkers(p => [...p, {
      id: `w${Date.now()}`, name: form.name, role: form.role, sector: form.sector,
      facility: FACILITIES.find(f => f.id === form.facility)?.name || form.facility,
      facilityId: form.facility, startDate: form.start || new Date().toISOString().slice(0, 10),
      pct: 0, status: "inprogress",
      checks: Object.fromEntries(ALL_CHECKS.map(c => [c.id, "missing"])),
    }]);
  }

  function handleUpload(workerId, checkId) {
    const key = `${workerId}_${checkId}`;
    setUploadedDocs(p => ({ ...p, [key]: true }));
    setAiLoading(p => ({ ...p, [key]: true }));
    setTimeout(() => {
      setAiLoading(p => ({ ...p, [key]: false }));
      setAiResults(p => ({ ...p, [key]: { expiry: "2027-06-30", confidence: 97 } }));
    }, 2200);
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <>
      {/* responsive styles injected */}
      <style>{`
        .dash-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 14px; margin-bottom: 24px; }
        .dash-filters { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; align-items: center; }
        .dash-workers-grid { display: flex; flex-direction: column; gap: 10px; }
        .dash-table-wrap { display: none; }
        @media (min-width: 700px) {
          .dash-workers-grid { display: none; }
          .dash-table-wrap { display: block; }
        }
        .dash-tabs { display: flex; gap: 2; background: #edf2ef; border-radius: 10px; padding: 3px; }
        .dash-header-inner { max-width: 1300px; margin: 0 auto; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 60px; flex-wrap: wrap; }
        @media (max-width: 480px) {
          .dash-header-inner { padding: 10px 14px; flex-direction: column; align-items: flex-start; gap: 10px; }
        }
        .dash-select { padding: 8px 10px; border: 1.5px solid ${C.border}; border-radius: 8px; font-size: 13px; font-family: inherit; color: ${C.textMid}; background: ${C.white}; cursor: pointer; outline: none; }
      `}</style>

      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif", color: C.text }}>

        {/* Sub-header */}
        <div style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
          <div className="dash-header-inner">
            {/* greeting */}
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>
                {greeting}, {firstName} 👋
              </div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>
                {activeTab === "active staff"
                  ? `${ACTIVE_STAFF.length + graduatedStaff.length} active staff · expiry monitoring on`
                  : `${FACILITIES.length} facilities · ${allWorkers.length} candidates tracked`}
              </div>
            </div>
            {/* tabs + add */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="dash-tabs">
                {["overview","candidates","active staff","documents"].map(t => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    style={{
                      padding: "6px 14px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                      cursor: "pointer", border: "none", fontFamily: "inherit",
                      background: activeTab === t ? C.white : "transparent",
                      color: activeTab === t ? C.primary : C.textMuted,
                      boxShadow: activeTab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      transition: "all 0.15s",
                    }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAddWorker(true)}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "none",
                  background: C.primary, color: "#fff", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
                }}
              >
                + Add Candidate
              </button>
            </div>
          </div>
        </div>

        {/* modals */}
        {showAddWorker && <AddWorkerModal onClose={() => setShowAddWorker(false)} onAdd={handleAddWorker} />}
        {selectedWorker && (
          <WorkerPanel
            worker={selectedWorker}
            onClose={() => setSelectedWorker(null)}
            aiResults={aiResults}
            aiLoading={aiLoading}
            uploadedDocs={uploadedDocs}
            onUpload={handleUpload}
            alreadyGraduated={graduatedStaff.some(g => g.id === selectedWorker.id)}
            onGraduate={w => {
              setGraduatedStaff(p => [...p, { ...w, graduatedDate: new Date().toISOString().slice(0,10) }]);
              setSelectedWorker(null);
              setActiveTab("active staff");
            }}
            onOpenPortal={onOpenPortal}
          />
        )}

        {/* main content */}
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "22px 20px" }}>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "overview" && (
            <>
              <div className="dash-stats">
                <StatCard num={stats.total}     label="Total Candidates"   color={C.primary} bg={C.primaryXLight} onClick={() => { setFilterStatus("all");        setActiveTab("candidates"); }} active={false} />
                <StatCard num={stats.compliant}  label="Fully Compliant" color={C.green}   bg={C.greenBg}       onClick={() => { setFilterStatus("compliant");   setActiveTab("candidates"); }} active={false} />
                <StatCard num={stats.inprogress} label="In Progress"     color={C.blue}    bg={C.blueBg}        onClick={() => { setFilterStatus("inprogress");  setActiveTab("candidates"); }} active={false} />
                <StatCard num={stats.attention}  label="Need Attention"  color={C.amber}   bg={C.amberBg}       onClick={() => { setFilterStatus("attention");   setActiveTab("candidates"); }} active={false} />
                <StatCard num={stats.risk}       label="At Risk"         color={C.red}     bg={C.redBg}         onClick={() => { setFilterStatus("risk");        setActiveTab("candidates"); }} active={false} />
              </div>
              <OverviewTab stats={stats} workers={allWorkers} />
            </>
          )}

          {/* ── WORKERS TAB ── */}
          {activeTab === "candidates" && (
            <>
              <div className="dash-stats">
                <StatCard num={stats.total}     label="Total Candidates"   color={C.primary} bg={C.primaryXLight} onClick={() => setFilterStatus("all")}        active={filterStatus === "all"} />
                <StatCard num={stats.compliant}  label="Fully Compliant" color={C.green}   bg={C.greenBg}       onClick={() => setFilterStatus(s => s === "compliant"  ? "all" : "compliant")}  active={filterStatus === "compliant"} />
                <StatCard num={stats.inprogress} label="In Progress"     color={C.blue}    bg={C.blueBg}        onClick={() => setFilterStatus(s => s === "inprogress" ? "all" : "inprogress")} active={filterStatus === "inprogress"} />
                <StatCard num={stats.attention}  label="Need Attention"  color={C.amber}   bg={C.amberBg}       onClick={() => setFilterStatus(s => s === "attention"  ? "all" : "attention")}  active={filterStatus === "attention"} />
                <StatCard num={stats.risk}       label="At Risk"         color={C.red}     bg={C.redBg}         onClick={() => setFilterStatus(s => s === "risk"       ? "all" : "risk")}       active={filterStatus === "risk"} />
              </div>

              {/* filters */}
              <div className="dash-filters">
                <input
                  style={{ flex: "1 1 180px", padding: "9px 14px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "inherit", color: C.text, background: C.white, outline: "none" }}
                  placeholder="🔍  Search candidates…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <select className="dash-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="all">All statuses</option>
                  <option value="compliant">Compliant</option>
                  <option value="inprogress">In Progress</option>
                  <option value="attention">Attention</option>
                  <option value="risk">Risk</option>
                </select>
                <select className="dash-select" value={filterSector} onChange={e => { setFilterSector(e.target.value); setFilterFacility("all"); }}>
                  <option value="all">All sectors</option>
                  <option value="agedCare">Aged Care</option>
                  <option value="earlyLearning">Early Learning</option>
                  <option value="ndis">NDIS</option>
                </select>
                <select className="dash-select" value={filterFacility} onChange={e => setFilterFacility(e.target.value)}>
                  <option value="all">All facilities</option>
                  {FACILITIES
                    .filter(f => filterSector === "all" || f.sector === filterSector || (filterSector === "ndis" && f.ndisRequired))
                    .map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>

              {/* mobile: cards */}
              <div className="dash-workers-grid">
                {filtered.map(w => (
                  <WorkerCard key={w.id} w={w} onClick={() => setSelectedWorker(w)} onOpenPortal={onOpenPortal} />
                ))}
              </div>

              {/* desktop: table */}
              <div className="dash-table-wrap">
                <table style={{ width: "100%", borderCollapse: "collapse", background: C.white, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <thead>
                    <tr>
                      {["Candidate","Facility","Sector","Compliance","Status"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left", background: "#f4f8f6", borderBottom: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(w => (
                      <tr
                        key={w.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedWorker(w)}
                        onMouseEnter={e => e.currentTarget.style.background = "#f7faf8"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <td style={{ padding: "12px 14px", borderBottom: `1px solid ${C.borderLight}` }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: workerStatusMeta[w.status].bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <span style={{ fontSize: 11, fontWeight: 800, color: workerStatusMeta[w.status].color }}>{w.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
                            </div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{w.name}</div>
                              <div style={{ fontSize: 12, color: C.textMuted }}>{w.role}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: C.textMid, borderBottom: `1px solid ${C.borderLight}`, maxWidth: 200 }}>{w.facility}</td>
                        <td style={{ padding: "12px 14px", fontSize: 12, color: C.textMid, borderBottom: `1px solid ${C.borderLight}` }}>{SECTOR_LABELS[w.sector]}</td>
                        <td style={{ padding: "12px 14px", borderBottom: `1px solid ${C.borderLight}`, minWidth: 120 }}>
                          <div style={{ fontSize: 12, fontWeight: 800, color: workerStatusMeta[w.status].color, marginBottom: 4 }}>{w.pct}%</div>
                          <ProgressBar pct={w.pct} status={w.status} />
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: `1px solid ${C.borderLight}` }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: workerStatusMeta[w.status].color, background: workerStatusMeta[w.status].bg }}>
                            {workerStatusMeta[w.status].label}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: C.textMuted, fontSize: 14 }}>No candidates match your filters.</div>
                )}
              </div>
            </>
          )}

          {/* ── ACTIVE STAFF TAB ── */}
          {activeTab === "active staff" && (
            <ActiveStaffTab
              graduatedStaff={graduatedStaff}
              alumniStaff={alumniStaff}
              onResign={(staffMember) => {
                setAlumniStaff(p => [...p, { ...staffMember, resignedDate: new Date().toISOString().slice(0,10) }]);
                setGraduatedStaff(p => p.filter(g => g.id !== staffMember.id));
              }}
              onRehire={(alumni) => {
                setGraduatedStaff(p => [...p, { ...alumni, graduatedDate: new Date().toISOString().slice(0,10), resignedDate: undefined }]);
                setAlumniStaff(p => p.filter(a => a.id !== alumni.id));
              }}
            />
          )}

          {/* ── DOCUMENTS TAB ── */}
          {activeTab === "documents" && (
            <div style={{ ...card, textAlign: "center", padding: "60px 24px" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📂</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 8 }}>Document vault coming soon</div>
              <div style={{ fontSize: 14, color: C.textMuted, maxWidth: 400, margin: "0 auto" }}>
                Centralised storage for compliance documents — police checks, WWCC cards, vaccination records and more. All searchable, all auditable.
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
