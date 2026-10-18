// ─── Veriyo shared top navigation ────────────────────────────────────────────

// Hexagon icon only (used standalone in tight spaces)
export function VeriyoIcon({ size = 32 }) {
  const cx = 50, cy = 50, r = 46;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="hexgrad" x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34c274" />
          <stop offset="100%" stopColor="#1a7a4a" />
        </linearGradient>
      </defs>
      <polygon points={pts} fill="url(#hexgrad)" />
      <path d="M29 52 L43 66 L71 35" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/**
 * Full brand lockup as a single SVG — hexagon + "veriyo" wordmark + green dot
 * The dot sits flush on the top-right of the "o", exactly like the brand logo.
 *
 * height prop scales the whole lockup. Default 36 ≈ nav bar size.
 * darkText=false renders the wordmark white (for dark backgrounds).
 */
export function VeriyoLogo({ height = 36, darkText = false }) {
  // ViewBox: 340 wide × 100 tall. Hexagon occupies left ~100px, text right of it.
  const textColor = darkText ? "#1a2e24" : "#ffffff";
  // Hexagon points (same proportions as VeriyoIcon, scaled to 86×100 within the 340×100 box)
  const hx = 43, hy = 50, hr = 42;
  const hpts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${hx + hr * Math.cos(a)},${hy + hr * Math.sin(a)}`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 340 100"
      height={height}
      width={(340 / 100) * height}
      fill="none"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="vhg" x1="5" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34c274" />
          <stop offset="100%" stopColor="#1a7a4a" />
        </linearGradient>
      </defs>

      {/* Hexagon */}
      <polygon points={hpts} fill="url(#vhg)" />
      <path d="M25 52 L38 66 L62 35" stroke="white" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Wordmark "veriyo" — heavy weight, tight tracking */}
      <text
        x="100" y="74"
        fontFamily="'Segoe UI Black','Arial Black',system-ui,sans-serif"
        fontWeight="900"
        fontSize="68"
        letterSpacing="-2"
        fill={textColor}
      >veriyo</text>

      {/* Green dot — sits top-right of the "o", touching it snugly */}
      <circle cx="330" cy="14" r="13" fill="#34c274" />
    </svg>
  );
}

// Keep VeriyoWordmark as alias for legacy use
export function VeriyoWordmark({ height = 36, darkText = false }) {
  return <VeriyoLogo height={height} darkText={darkText} />;
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
        <VeriyoLogo height={30} darkText={false} />
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
