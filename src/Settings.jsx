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

const ROLES_LIST = ["Super Admin", "HR Manager", "Compliance Officer", "Recruiter", "Hiring Manager", "Employee (self-service)", "Recruiter (external)"];

// ─── Shared small components ──────────────────────────────────────────────────
function SectionHeader({ title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: "-0.4px" }}>{title}</div>
      {sub && <div style={{ fontSize: 13, color: C.textMuted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 22px", marginBottom: 20, ...style }}>
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>{children}</div>;
}

function CardSub({ children }) {
  return <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>{children}</div>;
}

function FieldInput({ placeholder, type = "text", value, onChange, style }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        flex: 1, minWidth: 100, background: C.white, border: `1.5px solid ${C.border}`,
        borderRadius: 8, padding: "7px 12px", fontFamily: "inherit", fontSize: 13, color: C.text, outline: "none", ...style,
      }}
    />
  );
}

function PrimaryBtn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: C.primary, border: "none", borderRadius: 8, padding: "8px 16px",
      fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer", fontFamily: "inherit", flexShrink: 0, ...style,
    }}>
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 14px",
      fontSize: 12, fontWeight: 500, color: C.textMid, cursor: "pointer", fontFamily: "inherit", ...style,
    }}>
      {children}
    </button>
  );
}

