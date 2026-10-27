// ─── Veriyo shared top navigation ────────────────────────────────────────────
import { useState, useRef, useLayoutEffect, useEffect } from "react";

const NAV_STYLE = `
  .nav-bar { padding: 0 20px; }
  .nav-username { display: inline; }
  .nav-role { display: inline-flex; }
  .nav-links-wrap { display: flex; }
  @media (max-width: 600px) {
    .nav-bar { padding: 0 12px; }
    .nav-username { display: none; }
    .nav-role { display: none; }
    .nav-links-wrap { display: none; }
  }
`;


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
/**
 * VeriyoLogo — hexagon icon + "veriyo" wordmark + green dot touching the "o".
 *
 * Uses a DOM ref to measure where the "o" actually renders, then positions
 * the dot precisely at its top-right corner. Falls back to an estimated
 * position on first paint (before measurement).
 */
export function VeriyoLogo({ height = 36, darkText = false }) {
  const textColor = darkText ? "#1a2e24" : "#ffffff";
  const oRef = useRef(null);
  // dot position state: [cx, cy, r] in SVG user units
  const [dot, setDot] = useState({ cx: 336, cy: 16, r: 9 });

  // useLayoutEffect SSR-safe: only runs in browser (no-op on server)
  const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
  useIsomorphicLayoutEffect(() => {
    if (!oRef.current) return;
    try {
      // getExtentOfChar(0) gives the bounding box of the "o" character
      const bb = oRef.current.getExtentOfChar(0);
      // SVG element's own CTM to convert to viewBox coords
      const svg = oRef.current.ownerSVGElement;
      // dot sits at top-right of the "o": x = right edge, y = top edge + r
      const r = bb.height * 0.19;
      setDot({
        cx: bb.x + bb.width + r * 0.1,
        cy: bb.y + r,
        r,
      });
    } catch (e) {
      // getExtentOfChar not supported — keep fallback
    }
  }, [height]);

  const hx = 43, hy = 50, hr = 42;
  const hpts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30);
    return `${hx + hr * Math.cos(a)},${hy + hr * Math.sin(a)}`;
  }).join(" ");

  const FS = 72; // font-size in SVG user units

  return (
    <svg
      viewBox="0 0 360 100"
      height={height}
      width={(360 / 100) * height}
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

      {/* "veriyo" — "veri" + "y" in one span so we can ref just the "o" */}
      <text
        x="100" y="78"
        fontFamily="'Segoe UI Black','Arial Black','Helvetica Neue',sans-serif"
        fontWeight="900"
        fontSize={FS}
        letterSpacing="-1"
        fill={textColor}
      >
        veri
        <tspan>y</tspan>
        <tspan ref={oRef}>o</tspan>
      </text>

      {/* Green dot — measured to sit flush at the top-right of the "o" */}
      <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="#34c274" />
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
    <>
      <style>{NAV_STYLE}</style>
      <div style={s.bar} className="nav-bar">
        <div style={s.left}>
          <VeriyoLogo height={30} darkText={false} />
          <span style={s.divider} />
          <nav style={s.navLinks} className="nav-links-wrap">
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
          <span style={{ ...s.roleBadge, background: roleStyle.bg, color: roleStyle.color }} className="nav-role">
            {roleStyle.label}
          </span>
          <span style={s.userName} className="nav-username">{user?.name}</span>
          <button onClick={onLogout} style={s.logoutBtn}>Sign out</button>
        </div>
      </div>
    </>
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
