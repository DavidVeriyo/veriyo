// ─── Veriyo shared top navigation ────────────────────────────────────────────
export function VeriyoLogo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="url(#vgnav)" />
      <defs>
        <linearGradient id="vgnav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22a060" />
          <stop offset="100%" stopColor="#1a7a4a" />
        </linearGradient>
      </defs>
      <path d="M12 13 L20 27 L28 13" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

const ROLE_COLOURS = {
  "Admin":               { bg: "#fef3c7", color: "#92400e", label: "Super Admin" },
  "Super Admin":         { bg: "#fef3c7", color: "#92400e", label: "Super Admin" },
  "HR Manager":          { bg: "#e8f5ee", color: "#1a7a4a", label: "HR Manager" },
  "Compliance Officer":  { bg: "#ede9fe", color: "#5b21b6", label: "Compliance Officer" },
  "Recruiter":           { bg: "#fef9c3", color: "#854d0e", label: "Recruiter" },
  "Hiring Manager":      { bg: "#e0f2fe", color: "#0369a1", label: "Hiring Manager" },
};

// sections: "dashboard" | "reports" | "settings"
export default function Nav({ user, section, onSection, onLogout }) {
  const roleStyle = ROLE_COLOURS[user?.role] || { bg: "#f1f5f9", color: "#475569", label: user?.role };
  const canAccessSettings = ["Admin", "Super Admin"].includes(user?.role);

  const navItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "reports",   label: "Reports" },
    ...(canAccessSettings ? [{ id: "settings", label: "Settings" }] : []),
  ];

  return (
    <div style={s.bar}>
      <div style={s.left}>
        <VeriyoLogo size={26} />
        <span style={s.logoText}>Veriyo</span>
        <span style={s.divider} />
        <nav style={s.navLinks}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onSection(item.id)}
              style={s.navLink(section === item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div style={s.right}>
        <span style={{ ...s.roleBadge, background: roleStyle.bg, color: roleStyle.color }}>
          {roleStyle.label}
        </span>
        <span style={s.userName}>{user?.name}</span>
        <button onClick={onLogout} style={s.logoutBtn}>Sign out</button>
      </div>
    </div>
  );
}

const s = {
  bar: {
    height: 52,
    background: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    position: "sticky",
    top: 0,
    zIndex: 999,
    gap: 16,
  },
  left: { display: "flex", alignItems: "center", gap: 10 },
  logoText: { color: "#fff", fontWeight: 700, fontSize: 16 },
  divider: { width: 1, height: 20, background: "rgba(255,255,255,.15)", margin: "0 6px", flexShrink: 0 },
  navLinks: { display: "flex", gap: 2 },
  navLink: (active) => ({
    background: active ? "rgba(255,255,255,.12)" : "transparent",
    border: "none",
    borderRadius: 6,
    color: active ? "#fff" : "#94a3b8",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    padding: "5px 12px",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "all .15s",
  }),
  right: { display: "flex", alignItems: "center", gap: 10 },
  roleBadge: {
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: 20,
  },
  userName: { color: "#94a3b8", fontSize: 13 },
  logoutBtn: {
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.15)",
    borderRadius: 6,
    color: "#94a3b8",
    fontSize: 13,
    padding: "5px 12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
