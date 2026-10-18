import { useState } from "react";
import Nav from "./Nav";

const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  white: "#ffffff", bg: "#f7faf8", border: "#e3ede8", borderLight: "#f0f5f2",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  purple: "#7c3aed", purpleBg: "#f5f3ff",
};

const FACILITIES = [
  "All facilities",
  "Northern Campus", "Eastern House", "Western Lodge",
  "Southern Centre", "City Clinic", "Blue Haven", "Riverside Hub", "Southgate",
];

const ROLES = ["All roles", "Registered Nurse", "Enrolled Nurse", "Support Worker (NDIS)", "Care Coordinator", "Administration"];
const CHECKS = ["All checks", "Police Check", "NDIS Worker Screening", "Working With Children", "AHPRA Registration", "First Aid Certificate"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ num, label, sub, color }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px" }}>
      <div style={{ fontSize: 30, fontWeight: 800, color: color || C.primary, lineHeight: 1, letterSpacing: "-1px" }}>{num}</div>
      <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".4px", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: sub.startsWith("↑") || sub.startsWith("↓") ? C.green : C.textMuted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>{children}</div>;
}

function Badge({ children, color, bg }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, color: color || C.green, background: bg || C.greenBg, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

// ── SVG bar chart (vertical) ──────────────────────────────────────────────────
function BarChart({ data, height = 140 }) {
  // data: [{label, value, color?}]
  const max = Math.max(...data.map(d => d.value), 1);
  const barW = Math.min(32, Math.floor(320 / data.length) - 8);
  const chartH = height - 30;
  const totalW = data.length * (barW + 8) + 40;

  return (
    <svg viewBox={`0 0 ${totalW} ${height}`} style={{ width: "100%", height }}>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const y = 10 + chartH * (1 - f);
        return (
          <g key={i}>
            <line x1="30" y1={y} x2={totalW} y2={y} stroke={C.border} strokeWidth="1" />
            <text x="26" y={y + 4} fontSize="8" fill={C.textMuted} textAnchor="end" fontFamily="Inter,sans-serif">
              {Math.round(max * f)}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const x = 34 + i * (barW + 8);
        const barH = (d.value / max) * chartH;
        const y = 10 + chartH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx="4" fill={d.color || C.primary} opacity=".85" />
            <text x={x + barW / 2} y={height - 4} fontSize="8" fill={C.textMuted} textAnchor="middle" fontFamily="Inter,sans-serif">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── SVG grouped bar chart ─────────────────────────────────────────────────────
function GroupedBarChart({ groups, series, height = 160 }) {
  // groups: string[], series: [{label, color, values: number[]}]
  const allVals = series.flatMap(s => s.values);
  const max = Math.max(...allVals, 1);
  const groupW = 70;
  const barW = 13;
  const gap = 3;
  const chartH = height - 36;
  const totalW = groups.length * groupW + 44;

  return (
    <svg viewBox={`0 0 ${totalW} ${height}`} style={{ width: "100%", height }}>
      {[0, 0.5, 1].map((f, i) => {
        const y = 10 + chartH * (1 - f);
        return (
          <g key={i}>
            <line x1="36" y1={y} x2={totalW} y2={y} stroke={C.border} strokeWidth="1" />
            <text x="32" y={y + 4} fontSize="8" fill={C.textMuted} textAnchor="end" fontFamily="Inter,sans-serif">
              {(max * f).toFixed(1)}d
            </text>
          </g>
        );
      })}
      {groups.map((g, gi) => {
        const groupX = 40 + gi * groupW;
        return (
          <g key={gi}>
            {series.map((ser, si) => {
              const barH = Math.max((ser.values[gi] / max) * chartH, 2);
              const x = groupX + si * (barW + gap);
              const y = 10 + chartH - barH;
              return <rect key={si} x={x} y={y} width={barW} height={barH} rx="3" fill={ser.color} opacity=".85" />;
            })}
            <text x={groupX + ((barW + gap) * series.length) / 2 - gap} y={height - 20} fontSize="7.5" fill={C.textMuted} textAnchor="middle" fontFamily="Inter,sans-serif">
              {g}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      {series.map((ser, i) => (
        <g key={i}>
          <rect x={40 + i * 90} y={height - 12} width={8} height={5} rx="2" fill={ser.color} />
          <text x={52 + i * 90} y={height - 7} fontSize="7.5" fill={C.textMid} fontFamily="Inter,sans-serif">{ser.label}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function SubTabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: `1px solid ${C.border}`, paddingBottom: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: "8px 16px", border: "none", borderBottom: active === t.id ? `2px solid ${C.primary}` : "2px solid transparent",
          background: "none", fontSize: 13, fontWeight: active === t.id ? 700 : 500,
          color: active === t.id ? C.primary : C.textMuted, cursor: "pointer", fontFamily: "inherit",
          marginBottom: -1,
        }}>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const monthlyData = [
    { label: "Jul", value: 68 }, { label: "Aug", value: 71 }, { label: "Sep", value: 74 },
    { label: "Oct", value: 77 }, { label: "Nov", value: 79 }, { label: "Dec", value: 81 },
    { label: "Jan", value: 82 }, { label: "Feb", value: 83 }, { label: "Mar", value: 85 },
    { label: "Apr", value: 86 }, { label: "May", value: 88 }, { label: "Jun", value: 86 },
  ];

  const checkIssues = [
    { label: "Police", value: 10, color: C.red },
    { label: "NDIS", value: 7, color: C.amber },
    { label: "WWC", value: 4, color: C.amber },
    { label: "First Aid", value: 2, color: C.primary },
    { label: "AHPRA", value: 1, color: C.primary },
  ];

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard num="86%" label="Avg compliance rate YTD" sub="↑ +12% vs last FY" color={C.green} />
        <StatCard num="4.2d" label="Avg time to comply" sub="↓ −1.8d vs last FY" color={C.primary} />
        <StatCard num="23" label="Checks expired this FY" color={C.amber} />
        <StatCard num="7" label="Workers ever blocked" color={C.red} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={card}>
          <SectionTitle>Monthly compliance rate — FY 2025–26</SectionTitle>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>% workers fully compliant at month-end</div>
          <BarChart data={monthlyData.map(d => ({ ...d, color: C.primary }))} height={140} />
        </div>
        <div style={card}>
          <SectionTitle>Checks by type — issues this FY</SectionTitle>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>How many times each check caused a delay or block</div>
          <BarChart data={checkIssues} height={140} />
        </div>
      </div>
    </>
  );
}

// ─── By Facility tab ──────────────────────────────────────────────────────────
function FacilityTab() {
  const rows = [
    { name: "Northern Campus",  workers: 9, compliant: 6, expiring: 2, action: 1, rate: 67, avg: "3.8d" },
    { name: "Eastern House",    workers: 5, compliant: 4, expiring: 1, action: 0, rate: 80, avg: "2.9d" },
    { name: "Western Lodge",    workers: 4, compliant: 2, expiring: 1, action: 1, rate: 50, avg: "6.1d" },
    { name: "Southern Centre",  workers: 4, compliant: 2, expiring: 1, action: 1, rate: 50, avg: "5.4d" },
    { name: "City Clinic",      workers: 6, compliant: 5, expiring: 1, action: 0, rate: 83, avg: "3.2d" },
    { name: "Blue Haven",       workers: 5, compliant: 4, expiring: 0, action: 1, rate: 80, avg: "4.7d" },
    { name: "Riverside Hub",    workers: 3, compliant: 2, expiring: 1, action: 0, rate: 67, avg: "2.4d" },
    { name: "Southgate",        workers: 3, compliant: 3, expiring: 0, action: 0, rate: 100, avg: "1.9d" },
  ];

  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <SectionTitle>Compliance by Facility</SectionTitle>
        <button style={exportBtn}>⬇ Export CSV</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={tbl}>
          <thead>
            <tr>
              {["Facility", "Workers", "Compliant", "Expiring", "Action Req.", "Rate", "Avg Time to Comply"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={td}><strong>{r.name}</strong></td>
                <td style={td}>{r.workers}</td>
                <td style={td}><Badge>{r.compliant}</Badge></td>
                <td style={td}><Badge bg={C.amberBg} color={C.amber}>{r.expiring}</Badge></td>
                <td style={td}><Badge bg={r.action > 0 ? C.redBg : C.greenBg} color={r.action > 0 ? C.red : C.green}>{r.action}</Badge></td>
                <td style={td}><strong>{r.rate}%</strong></td>
                <td style={td}>{r.avg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── By Role tab ──────────────────────────────────────────────────────────────
function RoleTab() {
  const rows = [
    { role: "Registered Nurse",     workers: 6, checks: "Police · NDIS · WWC · First Aid · AHPRA", compliant: 5, rate: 83, issue: "Police check expiry" },
    { role: "Support Worker (NDIS)",workers: 8, checks: "Police · NDIS Screen · WWC",               compliant: 5, rate: 63, issue: "NDIS screening delay" },
    { role: "Enrolled Nurse",       workers: 4, checks: "Police · NDIS · AHPRA",                    compliant: 3, rate: 75, issue: "NDIS screening near expiry" },
    { role: "Care Coordinator",     workers: 3, checks: "Police · NDIS · WWC · First Aid",          compliant: 1, rate: 33, issue: "Police check + NDIS missing" },
    { role: "Administration",       workers: 1, checks: "Police",                                   compliant: 1, rate: 100, issue: "—" },
  ];

  return (
    <div style={card}>
      <SectionTitle>Compliance by Role</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <table style={tbl}>
          <thead>
            <tr>
              {["Role", "Workers", "Required Checks", "Fully Compliant", "Rate", "Most Common Issue"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={td}><strong>{r.role}</strong></td>
                <td style={td}>{r.workers}</td>
                <td style={{ ...td, fontSize: 12, color: C.textMid }}>{r.checks}</td>
                <td style={td}>
                  <Badge bg={r.rate >= 80 ? C.greenBg : r.rate >= 60 ? C.amberBg : C.redBg}
                         color={r.rate >= 80 ? C.green : r.rate >= 60 ? C.amber : C.red}>
                    {r.compliant}
                  </Badge>
                </td>
                <td style={td}><strong>{r.rate}%</strong></td>
                <td style={{ ...td, fontSize: 12, color: C.textMid }}>{r.issue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Time to Comply tab ───────────────────────────────────────────────────────
function TimeTab() {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <StatCard num="4.2d" label="Overall avg. time to comply" color={C.primary} />
        <StatCard num="1.8d" label="Fastest: Police Check renewal" color={C.green} />
        <StatCard num="8.6d" label="Slowest: NDIS Screening (new)" color={C.amber} />
      </div>
      <div style={card}>
        <SectionTitle>Avg days to complete each check — by facility</SectionTitle>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>Lower is better.</div>
        <GroupedBarChart
          groups={["Northern", "Eastern", "Western", "Southern", "City", "Blue Haven"]}
          series={[
            { label: "Police Check", color: C.primary,  values: [3.0, 3.2, 4.5, 3.8, 3.5, 2.8] },
            { label: "NDIS Screen",  color: C.amber,    values: [5.8, 5.5, 7.5, 7.0, 6.4, 5.0] },
            { label: "WWC",          color: C.purple,   values: [2.2, 2.5, 3.2, 2.8, 2.4, 2.1] },
          ]}
          height={180}
        />
      </div>
    </>
  );
}

// ─── Audit Log tab ────────────────────────────────────────────────────────────
function AuditTab() {
  const rows = [
    { date: "18 Oct 2026, 9:14 AM",  action: "Uploaded",       worker: "Maria Santos",  check: "Police Check",      by: "Sarah Chen" },
    { date: "17 Oct 2026, 4:52 PM",  action: "Expiry updated", worker: "James Okafor",  check: "Police Check",      by: "System" },
    { date: "16 Oct 2026, 2:30 PM",  action: "Flagged",        worker: "Priya Nair",    check: "NDIS Screening",    by: "System" },
    { date: "15 Oct 2026, 11:08 AM", action: "Approved",       worker: "Tom Nguyen",    check: "WWC",               by: "Sarah Chen" },
    { date: "14 Oct 2026, 10:00 AM", action: "Uploaded",       worker: "Aisha Williams",check: "NDIS Screening",    by: "Luke Patterson" },
    { date: "13 Oct 2026, 3:17 PM",  action: "Rejected",       worker: "Marcus Brown",  check: "Police Check",      by: "Sarah Chen" },
    { date: "12 Oct 2026, 9:02 AM",  action: "Uploaded",       worker: "Anna Davis",    check: "First Aid Cert",    by: "Mohammed Nasser" },
  ];

  const actionStyle = (a) => {
    if (a === "Approved" || a === "Uploaded") return { bg: C.greenBg, color: C.green };
    if (a === "Expiry updated") return { bg: C.amberBg, color: C.amber };
    if (a === "Flagged" || a === "Rejected") return { bg: C.redBg, color: C.red };
    return { bg: "#f1f5f9", color: "#475569" };
  };

  return (
    <div style={card}>
      <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#1e40af" }}>
        ℹ️ All changes to worker compliance records are logged here for audit purposes.
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={tbl}>
          <thead>
            <tr>
              {["Date & Time", "Action", "Worker", "Check", "Changed by"].map(h => (
                <th key={h} style={th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const as = actionStyle(r.action);
              return (
                <tr key={i}>
                  <td style={{ ...td, fontSize: 11, color: C.textMuted, whiteSpace: "nowrap" }}>{r.date}</td>
                  <td style={td}><Badge bg={as.bg} color={as.color}>{r.action}</Badge></td>
                  <td style={{ ...td, fontWeight: 600 }}>{r.worker}</td>
                  <td style={{ ...td, fontSize: 12, color: C.textMid }}>{r.check}</td>
                  <td style={{ ...td, fontSize: 12, color: C.textMid }}>{r.by}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Shared table/card styles ─────────────────────────────────────────────────
const card = {
  background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px", marginBottom: 20,
};
const tbl = { width: "100%", borderCollapse: "collapse" };
const th = {
  padding: "9px 12px", fontSize: 11, fontWeight: 700, color: C.textMuted,
  textTransform: "uppercase", letterSpacing: ".5px", textAlign: "left",
  background: "#f4f8f6", borderBottom: `1px solid ${C.border}`,
};
const td = { padding: "11px 12px", fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}`, verticalAlign: "middle" };
const exportBtn = {
  background: C.primaryXLight, border: `1px solid ${C.greenBorder}`, borderRadius: 8, padding: "7px 14px",
  fontSize: 12, fontWeight: 600, color: C.primary, cursor: "pointer", fontFamily: "inherit",
};

// ─── Main Reports component ───────────────────────────────────────────────────
const TABS = [
  { id: "overview", label: "Overview" },
  { id: "facility", label: "By Facility" },
  { id: "role",     label: "By Role" },
  { id: "time",     label: "Time to Comply" },
  { id: "audit",    label: "Audit Log" },
];

export default function Reports({ user, onSection, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [fy, setFy]           = useState("FY 2025–26 (current)");
  const [facility, setFacility] = useState("All facilities");
  const [role, setRole]         = useState("All roles");
  const [check, setCheck]       = useState("All checks");
  const [dateFrom, setDateFrom] = useState("2025-07-01");
  const [dateTo, setDateTo]     = useState("2026-06-30");

  const sel = {
    padding: "7px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8,
    fontSize: 12, fontFamily: "inherit", color: C.textMid, background: C.white, cursor: "pointer", outline: "none",
  };
  const inp = { ...sel, cursor: "text" };
  const label = { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: C.textMuted, marginBottom: 4 };
  const fg = { display: "flex", flexDirection: "column" };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text }}>
      <Nav user={user} section="reports" onSection={onSection} onLogout={onLogout} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 22, gap: 16 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.5px" }}>Compliance Reports</div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3 }}>Filter, explore and export workforce compliance data across your organisation</div>
          </div>
          <button style={{ ...exportBtn, padding: "9px 18px", fontSize: 13, flexShrink: 0 }}>⬇ Export Report</button>
        </div>

        {/* Filter bar */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end", marginBottom: 22 }}>
          <div style={fg}><span style={label}>Financial Year</span>
            <select style={sel} value={fy} onChange={e => setFy(e.target.value)}>
              <option>FY 2025–26 (current)</option><option>FY 2024–25</option><option>FY 2023–24</option>
            </select>
          </div>
          <div style={fg}><span style={label}>Facility</span>
            <select style={sel} value={facility} onChange={e => setFacility(e.target.value)}>
              {FACILITIES.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div style={fg}><span style={label}>Role Type</span>
            <select style={sel} value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div style={fg}><span style={label}>Check Type</span>
            <select style={sel} value={check} onChange={e => setCheck(e.target.value)}>
              {CHECKS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={fg}><span style={label}>Date From</span>
            <input type="date" style={inp} value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div style={fg}><span style={label}>Date To</span>
            <input type="date" style={inp} value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignSelf: "flex-end" }}>
            <button style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px", fontSize: 12, color: C.textMid, cursor: "pointer", fontFamily: "inherit" }}>
              Reset
            </button>
            <button style={{ background: C.primary, border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
              Apply filters
            </button>
          </div>
        </div>

        {/* Sub-tabs */}
        <SubTabs tabs={TABS} active={tab} onChange={setTab} />

        {/* Tab content */}
        {tab === "overview"  && <OverviewTab />}
        {tab === "facility"  && <FacilityTab />}
        {tab === "role"      && <RoleTab />}
        {tab === "time"      && <TimeTab />}
        {tab === "audit"     && <AuditTab />}
      </div>
    </div>
  );
}
