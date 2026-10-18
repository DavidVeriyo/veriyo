import { useState, useRef } from "react";

// ─── VERIYO COMPLIANCE DASHBOARD ─────────────────────────────────────────────
// Full dashboard wrapped with a logout bar at the top

export default function Dashboard({ user, onLogout }) {
  return (
    <div>
      {/* Top bar with logout */}
      <div style={barStyles.bar}>
        <div style={barStyles.left}>
          <div style={barStyles.logo}>V</div>
          <span style={barStyles.logoText}>Veriyo</span>
          <span style={barStyles.divider}>|</span>
          <span style={barStyles.userName}>
            {user?.name} · <span style={barStyles.userRole}>{user?.role}</span>
          </span>
        </div>
        <button onClick={onLogout} style={barStyles.logoutBtn}>
          Sign out
        </button>
      </div>
      {/* The full compliance dashboard below */}
      <VeriyoDashboard />
    </div>
  );
}

const barStyles = {
  bar: {
    height: "52px",
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "26px",
    height: "26px",
    borderRadius: "6px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "16px",
  },
  divider: {
    color: "#475569",
    fontSize: "16px",
  },
  userName: {
    color: "#94a3b8",
    fontSize: "13px",
  },
  userRole: {
    color: "#64748b",
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "6px",
    color: "#94a3b8",
    fontSize: "13px",
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};


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
  blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  purple: "#7c3aed", purpleBg: "#f5f3ff", purpleBorder: "#ddd6fe",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
  teal: "#0e7490", tealBg: "#ecfeff", tealBorder: "#a5f3fc",
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
  const fileRef = useRef();

  const filtered = WORKERS.filter(w => {
    if (filterStatus !== "all" && w.status !== filterStatus) return false;
    if (filterSector !== "all" && w.sector !== filterSector) return false;
    if (filterFacility !== "all" && w.facilityId !== filterFacility) return false;
    if (search && !w.name.toLowerCase().includes(search.toLowerCase()) && !w.role.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: WORKERS.length,
    compliant: WORKERS.filter(w => w.status === "compliant").length,
    risk: WORKERS.filter(w => w.status === "risk").length,
    attention: WORKERS.filter(w => w.status === "attention").length,
    inprogress: WORKERS.filter(w => w.status === "inprogress").length,
  };

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
          <div style={s.tabs}>
            {["overview", "workers", "documents"].map(t => (
              <button key={t} style={s.tab(activeTab === t)} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={s.main}>
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