function Badge({ children, bg, color }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: bg || C.greenBg, color: color || C.green, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

// ─── Permission cell helpers ──────────────────────────────────────────────────
const Ck = () => <span style={{ color: C.green, fontSize: 15, fontWeight: 700 }}>✓</span>;
const Cx = () => <span style={{ color: C.textMuted, fontSize: 14 }}>—</span>;
const Ch = ({ children }) => <span style={{ color: C.amber, fontSize: 11, fontWeight: 600 }}>{children}</span>;

// ─── Users & Access ───────────────────────────────────────────────────────────
function UsersPanel() {
  const [inviteName, setInviteName]   = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole]   = useState("");
  const [search, setSearch]           = useState("");

  const [users, setUsers] = useState([
    { id: 1, initials: "DT", name: "David Truong",     email: "david@veriyo.com.au",           role: "Super Admin",        active: true,  lastLogin: "Today",       isSelf: true },
    { id: 2, initials: "SC", name: "Sarah Chen",       email: "sarah.chen@hammondcare.com.au", role: "HR Manager",         active: true,  lastLogin: "Today" },
    { id: 3, initials: "LP", name: "Luke Patterson",   email: "luke.p@hammondcare.com.au",     role: "Recruiter",          active: true,  lastLogin: "Yesterday" },
    { id: 4, initials: "RK", name: "Dr. Rachel Kim",   email: "r.kim@hammondcare.com.au",      role: "Hiring Manager",     active: true,  lastLogin: "3 days ago" },
    { id: 5, initials: "MN", name: "Mohammed Nasser",  email: "m.nasser@hammondcare.com.au",   role: "Compliance Officer", active: true,  lastLogin: "1 week ago" },
    { id: 6, initials: "JB", name: "Jane Bell",        email: "j.bell@hammondcare.com.au",     role: "Recruiter",          active: false, lastLogin: "Invite pending" },
  ]);

  const AVATAR_COLOURS = [
    { bg: "#fef3c7", color: "#92400e" },
    { bg: "#ede9fe", color: "#5b21b6" },
    { bg: "#fef9c3", color: "#854d0e" },
    { bg: "#e0f2fe", color: "#0369a1" },
    { bg: "#e8f5ee", color: "#1a7a4a" },
    { bg: "#f1f5f9", color: "#475569" },
  ];

  const filtered = users.filter(u =>
    !search ||
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function changeRole(id, newRole) {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
  }

  const sel = {
    background: "#f4f8f6", border: `1px solid ${C.border}`, borderRadius: 6, padding: "4px 8px",
    fontFamily: "inherit", fontSize: 11, fontWeight: 600, color: C.textMid, cursor: "pointer", outline: "none",
  };

  return (
    <>
      <SectionHeader title="Users & Access" sub="Manage who can access Veriyo and their permission level" />

      {/* Invite form */}
      <Card>
        <CardTitle>Invite a new user</CardTitle>
        <CardSub>They'll receive an email to set up their account</CardSub>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <FieldInput placeholder="Full name" value={inviteName} onChange={e => setInviteName(e.target.value)} />
          <FieldInput placeholder="Email address" type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
          <select style={{ ...sel, minWidth: 160, padding: "7px 12px", fontSize: 13, flex: "1 1 150px" }} value={inviteRole} onChange={e => setInviteRole(e.target.value)}>
            <option value="">Select role…</option>
            {ROLES_LIST.map(r => <option key={r}>{r}</option>)}
          </select>
          <select style={{ ...sel, minWidth: 150, padding: "7px 12px", fontSize: 13, flex: "1 1 140px" }}>
            <option>All facilities</option>
            <option>Northern Campus</option>
            <option>Eastern House</option>
            <option>Western Lodge</option>
          </select>
          <PrimaryBtn style={{ padding: "7px 16px", fontSize: 13 }}>Send invite</PrimaryBtn>
        </div>
      </Card>

      {/* User list */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div>
            <CardTitle>Active users</CardTitle>
            <div style={{ fontSize: 12, color: C.textMuted }}>6 users · 1 pending invite</div>
          </div>
          <FieldInput placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 180, flex: "none" }} />
        </div>

        {filtered.map((u, i) => {
          const ac = AVATAR_COLOURS[i % AVATAR_COLOURS.length];
          return (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}`, opacity: u.active ? 1 : 0.65 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: ac.bg, color: ac.color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {u.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{u.name}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{u.email} · {u.lastLogin}</div>
              </div>
              {u.isSelf ? (
                <Badge bg="#fef3c7" color="#92400e">Super Admin</Badge>
              ) : (
                <select style={sel} value={u.role} onChange={e => changeRole(u.id, e.target.value)} disabled={!u.active}>
                  {ROLES_LIST.map(r => <option key={r}>{r}</option>)}
                </select>
              )}
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: u.active ? C.green : C.textMuted, flexShrink: 0 }} title={u.active ? "Active" : "Pending"} />
              {!u.isSelf && (
                <GhostBtn style={{ fontSize: 11, padding: "3px 10px" }}>
                  {u.active ? "Edit" : "Resend"}
                </GhostBtn>
              )}
            </div>
          );
        })}
      </Card>
    </>
  );
}

// ─── Role Permissions matrix ──────────────────────────────────────────────────
function RolesPanel() {
  const cols = ["Super Admin", "HR Manager", "Compliance Officer", "Recruiter", "Hiring Manager"];

  const sections = [
    {
      label: "Workers",
      rows: [
        { label: "View all workers",  cells: [<Ck/>, <Ck/>, <Ck/>, <Cx/>, <Ch>Own facility</Ch>] },
        { label: "Add / edit workers",cells: [<Ck/>, <Ck/>, <Cx/>, <Cx/>, <Cx/>] },
        { label: "Deactivate workers",cells: [<Ck/>, <Ck/>, <Cx/>, <Cx/>, <Cx/>] },
      ],
    },
    {
      label: "Compliance",
      rows: [
        { label: "View compliance status", cells: [<Ck/>, <Ck/>, <Ck/>, <Ch>Read-only</Ch>, <Ch>Own facility</Ch>] },
        { label: "Upload documents",       cells: [<Ck/>, <Ck/>, <Ck/>, <Ch>Candidates only</Ch>, <Cx/>] },
        { label: "Approve / reject checks",cells: [<Ck/>, <Ck/>, <Ck/>, <Cx/>, <Cx/>] },
        { label: "Override check status",  cells: [<Ck/>, <Cx/>, <Cx/>, <Cx/>, <Cx/>] },
      ],
    },
    {
      label: "Candidates & Recruitment",
      rows: [
        { label: "View all candidates",    cells: [<Ck/>, <Ck/>, <Cx/>, <Ch>My candidates</Ch>, <Cx/>] },
        { label: "Add / manage candidates",cells: [<Ck/>, <Ck/>, <Cx/>, <Ck/>, <Cx/>] },
      ],
    },
    {
      label: "Reports & Analytics",
      rows: [
        { label: "View reports",   cells: [<Ck/>, <Ck/>, <Ck/>, <Cx/>, <Ch>Own facility</Ch>] },
        { label: "Export reports", cells: [<Ck/>, <Ck/>, <Cx/>, <Cx/>, <Cx/>] },
      ],
    },
    {
      label: "Settings",
      rows: [
        { label: "Manage users & roles",   cells: [<Ck/>, <Cx/>, <Cx/>, <Cx/>, <Cx/>] },
        { label: "Manage facilities",      cells: [<Ck/>, <Ch>View only</Ch>, <Cx/>, <Cx/>, <Cx/>] },
        { label: "Configure check types",  cells: [<Ck/>, <Cx/>, <Cx/>, <Cx/>, <Cx/>] },
        { label: "View audit log",         cells: [<Ck/>, <Ck/>, <Ch>Own changes</Ch>, <Cx/>, <Cx/>] },
        { label: "API access",             cells: [<Ck/>, <Cx/>, <Cx/>, <Cx/>, <Cx/>] },
      ],
    },
  ];

  return (
    <>
      <SectionHeader title="Role Permissions" sub="Control what each role can see and do in Veriyo" />
      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ ...th, minWidth: 180, textAlign: "left" }}>Permission</th>
                {cols.map(c => <th key={c} style={{ ...th, textAlign: "center" }}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {sections.map(sec => (
                <>
                  <tr key={sec.label + "-hdr"}>
                    <td colSpan={6} style={{ background: "#f4f8f6", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: C.textMuted, padding: "7px 16px" }}>
                      {sec.label}
                    </td>
                  </tr>
                  {sec.rows.map((row, ri) => (
                    <tr key={sec.label + ri}>
                      <td style={{ ...td, fontWeight: 500 }}>{row.label}</td>
                      {row.cells.map((cell, ci) => (
                        <td key={ci} style={{ ...td, textAlign: "center" }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

// ─── Facilities ───────────────────────────────────────────────────────────────
function FacilitiesPanel() {
  const rows = [
    { name: "Northern Campus",  location: "Hornsby NSW",     workers: 9, manager: "Dr. Rachel Kim" },
    { name: "Eastern House",    location: "Bondi NSW",       workers: 5, manager: "—" },
    { name: "Western Lodge",    location: "Parramatta NSW",  workers: 4, manager: "—" },
    { name: "Southern Centre",  location: "Sutherland NSW",  workers: 4, manager: "—" },
    { name: "City Clinic",      location: "CBD NSW",         workers: 6, manager: "—" },
    { name: "Blue Haven",       location: "Penrith NSW",     workers: 5, manager: "—" },
    { name: "Riverside Hub",    location: "Rhodes NSW",      workers: 3, manager: "—" },
    { name: "Southgate",        location: "Liverpool NSW",   workers: 3, manager: "—" },
  ];

  return (
    <>
      <SectionHeader title="Facilities" sub="Manage care locations linked to your organisation" />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <CardTitle>8 active facilities</CardTitle>
          <PrimaryBtn>+ Add Facility</PrimaryBtn>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              {["Facility name", "Location", "Workers", "Manager", "Status"].map(h => <th key={h} style={th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={td}><strong>{r.name}</strong></td>
                  <td style={{ ...td, color: C.textMid, fontSize: 12 }}>{r.location}</td>
                  <td style={td}>{r.workers}</td>
                  <td style={{ ...td, color: C.textMid, fontSize: 12 }}>{r.manager}</td>
                  <td style={td}><Badge>Active</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

// ─── Compliance Check Types ───────────────────────────────────────────────────
function ChecksPanel() {
  const rows = [
    { name: "Police Check",                validity: "3 years", applies: "All roles",       reminder: "60 / 30 / 7 days", type: "Mandatory" },
    { name: "NDIS Worker Screening",       validity: "5 years", applies: "NDIS roles",      reminder: "90 / 30 days",     type: "Mandatory" },
    { name: "Working With Children Check", validity: "5 years", applies: "All care roles",  reminder: "60 / 30 days",     type: "Mandatory" },
    { name: "AHPRA Registration",          validity: "1 year",  applies: "Nurses, Physios", reminder: "30 / 14 days",     type: "Mandatory" },
    { name: "First Aid Certificate",       validity: "3 years", applies: "Senior roles",    reminder: "30 days",          type: "Recommended" },
    { name: "Driver's Licence",            validity: "Varies",  applies: "Mobile workers",  reminder: "30 days",          type: "Role-dependent" },
  ];

  const badgeFor = (t) => t === "Mandatory"
    ? { bg: C.greenBg, color: C.green }
    : t === "Recommended"
    ? { bg: C.amberBg, color: C.amber }
    : { bg: "#f1f5f9", color: "#475569" };

  return (
    <>
      <SectionHeader title="Compliance Check Types" sub="Configure which checks are required per role and when reminders fire" />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <CardTitle>Configured check types</CardTitle>
          <PrimaryBtn>+ Add Check Type</PrimaryBtn>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              {["Check name", "Validity period", "Applies to", "Reminder (days before)", "Required"].map(h => <th key={h} style={th}>{h}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((r, i) => {
                const b = badgeFor(r.type);
                return (
                  <tr key={i}>
                    <td style={td}><strong>{r.name}</strong></td>
                    <td style={{ ...td, color: C.textMid, fontSize: 12 }}>{r.validity}</td>
                    <td style={{ ...td, color: C.textMid, fontSize: 12 }}>{r.applies}</td>
                    <td style={{ ...td, color: C.textMid, fontSize: 12 }}>{r.reminder}</td>
                    <td style={td}><Badge bg={b.bg} color={b.color}>{r.type}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

// ─── Organisation Profile ─────────────────────────────────────────────────────
function OrgPanel() {
  return (
    <>
      <SectionHeader title="Organisation Profile" sub="HammondCare · ABN 42 052 712 085" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <CardTitle>Organisation details</CardTitle>
          <CardSub>Used on reports and communications</CardSub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["Organisation name", "HammondCare"], ["ABN", "42 052 712 085"]].map(([lbl, val]) => (
              <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: C.textMuted }}>{lbl}</span>
                <input defaultValue={val} style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", fontFamily: "inherit", fontSize: 13, color: C.text, outline: "none" }} />
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", color: C.textMuted }}>Industry</span>
              <select style={{ background: C.bg, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", fontFamily: "inherit", fontSize: 13, color: C.text, outline: "none" }}>
                <option>Aged Care</option><option>NDIS / Disability</option><option>Early Learning</option>
              </select>
            </div>
            <PrimaryBtn style={{ alignSelf: "flex-start", marginTop: 4 }}>Save changes</PrimaryBtn>
          </div>
        </Card>
        <Card>
          <CardTitle>Veriyo plan</CardTitle>
          <CardSub>Current subscription</CardSub>
          <div style={{ background: C.primaryXLight, borderRadius: 8, padding: 14, marginBottom: 14 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.primary }}>Professional</div>
            <div style={{ fontSize: 12, color: C.textMid, marginTop: 3 }}>Up to 50 workers · 10 users · Unlimited facilities</div>
          </div>
          <div style={{ fontSize: 12, color: C.textMuted }}>
            Next billing: 1 November 2026 · <a href="#" style={{ color: C.primary, textDecoration: "none" }}>Manage billing</a>
          </div>
        </Card>
      </div>
    </>
  );
}

// ─── Integrations ─────────────────────────────────────────────────────────────
function IntegrationsPanel() {
  const integrations = [
    { icon: "📅", name: "Google Workspace",         desc: "Sync users and calendar reminders",      bg: "#e8f0fe", action: "Connect" },
    { icon: "💼", name: "Employment Hero / KeyPay", desc: "Sync worker roster and payroll data",     bg: "#e0f2fe", action: "Connect" },
    { icon: "🏛️", name: "NDIS Commission Portal",   desc: "Auto-check worker screening status",     bg: "#f0fdf4", action: "Connect" },
    { icon: "🔗", name: "Veriyo API",               desc: "Custom integrations via REST API",        bg: "#fdf4ff", action: "View docs" },
  ];

  return (
    <>
      <SectionHeader title="Integrations" sub="Connect Veriyo to your existing systems" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {integrations.map((it, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 0 }}>
            <div style={{ width: 40, height: 40, background: it.bg, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              {it.icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{it.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{it.desc}</div>
            </div>
            {it.action === "Connect"
              ? <PrimaryBtn style={{ padding: "6px 14px", fontSize: 12 }}>Connect</PrimaryBtn>
              : <GhostBtn style={{ fontSize: 12 }}>View docs</GhostBtn>
            }
          </Card>
        ))}
      </div>
    </>
  );
}

// ─── Notifications ────────────────────────────────────────────────────────────
function NotificationsPanel() {
  const triggers = [
    "Check expires in 90 days",
    "Check expires in 60 days",
    "Check expires in 30 days",
    "Check expires in 7 days",
    "Check has expired",
    "Worker blocked from roster",
  ];

  const defaults = {
    worker: [true, true, true, true, true, true],
    hr:     [false, true, true, true, true, true],
    hiring: [false, false, false, true, true, true],
  };

  return (
    <>
      <SectionHeader title="Notification Settings" sub="Control who gets alerted and when" />
      <Card>
        <CardTitle>Expiry reminders</CardTitle>
        <CardSub>Automated alerts sent when checks are approaching expiry</CardSub>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>
              <th style={th}>Trigger</th>
              <th style={{ ...th, textAlign: "center" }}>Notify worker</th>
              <th style={{ ...th, textAlign: "center" }}>Notify HR</th>
              <th style={{ ...th, textAlign: "center" }}>Notify Hiring Manager</th>
            </tr></thead>
            <tbody>
              {triggers.map((t, i) => (
                <tr key={i}>
                  <td style={td}>{t}</td>
                  <td style={{ ...td, textAlign: "center" }}><input type="checkbox" defaultChecked={defaults.worker[i]} /></td>
                  <td style={{ ...td, textAlign: "center" }}><input type="checkbox" defaultChecked={defaults.hr[i]} /></td>
                  <td style={{ ...td, textAlign: "center" }}><input type="checkbox" defaultChecked={defaults.hiring[i]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PrimaryBtn style={{ marginTop: 16 }}>Save preferences</PrimaryBtn>
      </Card>
    </>
  );
}

// ─── Shared table styles ──────────────────────────────────────────────────────
const th = {
  padding: "9px 14px", fontSize: 11, fontWeight: 700, color: C.textMuted,
  textTransform: "uppercase", letterSpacing: ".5px", textAlign: "left",
  background: "#f4f8f6", borderBottom: `1px solid ${C.border}`,
};
const td = { padding: "11px 14px", fontSize: 13, color: C.text, borderBottom: `1px solid ${C.borderLight}`, verticalAlign: "middle" };

// ─── Sidebar nav items ────────────────────────────────────────────────────────
const NAV = [
  { id: "users",         label: "Users & Access",     icon: "👥" },
  { id: "roles",         label: "Role Permissions",   icon: "🛡️" },
  { id: "facilities",    label: "Facilities",         icon: "🏠" },
  { id: "checks",        label: "Compliance Checks",  icon: "📋" },
  { id: "org",           label: "Organisation Profile", icon: "🏢" },
  { id: "integrations",  label: "Integrations",       icon: "🔗" },
  { id: "notifications", label: "Notifications",      icon: "🔔" },
];

// ─── Main Settings component ──────────────────────────────────────────────────
export default function Settings({ user, onSection, onLogout }) {
  const [active, setActive] = useState("users");

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text }}>
      <Nav user={user} section="settings" onSection={onSection} onLogout={onLogout} />

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 52px)" }}>
        {/* Sidebar */}
        <aside style={{ background: C.white, borderRight: `1px solid ${C.border}`, padding: "20px 12px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.textMuted, padding: "4px 10px", marginBottom: 6 }}>
            Organisation
          </div>
          {NAV.slice(0, 4).map(n => (
            <button key={n.id} onClick={() => setActive(n.id)} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", textAlign: "left",
              background: active === n.id ? C.primaryXLight : "transparent", color: active === n.id ? C.primary : C.textMid,
              fontSize: 13, fontWeight: active === n.id ? 700 : 400, cursor: "pointer", fontFamily: "inherit", marginBottom: 2,
            }}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
          <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: C.textMuted, padding: "14px 10px 6px", marginBottom: 6 }}>
            Account
          </div>
          {NAV.slice(4).map(n => (
            <button key={n.id} onClick={() => setActive(n.id)} style={{
              display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", textAlign: "left",
              background: active === n.id ? C.primaryXLight : "transparent", color: active === n.id ? C.primary : C.textMid,
              fontSize: 13, fontWeight: active === n.id ? 700 : 400, cursor: "pointer", fontFamily: "inherit", marginBottom: 2,
            }}>
              <span>{n.icon}</span>{n.label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main style={{ padding: "28px 32px", maxWidth: 900 }}>
          {active === "users"         && <UsersPanel />}
          {active === "roles"         && <RolesPanel />}
          {active === "facilities"    && <FacilitiesPanel />}
          {active === "checks"        && <ChecksPanel />}
          {active === "org"           && <OrgPanel />}
          {active === "integrations"  && <IntegrationsPanel />}
          {active === "notifications" && <NotificationsPanel />}
        </main>
      </div>
    </div>
  );
}
