// ─── Veriyo shared top navigation ────────────────────────────────────────────

// Hexagon icon with white checkmark — matches the official Veriyo brand logo
export function VeriyoIcon({ size = 32 }) {
  // Regular hexagon: flat-top orientation, centred in viewBox 0 0 100 100
  const cx = 50, cy = 50, r = 46;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points={pts} fill="url(#hexgrad)" />
      <defs>
        <linearGradient id="hexgrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34c274" />
          <stop offset="100%" stopColor="#1a7a4a" />
        </linearGradient>
      </defs>
      {/* Bold white checkmark */}
      <path d="M30 52 L43 65 L70 36" stroke="white" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

// Full wordmark: hexagon icon + "veriyo" text + green dot on the "o"
export function VeriyoLogo({ size = 28 }) {
  return <VeriyoIcon size={size} />;
}

// Combined lockup for wider spaces (marketing site header etc.)
export function VeriyoWordmark({ iconSize = 36, textSize = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <VeriyoIcon size={iconSize} />
      <div style={{ lineHeight: 1 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <span style={{
            fontSize: textSize, fontWeight: 900, color: "#1a2e24",
            fontFamily: "'Segoe UI', system-ui, sans-serif", letterSpacing: "-0.5px",
          }}>veriyo</span>
          {/* Green dot replacing the dot on the "o" — positioned top-right of the wordmark */}
          <span style={{
            position: "absolute", top: 0, right: -5,
            width: textSize * 0.28, height: textSize * 0.28,
            background: "#34c274", borderRadius: "50%", display: "block",
          }} />
        </div>
      </div>
    </div>
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
        <VeriyoIcon size={28} />
        <div style={{ lineHeight: 1, position: "relative" }}>
          <span style={s.logoText}>veriyo</span>
          <span style={{
            position: "absolute", top: -1, right: -7,
            width: 7, height: 7, background: "#34c274", borderRadius: "50%",
          }} />
        </div>
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
