import React, { useState } from "react";
import { VeriyoLogo as VeriyoLogoSVG } from "./Nav";

// Shared illustration wrapper
function IllustrationWrap({ children, bg = "#f0f9f4" }) {
  return (
    <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
        {/* soft background circle */}
        <circle cx="140" cy="105" r="82" fill="#e0f0e8" />
        {children}
      </svg>
    </div>
  );
}

// Aged Care: worker gently holding hands with elderly resident
function AgedCareIllustration() {
  return (
    <IllustrationWrap>
      {/* Elderly person (left) */}
      {/* head + white hair */}
      <circle cx="90" cy="82" r="18" fill="#f5c5a3" />
      <path d="M72 74 Q90 58 108 74" fill="#d1d5db" />
      <ellipse cx="90" cy="68" rx="18" ry="10" fill="#d1d5db" />
      {/* glasses */}
      <circle cx="84" cy="82" r="5" fill="none" stroke="#6b7280" strokeWidth="1.5" />
      <circle cx="96" cy="82" r="5" fill="none" stroke="#6b7280" strokeWidth="1.5" />
      <line x1="89" y1="82" x2="91" y2="82" stroke="#6b7280" strokeWidth="1.5" />
      {/* smile */}
      <path d="M86 88 Q90 92 94 88" stroke="#c084a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* body - pink top */}
      <path d="M70 100 Q90 95 110 100 L112 150 L68 150Z" fill="#f9a8d4" />
      {/* grey trousers */}
      <rect x="72" y="148" width="16" height="28" rx="6" fill="#9ca3af" />
      <rect x="90" y="148" width="16" height="28" rx="6" fill="#9ca3af" />
      {/* walking cane */}
      <line x1="108" y1="120" x2="115" y2="178" stroke="#6b7280" strokeWidth="3" strokeLinecap="round" />
      <path d="M105 120 Q108 115 113 118" stroke="#6b7280" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* arm reaching right */}
      <path d="M108 110 Q120 108 128 115" stroke="#f5c5a3" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="130" cy="116" r="6" fill="#f5c5a3" />

      {/* Care worker (right) */}
      {/* head */}
      <circle cx="188" cy="76" r="20" fill="#c8956c" />
      {/* dark hair */}
      <path d="M168 68 Q188 52 208 68 Q208 58 188 54 Q168 58 168 68Z" fill="#374151" />
      {/* smile */}
      <path d="M182 82 Q188 87 194 82" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* body - green uniform */}
      <path d="M166 98 Q188 92 210 98 L214 158 L162 158Z" fill="#1a7a4a" />
      {/* collar detail */}
      <path d="M180 98 L188 108 L196 98" fill="#166840" />
      {/* navy trousers */}
      <rect x="168" y="156" width="18" height="24" rx="6" fill="#1e3a5f" />
      <rect x="188" y="156" width="18" height="24" rx="6" fill="#1e3a5f" />
      {/* arm reaching left */}
      <path d="M166 108 Q152 110 144 118" stroke="#c8956c" strokeWidth="7" strokeLinecap="round" fill="none" />
      <circle cx="142" cy="119" r="6" fill="#c8956c" />

      {/* Joined hands in middle */}
      <ellipse cx="136" cy="118" rx="10" ry="7" fill="#f5c5a3" opacity="0.8" />

      {/* Heart */}
      <path d="M134 58 C134 54 128 50 128 56 C128 62 134 66 134 66 C134 66 140 62 140 56 C140 50 134 54 134 58Z" fill="#f472b6" />

      {/* compliance badge bottom right */}
      <rect x="210" y="138" width="44" height="28" rx="8" fill="#fff" />
      <path d="M218 148 L222 153 L230 144" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="233" y="147" width="16" height="3" rx="1.5" fill="#d1d5db" />
      <rect x="233" y="153" width="11" height="3" rx="1.5" fill="#d1d5db" />

      {/* sparkles */}
      <circle cx="52" cy="60" r="3" fill="#22c55e" opacity="0.6" />
      <circle cx="46" cy="72" r="2" fill="#22c55e" opacity="0.4" />
      <circle cx="230" cy="60" r="2.5" fill="#1a7a4a" opacity="0.5" />
    </IllustrationWrap>
  );
}

// NDIS: support worker alongside wheelchair user, both looking at tablet
function NDISIllustration() {
  return (
    <IllustrationWrap bg="#f0f7ff">
      {/* background circle override */}
      <circle cx="140" cy="105" r="82" fill="#dbeafe" />

      {/* Wheelchair */}
      <circle cx="100" cy="162" r="18" fill="none" stroke="#3b82f6" strokeWidth="3" />
      <circle cx="100" cy="162" r="5" fill="#3b82f6" />
      {/* spokes */}
      <line x1="100" y1="144" x2="100" y2="162" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="82" y1="162" x2="100" y2="162" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="87" y1="149" x2="100" y2="162" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="113" y1="149" x2="100" y2="162" stroke="#3b82f6" strokeWidth="1.5" />
      {/* small front wheel */}
      <circle cx="130" cy="162" r="10" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
      <circle cx="130" cy="162" r="3" fill="#3b82f6" />
      {/* seat + back */}
      <rect x="96" y="128" width="40" height="8" rx="4" fill="#93c5fd" /> {/* seat */}
      <rect x="134" y="108" width="8" height="28" rx="4" fill="#93c5fd" /> {/* back */}
      {/* footrest */}
      <line x1="96" y1="148" x2="86" y2="160" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="86" y1="160" x2="96" y2="160" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
      {/* armrest */}
      <line x1="96" y1="120" x2="96" y2="136" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />

      {/* Person in wheelchair */}
      <circle cx="114" cy="94" r="16" fill="#f5c5a3" />
      <path d="M98 86 Q114 72 130 86 Q128 78 114 76 Q100 78 98 86Z" fill="#374151" />
      <path d="M100 86 Q114 80 128 86" fill="#374151" />
      <path d="M98 110 Q114 104 130 110 L132 134 L96 134Z" fill="#7c3aed" />
      <path d="M104 110 Q106 125 100 134" stroke="#6d28d9" strokeWidth="2" fill="none" />
      {/* legs resting on footrest */}
      <path d="M100 134 Q94 148 88 158" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M118 134 Q112 148 106 158" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Support worker (standing right) */}
      <circle cx="190" cy="82" r="18" fill="#c8956c" />
      <path d="M172 74 Q190 58 208 74 Q206 64 190 62 Q174 64 172 74Z" fill="#1e3a5f" />
      <path d="M172 100 Q190 94 208 100 L210 152 L170 152Z" fill="#1a7a4a" />
      <rect x="174" y="150" width="14" height="22" rx="6" fill="#1e3a5f" />
      <rect x="192" y="150" width="14" height="22" rx="6" fill="#1e3a5f" />
      {/* arm pointing at tablet */}
      <path d="M172 112 Q155 118 148 124" stroke="#c8956c" strokeWidth="7" strokeLinecap="round" fill="none" />

      {/* Tablet between them */}
      <rect x="138" y="116" width="32" height="42" rx="4" fill="#fff" stroke="#d1d5db" strokeWidth="2" />
      <rect x="141" y="120" width="26" height="30" rx="2" fill="#dbeafe" />
      {/* screen content - checkmarks */}
      <path d="M145 128 L147 131 L153 125" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M145 136 L147 139 L153 133" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="156" y="127" width="9" height="2.5" rx="1.2" fill="#93c5fd" />
      <rect x="156" y="135" width="7" height="2.5" rx="1.2" fill="#93c5fd" />
      <path d="M145 143 L147 146 L151 141" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="154" y="142" width="11" height="2.5" rx="1.2" fill="#fcd34d" />

      {/* person in wheelchair arm reaching to tablet */}
      <path d="M128 116 Q136 118 140 122" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* sparkle */}
      <path d="M60 72 L62 78 L68 78 L63 82 L65 88 L60 84 L55 88 L57 82 L52 78 L58 78Z" fill="#3b82f6" opacity="0.5" />
      <circle cx="222" cy="68" r="3" fill="#1a7a4a" opacity="0.5" />
    </IllustrationWrap>
  );
}

// Early Learning: educator on floor with toddlers
function EarlyLearningIllustration() {
  return (
    <IllustrationWrap bg="#fff8f0">
      <circle cx="140" cy="105" r="82" fill="#fed7aa" opacity="0.6" />

      {/* Floor mat */}
      <ellipse cx="140" cy="170" rx="85" ry="14" fill="#fde68a" opacity="0.7" />

      {/* Educator (centre, seated/kneeling) */}
      <circle cx="140" cy="88" r="19" fill="#a16207" />
      {/* hair bun */}
      <ellipse cx="140" cy="70" rx="16" ry="10" fill="#92400e" />
      <circle cx="152" cy="68" r="6" fill="#92400e" />
      {/* smile */}
      <path d="M134 94 Q140 100 146 94" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* eyes */}
      <circle cx="135" cy="88" r="2.5" fill="#fff" />
      <circle cx="145" cy="88" r="2.5" fill="#fff" />
      <circle cx="135.8" cy="88.8" r="1.5" fill="#1e3a5f" />
      <circle cx="145.8" cy="88.8" r="1.5" fill="#1e3a5f" />
      {/* body - pink top */}
      <path d="M120 108 Q140 102 160 108 L162 155 L118 155Z" fill="#ec4899" />
      {/* skirt */}
      <path d="M118 150 Q140 158 162 150 L165 175 L115 175Z" fill="#f472b6" />
      {/* arms out to sides with kids */}
      <path d="M120 115 Q104 118 96 124" stroke="#a16207" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M160 115 Q176 118 184 124" stroke="#a16207" strokeWidth="8" strokeLinecap="round" fill="none" />

      {/* Toddler left */}
      <circle cx="76" cy="118" r="13" fill="#f5c5a3" />
      {/* pigtails */}
      <circle cx="66" cy="108" r="6" fill="#fbbf24" />
      <circle cx="86" cy="108" r="6" fill="#fbbf24" />
      <ellipse cx="76" cy="108" rx="13" ry="8" fill="#fbbf24" />
      <path d="M70 124 Q76 128 82 124" stroke="#c084a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M62 132 Q76 128 90 132 L90 162 L62 162Z" fill="#a78bfa" />
      <rect x="65" y="160" width="10" height="16" rx="5" fill="#7c3aed" />
      <rect x="78" y="160" width="10" height="16" rx="5" fill="#7c3aed" />
      {/* arm up toward educator */}
      <path d="M88 136 Q92 128 96 124" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Toddler right */}
      <circle cx="202" cy="118" r="13" fill="#f5c5a3" />
      {/* curly hair */}
      <ellipse cx="202" cy="108" rx="14" ry="9" fill="#1e3a5f" />
      <circle cx="192" cy="110" r="5" fill="#1e3a5f" />
      <circle cx="212" cy="110" r="5" fill="#1e3a5f" />
      <circle cx="197" cy="106" r="4" fill="#1e3a5f" />
      <circle cx="207" cy="106" r="4" fill="#1e3a5f" />
      <path d="M196 124 Q202 128 208 124" stroke="#c084a0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* body */}
      <path d="M188 132 Q202 128 216 132 L216 162 L188 162Z" fill="#34d399" />
      <rect x="191" y="160" width="10" height="16" rx="5" fill="#059669" />
      <rect x="204" y="160" width="10" height="16" rx="5" fill="#059669" />
      {/* arm up */}
      <path d="M188 136 Q185 128 184 124" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Book on mat */}
      <rect x="120" y="162" width="40" height="28" rx="4" fill="#fbbf24" />
      <rect x="122" y="164" width="18" height="24" rx="3" fill="#f97316" />
      <rect x="142" y="164" width="16" height="24" rx="3" fill="#fb923c" />
      <line x1="140" y1="164" x2="140" y2="188" stroke="#92400e" strokeWidth="1.5" />

      {/* Stars */}
      <path d="M54 84 L56 90 L62 90 L57 94 L59 100 L54 96 L49 100 L51 94 L46 90 L52 90Z" fill="#fbbf24" opacity="0.7" />
      <circle cx="226" cy="78" r="4" fill="#ec4899" opacity="0.5" />
      <circle cx="234" cy="90" r="2.5" fill="#a78bfa" opacity="0.6" />
    </IllustrationWrap>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "18px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#0f172a", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 18, color: "#1a7a4a", fontWeight: 700, flexShrink: 0, lineHeight: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div style={{ padding: "0 20px 18px", fontSize: 14, color: "#475569", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

export default function Website({ onLogin }) {
  const [demoEmail, setDemoEmail] = useState("");
  const [demoName, setDemoName] = useState("");
  const [demoOrg, setDemoOrg] = useState("");
  const [demoPhone, setDemoPhone] = useState("");
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  async function handleDemoRequest(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://formspree.io/f/xljjryvp", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({ name: demoName, organisation: demoOrg, email: demoEmail, phone: demoPhone || "Not provided" }),
      });
      if (res.ok) {
        setDemoSubmitted(true);
      } else {
        alert("Something went wrong — please email david@veriyo.com.au directly.");
      }
    } catch {
      alert("Something went wrong — please email david@veriyo.com.au directly.");
    }
  }

  return (
    <div style={s.page}>
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hero-cols { flex-direction: column !important; }
          .problem-row { flex-direction: column !important; }
          .product-split { flex-direction: column !important; }
          .sectors-track { flex-direction: column !important; }
          .how-steps { flex-direction: column !important; }
          .footer-cols { flex-direction: column !important; gap: 32px !important; }
        }
        @media (max-width: 480px) {
          .nav-inner { padding: 0 20px !important; }
        }
        * { box-sizing: border-box; }
        ::placeholder { color: rgba(255,255,255,0.35) !important; }
        input:focus { outline: none; border-color: rgba(255,255,255,0.3) !important; }
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={s.nav}>
        <div style={s.navInner} className="nav-inner">
          <VeriyoLogoSVG height={34} darkText={true} />
          <div style={s.navLinks} className="nav-links">
            <a href="#products" style={s.navLink}>Products</a>
            <a href="#why" style={s.navLink}>Why Veriyo</a>
            <a href="#sectors" style={s.navLink}>Sectors</a>
            <a href="#faq" style={s.navLink}>FAQ</a>
            <a href="/blog/" style={s.navLink}>Blog</a>
          </div>
          <div style={s.navActions}>
            <button onClick={onLogin} style={s.loginBtn}>Log in</button>
            <a href="#demo" style={s.demoNavBtn}>Request Demo</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO — full-width editorial ─── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          {/* Kicker line */}
          <p style={s.heroKicker}>🇦🇺 Workforce compliance for Australian care providers</p>

          {/* Giant headline */}
          <h1 style={s.heroH1}>
            Compliance that<br />
            <em style={s.heroEm}>never misses</em> a thing.
          </h1>

          {/* Two column split below headline */}
          <div style={s.heroCols} className="hero-cols">
            <p style={s.heroSub}>
              Aged care, NDIS, and early learning providers use Veriyo to track every worker
              credential, clearance, and policy acknowledgement — and generate audit-ready
              reports in one click.
            </p>
            <div style={s.heroActions}>
              <a href="#demo" style={s.heroPrimary}>Request a Demo</a>
              <button onClick={onLogin} style={s.heroSecondary}>View live demo →</button>
              <p style={s.heroNote}>ACQSC · NDIS Commission · ACECQA compliant</p>
            </div>
          </div>
        </div>

        {/* Full-width dashboard mockup */}
        <div style={s.heroMockWrap}>
          <div style={s.heroMock}>
            {/* Mock header bar */}
            <div style={s.mockHeader}>
              <div style={s.mockDots}>
                <span style={{ ...s.mockDot, background: "#ff5f57" }} />
                <span style={{ ...s.mockDot, background: "#febc2e" }} />
                <span style={{ ...s.mockDot, background: "#28c840" }} />
              </div>
              <div style={s.mockUrl}>veriyo.com.au · Compliance Dashboard</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={s.mockLiveDot} />
                <span style={s.mockLiveLabel}>Live</span>
              </div>
            </div>

            {/* Dashboard body */}
            <div style={s.mockBody}>
              {/* Stat tiles */}
              <div style={s.mockTiles}>
                {[
                  { val: "24", label: "Fully Compliant", color: "#1a7a4a", bg: "#e8f5ee" },
                  { val: "8", label: "In Progress", color: "#d97706", bg: "#fef3c7" },
                  { val: "3", label: "Action Required", color: "#dc2626", bg: "#fee2e2" },
                  { val: "98%", label: "Organisation Score", color: "#0f172a", bg: "#f8fafc" },
                ].map((t, i) => (
                  <div key={i} style={{ ...s.mockTile, background: t.bg }}>
                    <div style={{ fontSize: 26, fontWeight: 900, color: t.color, letterSpacing: "-1px" }}>{t.val}</div>
                    <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, marginTop: 2 }}>{t.label}</div>
                  </div>
                ))}
              </div>

              {/* Worker table */}
              <div style={s.mockTable}>
                <div style={s.mockTableHead}>
                  {["Worker", "Role", "Checks", "Status"].map((h, i) => (
                    <div key={i} style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.4px" }}>{h}</div>
                  ))}
                </div>
                {[
                  { name: "Sarah Chen", role: "Support Worker", checks: "Police · NDIS · First Aid", status: "Compliant", color: "#1a7a4a", bg: "#e8f5ee" },
                  { name: "James O'Brien", role: "Registered Nurse", checks: "Police · NDIS · Cert IV", status: "2 pending", color: "#d97706", bg: "#fef3c7" },
                  { name: "Amara Diallo", role: "Personal Carer", checks: "Police · WWCC · Cert III", status: "In progress", color: "#d97706", bg: "#fef3c7" },
                  { name: "Michael Tran", role: "Team Leader", checks: "Police · NDIS · First Aid", status: "Action needed", color: "#dc2626", bg: "#fee2e2" },
                ].map((r, i) => (
                  <div key={i} style={s.mockTableRow}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: i === 0 ? "#1a7a4a" : i === 3 ? "#7f1d1d" : "#1e4a6b", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{r.name[0]}</div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{r.name}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{r.role}</div>
                    <div style={{ fontSize: 10, color: "#9ca3af" }}>{r.checks}</div>
                    <div style={{ display: "inline-flex", alignSelf: "center" }}>
                      <span style={{ fontSize: 10, fontWeight: 600, color: r.color, background: r.bg, padding: "2px 8px", borderRadius: 20 }}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alert bar */}
              <div style={s.mockAlert}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "#92400e", fontWeight: 500 }}>3 workers have checks expiring within 30 days — <span style={{ color: "#1a7a4a", fontWeight: 700, cursor: "pointer" }}>Review now</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE PROBLEM — asymmetric rows ─── */}
      <section id="why" style={s.problemSection}>
        <div style={s.problemInner}>
          <div style={s.problemLeft}>
            <p style={s.sectionLabel}>The Problem</p>
            <h2 style={s.problemH2}>Manual compliance<br />is breaking<br />your team.</h2>
          </div>
          <div style={s.problemRight}>
            {[
              { stat: "1 in 5", colour: "#dc2626", label: "aged care homes failing quality standards", desc: "Nearly 20% of Australian aged care homes failed to meet the Aged Care Quality Standards — with HR and workforce the most commonly failed area. Source: ACQSC Q3 2024–25." },
              { stat: "$1.5M+", colour: "#d97706", label: "maximum fine under the new Aged Care Act", desc: "The Aged Care Act 2024 introduced civil penalties exceeding $1.5 million for the most serious breaches — including workforce and staffing failures." },
              { stat: "3,500+", colour: "#7c3aed", label: "fake qualifications cancelled in 12 months", desc: "ASQA cancelled over 3,500 aged care and disability worker credentials issued by rogue training providers in 2024–25. Providers who didn't independently verify were left exposed." },
              { stat: "Std. 7", colour: GREEN, label: "most failed aged care standard — HR & Workforce", desc: "Recruitment, training, and workforce monitoring are the top compliance failure areas across Australian aged care. This is what Veriyo is built to fix." },
            ].map((item, i) => (
              <div key={i} style={s.problemRow} className="problem-row">
                <div style={{ ...s.problemStat, color: item.colour }}>{item.stat}</div>
                <div style={s.problemText}>
                  <div style={s.problemLabel}>{item.label}</div>
                  <p style={s.problemDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS — tabbed / alternating ─── */}
      <section id="products" style={s.productsSection}>
        <div style={s.container}>
          <p style={s.sectionLabel}>Two products. One compliance engine.</p>

          {/* Onboard */}
          <div style={s.productSplit} className="product-split">
            <div style={s.productSplitLeft}>
              <div style={s.productNumber}>01</div>
              <h2 style={s.productH2}>Veriyo<br />Onboard</h2>
              <p style={s.productTagline}>For new employees.</p>
              <p style={s.productDesc}>
                Every new hire goes through a structured compliance pipeline. Veriyo Onboard tracks each
                required document, clearance, and credential — sending automated reminders, flagging
                missing items, and giving HR a real-time view of every candidate's status from offer
                to Day 1.
              </p>
              <div style={s.featureGrid}>
                {[
                  "AI document reading & verification",
                  "NDIS Worker Screening",
                  "Working with Children Checks",
                  "Police Check tracking",
                  "Aged care qualifications",
                  "Award classification",
                  "Automated reminders",
                  "One-click audit reports",
                ].map((f, i) => (
                  <div key={i} style={s.featureChip}>
                    <span style={s.featureDot} />
                    {f}
                  </div>
                ))}
              </div>
              <a href="#demo" style={s.productCta}>Request a demo →</a>
            </div>
            <div style={s.productSplitRight}>
              <img
                src="https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=800&q=80"
                alt="Nurse reviewing compliance documents on tablet"
                style={s.productImg}
              />
            </div>
          </div>

          <div style={s.productDivider} />

          {/* Verify */}
          <div style={{ ...s.productSplit, flexDirection: "row-reverse" }} className="product-split">
            <div style={s.productSplitLeft}>
              <div style={{ ...s.productNumber, color: "#d97706" }}>02</div>
              <h2 style={s.productH2}>Veriyo<br />Verify</h2>
              <p style={s.productTagline}>For contractors & agency staff.</p>
              <p style={s.productDesc}>
                Contractors, agency staff, locums, and allied health professionals walk through your
                doors every day. Veriyo Verify ensures every single one is screened, credentialled,
                and cleared before they set foot on site — closing the gap that agencies and providers
                both assume someone else is covering.
              </p>
              <div style={{ ...s.productCallout, borderColor: "#fde68a", background: "#fefce8" }}>
                <strong style={{ color: "#92400e" }}>The gap nobody talks about:</strong>
                <span style={{ color: "#a16207" }}> Most providers assume the agency checked. Most agencies assume the provider will. Veriyo Verify closes it.</span>
              </div>
              <div style={s.featureGrid}>
                {[
                  "Contractor compliance tracking",
                  "One-time verify, reuse across sites",
                  "Cleaning, allied health & locums",
                  "Site induction records",
                  "Instant check-in status",
                  "Expired credential alerts",
                  "Full audit trail",
                  "Agency staff visibility",
                ].map((f, i) => (
                  <div key={i} style={{ ...s.featureChip, color: "#92400e" }}>
                    <span style={{ ...s.featureDot, background: "#d97706" }} />
                    {f}
                  </div>
                ))}
              </div>
              <a href="#demo" style={{ ...s.productCta, color: "#d97706" }}>Request a demo →</a>
            </div>
            <div style={s.productSplitRight}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="Contractor being checked in at a care facility"
                style={s.productImg}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — vertical timeline ─── */}
      <section style={s.howSection}>
        <div style={s.container}>
          <div style={s.howTop}>
            <p style={{ ...s.sectionLabel, color: "rgba(255,255,255,0.4)" }}>How It Works</p>
            <h2 style={s.howH2}>From offer accepted<br />to Day 1 compliant.</h2>
          </div>
          <div style={s.howSteps} className="how-steps">
            {[
              { n: "01", title: "Candidate Invited", desc: "HR sends a Veriyo link. The candidate receives a personalised checklist of every document and clearance required for their specific role." },
              { n: "02", title: "Documents Uploaded", desc: "The candidate uploads directly. Veriyo's AI reads and validates each one — certificates, clearances, qualifications, IDs — instantly." },
              { n: "03", title: "Compliance Verified", desc: "HR sees a live dashboard. Missing items trigger automatic reminders. Nothing gets missed. Nothing gets manually chased." },
              { n: "04", title: "Day 1 Ready", desc: "When the pipeline is complete, the worker is cleared to start. HR gets confirmation, the worker gets clarity, and you get peace of mind." },
            ].map((step, i) => (
              <div key={i} style={s.howStep}>
                <div style={s.howStepN}>{step.n}</div>
                <div style={s.howStepLine} />
                <h4 style={s.howStepTitle}>{step.title}</h4>
                <p style={s.howStepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTORS — full-width with illustrations ─── */}
      <section id="sectors" style={s.sectorsSection}>
        <div style={s.container}>
          <p style={s.sectionLabel}>Sectors</p>
          <h2 style={s.sectorsH2}>Built for every corner<br />of the Australian care workforce.</h2>
        </div>
        <div style={s.sectorsTrack} className="sectors-track">
          {[
            {
              illustration: <AgedCareIllustration />,
              title: "Aged Care",
              colour: GREEN,
              checks: ["NDIS Worker Screening", "National Police Check", "Cert III/IV Aged Care", "Award Classification", "ACQSC audit-ready"],
              desc: "For residential and community aged care providers under the Aged Care Act 2024 and the Aged Care Quality Standards.",
            },
            {
              illustration: <NDISIllustration />,
              title: "NDIS",
              colour: "#3b82f6",
              checks: ["NDIS Worker Screening", "Banning Order checks", "Participant safety records", "2027 registration ready", "Practice Standards"],
              desc: "Full NDIS Worker Screening compliance, banning order checks, and registration support ahead of the July 2027 deadline.",
            },
            {
              illustration: <EarlyLearningIllustration />,
              title: "Early Learning",
              colour: "#f59e0b",
              checks: ["Working With Children Check", "ECE Qualifications", "First Aid & Anaphylaxis", "Child Safe Standards", "NQF compliance"],
              desc: "Working With Children Checks, early childhood qualifications, and Child Safe Standards for childcare centres and family day care.",
            },
          ].map((sector, i) => (
            <div key={i} style={s.sectorCard}>
              <div style={s.sectorIllo}>{sector.illustration}</div>
              <div style={s.sectorBody}>
                <div style={{ ...s.sectorDot, background: sector.colour }} />
                <h3 style={s.sectorTitle}>{sector.title}</h3>
                <p style={s.sectorDesc}>{sector.desc}</p>
                <ul style={s.sectorChecks}>
                  {sector.checks.map((c, j) => (
                    <li key={j} style={s.sectorCheck}>
                      <span style={{ ...s.sectorCheckTick, color: sector.colour }}>✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CONSEQUENCES — editorial layout ─── */}
      <section style={s.caseSection}>
        <div style={s.caseInner}>
          <div style={s.caseLeft}>
            <p style={s.sectionLabel}>Real Consequences</p>
            <h2 style={s.caseH2}>The cost of<br />getting it wrong.</h2>
            <p style={s.caseLead}>
              These aren't hypothetical risks. These are real Australian providers who faced real
              consequences — and in every case, workforce compliance was at the centre of it.
            </p>
            <p style={s.caseSource}>
              Sources: ACQSC · ASQA · ABC News · The Weekly Source
            </p>
          </div>
          <div style={s.caseRight}>
            {[
              {
                tag: "Accreditation Failure",
                tagColour: "#dc2626",
                tagBg: "#fee2e2",
                org: "Bupa Aged Care — Traralgon, VIC",
                desc: "Failed a government accreditation audit on human resource management, medication management, and living environment.",
                outcomes: ["Banned from admitting new residents", "Government funding suspended", "External administrator appointed — at Bupa's expense"],
                lesson: "No provider is too large to lose accreditation. HR compliance failures trigger the audit. The audit triggers the sanctions.",
              },
              {
                tag: "Systemic Non-Compliance",
                tagColour: "#d97706",
                tagBg: "#fef3c7",
                org: "TriCare — 9 Queensland Facilities",
                desc: "Nine enforceable undertakings — more than any other aged care provider in Australia — for persistent failure to meet mandatory care minutes targets.",
                outcomes: ["Active Commission supervision", "Monthly (not quarterly) reporting forced", "One missed deadline = court action and funding restrictions"],
                lesson: "Workforce tracking failures don't stay isolated. They compound across sites until the regulator steps in.",
              },
              {
                tag: "Credential Fraud",
                tagColour: "#7c3aed",
                tagBg: "#f5f3ff",
                org: "3,500+ Qualifications Cancelled — Nationwide",
                desc: "ASQA cancelled over 3,500 aged care, disability, and childcare worker credentials issued by rogue training providers between 2024–2025.",
                outcomes: ["Workers lost their right to practise overnight", "Providers faced immediate staffing gaps", "No independent verification = no defence"],
                lesson: "A qualification on paper means nothing if it hasn't been independently verified. Veriyo catches this before Day 1.",
              },
            ].map((c, i) => (
              <div key={i} style={s.caseCard}>
                <span style={{ ...s.caseTag, color: c.tagColour, background: c.tagBg }}>{c.tag}</span>
                <h3 style={s.caseOrg}>{c.org}</h3>
                <p style={s.caseDesc}>{c.desc}</p>
                <div style={s.caseOutcomes}>
                  {c.outcomes.map((o, j) => (
                    <div key={j} style={s.caseOutcome}>
                      <span style={{ color: "#dc2626", marginRight: 8, fontWeight: 700 }}>→</span>{o}
                    </div>
                  ))}
                </div>
                <p style={s.caseLesson}><strong>The lesson:</strong> {c.lesson}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PULL QUOTE ─── */}
      <section style={s.quoteSection}>
        <div style={s.quoteInner}>
          <p style={s.quoteText}>
            "Care providers are triple-handling compliance documents across recruitment, compliance, and HR.
            Veriyo fixes that — one platform, one source of truth, before Day 1."
          </p>
          <div style={s.quoteRule} />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" style={s.faqSection}>
        <div style={s.faqInner}>
          <div style={s.faqLeft}>
            <p style={s.sectionLabel}>FAQ</p>
            <h2 style={s.faqH2}>Common questions.</h2>
            <p style={s.faqSub}>
              Everything aged care, NDIS, and early learning providers ask before signing up.
            </p>
          </div>
          <div style={s.faqRight}>
            {[
              { q: "What compliance checks does Veriyo track for aged care workers?", a: "Veriyo tracks all mandatory requirements for aged care workers: National Police Checks, NDIS Worker Screening, Working With Children Checks (WWCC), aged care qualifications (Cert III/IV), First Aid and CPR certificates, and policy acknowledgements including the Aged Care Code of Conduct. Expiring credentials are flagged automatically before they lapse." },
              { q: "Does Veriyo support NDIS Worker Screening compliance?", a: "Yes. Veriyo tracks which workers hold a current NDIS Worker Screening clearance, flags those who are pending or expired, and maintains audit-ready records. Veriyo also checks the NDIS Commission banning order register so providers can verify a worker is not listed before they begin work." },
              { q: "How does Veriyo help early learning centres with compliance?", a: "For childcare and early learning centres, Veriyo tracks Working With Children Checks, early childhood education qualifications, First Aid and Anaphylaxis training, and Child Safe Standards policy acknowledgements. It supports the full National Quality Framework compliance picture." },
              { q: "What is the difference between Veriyo Onboard and Veriyo Verify?", a: "Veriyo Onboard manages the compliance pipeline for new employees — from offer accepted to Day 1 compliant. Veriyo Verify manages ongoing compliance for contractors, agency staff, locums, and allied health professionals, ensuring every visitor is screened and credentialled before they arrive on site." },
              { q: "How does Veriyo help providers prepare for an ACQSC audit?", a: "Veriyo generates a one-click Compliance Audit Report covering every worker's credential status, policy acknowledgements, and outstanding items. Instead of pulling records one by one, you can hand an auditor a complete workforce compliance summary in seconds." },
              { q: "Is Veriyo suitable for multi-site aged care or NDIS providers?", a: "Yes. Veriyo is built for Australian care providers of all sizes, from single-site operations to large multi-site organisations. Compliance managers get a single dashboard across their entire workforce, with reporting by site, role type, and compliance status." },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEMO CTA — editorial dark ─── */}
      <section id="demo" style={s.demoSection}>
        <div style={s.demoInner}>
          <div style={s.demoLeft}>
            <h2 style={s.demoH2}>See Veriyo<br />in action.</h2>
            <p style={s.demoSub}>
              We're selectively onboarding founding partners. Request a personalised demo and
              see how Veriyo fits your organisation's compliance workflow.
            </p>
            <div style={s.demoSocProof}>
              {["Aged Care", "NDIS", "Early Learning"].map((s2, i) => (
                <span key={i} style={s.demoSocChip}>{s2}</span>
              ))}
            </div>
          </div>
          <div style={s.demoRight}>
            {demoSubmitted ? (
              <div style={s.demoSuccess}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✅</div>
                <strong style={{ fontSize: 18, color: "#fff", letterSpacing: "-0.5px" }}>We'll be in touch.</strong>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", marginTop: 8, lineHeight: 1.6 }}>
                  David will reach out within 24 hours to arrange your demo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoRequest} style={s.demoForm}>
                <input type="text" value={demoName} onChange={e => setDemoName(e.target.value)} placeholder="Your name" required style={s.demoInput} />
                <input type="text" value={demoOrg} onChange={e => setDemoOrg(e.target.value)} placeholder="Organisation" required style={s.demoInput} />
                <input type="email" value={demoEmail} onChange={e => setDemoEmail(e.target.value)} placeholder="Work email" required style={s.demoInput} />
                <input type="tel" value={demoPhone} onChange={e => setDemoPhone(e.target.value)} placeholder="Phone (optional)" style={s.demoInput} />
                <button type="submit" style={s.demoBtn}>Request a Demo →</button>
                <p style={s.demoNote}>Or email <a href="mailto:david@veriyo.com.au" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>david@veriyo.com.au</a></p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ─── GEO CONTENT (for AI engines) ─── */}
      <section style={{ background: "#f8faf9", padding: "56px 32px", borderTop: "1px solid #e3ede8" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.6px" }}>About Veriyo</h2>
          <p style={{ fontSize: 14, color: "#4a6357", lineHeight: 1.85, marginBottom: 14 }}>
            <strong>Veriyo</strong> is Australian compliance management software designed for aged care providers, NDIS registered providers, and early learning centres. The platform automates the tracking of worker credentials, regulatory clearances, and policy acknowledgements across an organisation's entire workforce — replacing manual spreadsheets and email chains with a real-time compliance dashboard.
          </p>
          <p style={{ fontSize: 14, color: "#4a6357", lineHeight: 1.85, marginBottom: 14 }}>
            Veriyo's two products — <strong>Veriyo Onboard</strong> (for permanent employees) and <strong>Veriyo Verify</strong> (for contractors and agency staff) — cover the full compliance lifecycle. Veriyo Onboard collects and validates documents from new hires: police checks, NDIS Worker Screening clearances, Working With Children Checks (WWCC), aged care and disability qualifications, First Aid and CPR certificates. Veriyo Verify extends coverage to third-party workers visiting a facility, ensuring no contractor or locum enters a site without current, verified credentials.
          </p>
          <p style={{ fontSize: 14, color: "#4a6357", lineHeight: 1.85 }}>
            When an audit is required by the Aged Care Quality and Safety Commission (ACQSC), the NDIS Quality and Safeguards Commission, or ACECQA, Veriyo generates a one-click Compliance Audit Report covering every worker's credential status, policy acknowledgements, and any outstanding compliance gaps. Veriyo is based in Sydney, Australia, and serves care providers nationwide.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" style={s.footer}>
        <div style={s.footerInner} className="footer-cols">
          <div style={s.footerBrand}>
            <VeriyoLogoSVG height={28} darkText={false} />
            <p style={s.footerTagline}>Workforce compliance for<br />Australian care sectors.</p>
          </div>
          <div style={s.footerLinks}>
            <div style={s.footerCol}>
              <div style={s.footerColHead}>Products</div>
              <a href="#products" style={s.footerLink}>Veriyo Onboard</a>
              <a href="#products" style={s.footerLink}>Veriyo Verify</a>
            </div>
            <div style={s.footerCol}>
              <div style={s.footerColHead}>Sectors</div>
              <a href="#sectors" style={s.footerLink}>Aged Care</a>
              <a href="#sectors" style={s.footerLink}>NDIS</a>
              <a href="#sectors" style={s.footerLink}>Early Learning</a>
            </div>
            <div style={s.footerCol}>
              <div style={s.footerColHead}>Resources</div>
              <a href="/blog/" style={s.footerLink}>Blog</a>
              <a href="/blog/ndis-reform-act-2026-registered-providers.html" style={s.footerLink}>NDIS 2026</a>
              <a href="/blog/support-at-home-2026-aged-care-providers.html" style={s.footerLink}>Aged Care 2026</a>
            </div>
            <div style={s.footerCol}>
              <div style={s.footerColHead}>Contact</div>
              <a href="mailto:david@veriyo.com.au" style={s.footerLink}>david@veriyo.com.au</a>
              <a href="https://www.veriyo.com.au" style={s.footerLink}>veriyo.com.au</a>
            </div>
          </div>
        </div>
        <div style={s.footerBottom}>
          <p style={s.footerCopy}>© 2026 Veriyo · Sydney, Australia</p>
        </div>
      </footer>
    </div>
  );
}

// ─── Styles ───

const GREEN = "#1a7a4a";
const DARK = "#0f172a";

const s = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    color: DARK,
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    background: "#fff",
  },

  // NAV
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.97)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid #f0f0f0",
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  navLinks: {
    display: "flex",
    gap: 32,
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    color: "#6b7280",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "-0.1px",
  },
  navActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexShrink: 0,
  },
  loginBtn: {
    background: "none",
    border: "1px solid #e5e7eb",
    borderRadius: 7,
    padding: "7px 16px",
    fontSize: 13,
    fontWeight: 500,
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  demoNavBtn: {
    background: GREEN,
    color: "#fff",
    borderRadius: 7,
    padding: "8px 18px",
    fontSize: 13,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
    letterSpacing: "-0.1px",
  },

  // HERO — full-width editorial
  hero: {
    background: "#fff",
    paddingTop: 80,
    borderBottom: "1px solid #f0f0f0",
  },
  heroInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
  },
  heroKicker: {
    fontSize: 13,
    color: GREEN,
    fontWeight: 600,
    letterSpacing: "0.1px",
    marginBottom: 24,
    margin: "0 0 24px",
  },
  heroH1: {
    fontSize: "clamp(52px, 7vw, 96px)",
    fontWeight: 900,
    color: DARK,
    lineHeight: 1.0,
    margin: "0 0 40px",
    letterSpacing: "-4px",
    textWrap: "balance",
  },
  heroEm: {
    fontStyle: "italic",
    color: GREEN,
    fontWeight: 900,
  },
  heroCols: {
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
    marginBottom: 64,
    flexWrap: "wrap",
  },
  heroSub: {
    flex: "1 1 340px",
    fontSize: 18,
    color: "#6b7280",
    lineHeight: 1.65,
    margin: 0,
    letterSpacing: "-0.1px",
  },
  heroActions: {
    flex: "1 1 260px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-start",
  },
  heroPrimary: {
    background: GREEN,
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: "-0.2px",
    display: "inline-block",
  },
  heroSecondary: {
    background: "none",
    border: "none",
    color: "#6b7280",
    padding: "0",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    fontFamily: "inherit",
    letterSpacing: "-0.1px",
  },
  heroNote: {
    fontSize: 12,
    color: "#9ca3af",
    margin: "4px 0 0",
    letterSpacing: "0.1px",
  },

  // HERO MOCKUP
  heroMockWrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
  },
  heroMock: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.10), 0 48px 96px rgba(0,0,0,0.08)",
    border: "1px solid #e8ecf0",
    overflow: "hidden",
  },
  mockHeader: {
    background: "#f8fafc",
    borderBottom: "1px solid #e8ecf0",
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  mockDots: { display: "flex", gap: 6, alignItems: "center" },
  mockDot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
  mockUrl: {
    flex: 1,
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: 500,
    letterSpacing: "-0.1px",
  },
  mockLiveDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#22c55e",
    display: "inline-block",
  },
  mockLiveLabel: {
    fontSize: 11,
    fontWeight: 600,
    color: "#22c55e",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
  },
  mockBody: { padding: "20px 24px" },
  mockTiles: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 20,
  },
  mockTile: {
    borderRadius: 10,
    padding: "14px 16px",
  },
  mockTable: {
    background: "#fff",
    borderRadius: 10,
    border: "1px solid #f1f5f9",
    overflow: "hidden",
    marginBottom: 14,
  },
  mockTableHead: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 2fr 1fr",
    gap: 0,
    padding: "10px 16px",
    background: "#f8fafc",
    borderBottom: "1px solid #f1f5f9",
  },
  mockTableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 2fr 1fr",
    gap: 0,
    padding: "10px 16px",
    borderBottom: "1px solid #f8fafc",
    alignItems: "center",
  },
  mockAlert: {
    background: "#fef9f0",
    border: "1px solid #fde68a",
    borderRadius: 8,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  // SHARED
  container: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: GREEN,
    margin: "0 0 20px",
  },

  // PROBLEM — asymmetric two-column
  problemSection: {
    padding: "120px 40px",
    background: "#fafafa",
    borderTop: "1px solid #ebebeb",
  },
  problemInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
  },
  problemLeft: {
    flex: "0 0 320px",
    position: "sticky",
    top: 80,
  },
  problemH2: {
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 900,
    color: DARK,
    lineHeight: 1.05,
    margin: "0 0 0",
    letterSpacing: "-3px",
    textWrap: "balance",
  },
  problemRight: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 0,
  },
  problemRow: {
    display: "flex",
    gap: 40,
    alignItems: "flex-start",
    padding: "40px 0",
    borderBottom: "1px solid #ebebeb",
  },
  problemStat: {
    fontSize: "clamp(40px, 5vw, 64px)",
    fontWeight: 900,
    letterSpacing: "-3px",
    lineHeight: 1,
    flexShrink: 0,
    width: 160,
  },
  problemText: { flex: 1, minWidth: 0 },
  problemLabel: {
    fontSize: 16,
    fontWeight: 700,
    color: DARK,
    margin: "0 0 10px",
    letterSpacing: "-0.3px",
    lineHeight: 1.3,
  },
  problemDesc: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: 0,
  },

  // PRODUCTS — numbered split layout
  productsSection: {
    padding: "120px 0",
    background: "#fff",
    borderTop: "1px solid #ebebeb",
  },
  productSplit: {
    display: "flex",
    gap: 0,
    alignItems: "stretch",
    marginTop: 64,
  },
  productSplitLeft: {
    flex: "1 1 500px",
    padding: "64px 72px",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  productSplitRight: {
    flex: "1 1 500px",
    minHeight: 520,
    overflow: "hidden",
  },
  productImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  productNumber: {
    fontSize: 48,
    fontWeight: 900,
    color: GREEN,
    letterSpacing: "-2px",
    lineHeight: 1,
    marginBottom: 16,
    opacity: 0.3,
  },
  productH2: {
    fontSize: "clamp(36px, 4.5vw, 56px)",
    fontWeight: 900,
    color: DARK,
    lineHeight: 1.0,
    margin: "0 0 8px",
    letterSpacing: "-3px",
  },
  productTagline: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: 500,
    margin: "0 0 24px",
    letterSpacing: "-0.1px",
  },
  productDesc: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: "0 0 28px",
    letterSpacing: "-0.1px",
  },
  productCallout: {
    border: "1px solid",
    borderRadius: 8,
    padding: "12px 16px",
    marginBottom: 24,
    fontSize: 13,
    lineHeight: 1.6,
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 16px",
    marginBottom: 32,
  },
  featureChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#374151",
    fontWeight: 500,
  },
  featureDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: GREEN,
    flexShrink: 0,
  },
  productCta: {
    color: GREEN,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    letterSpacing: "-0.1px",
  },
  productDivider: {
    height: 1,
    background: "#ebebeb",
    margin: "0 40px",
  },

  // HOW IT WORKS — horizontal timeline on dark
  howSection: {
    padding: "120px 0",
    background: DARK,
  },
  howTop: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
    marginBottom: 72,
  },
  howH2: {
    fontSize: "clamp(36px, 5vw, 64px)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.0,
    margin: "0 0 0",
    letterSpacing: "-3px",
    textWrap: "balance",
  },
  howSteps: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 0,
  },
  howStep: {
    padding: "40px 32px",
    borderLeft: "1px solid rgba(255,255,255,0.07)",
    position: "relative",
  },
  howStepN: {
    fontSize: 48,
    fontWeight: 900,
    color: "rgba(255,255,255,0.06)",
    lineHeight: 1,
    marginBottom: 32,
    letterSpacing: "-2px",
    fontVariantNumeric: "tabular-nums",
  },
  howStepLine: {
    width: 24,
    height: 2,
    background: GREEN,
    marginBottom: 20,
  },
  howStepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 12px",
    letterSpacing: "-0.3px",
  },
  howStepDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.75,
    margin: 0,
  },

  // SECTORS — full-width cards
  sectorsSection: {
    padding: "120px 0",
    background: "#fff",
    borderTop: "1px solid #ebebeb",
  },
  sectorsH2: {
    fontSize: "clamp(28px, 4vw, 48px)",
    fontWeight: 900,
    color: DARK,
    margin: "0 0 64px",
    letterSpacing: "-2.5px",
    lineHeight: 1.05,
    textWrap: "balance",
    maxWidth: 1160,
    padding: "0 40px",
  },
  sectorsTrack: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 0,
    borderTop: "1px solid #ebebeb",
    borderBottom: "1px solid #ebebeb",
  },
  sectorCard: {
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ebebeb",
    overflow: "hidden",
  },
  sectorIllo: {
    height: 220,
    background: "#f8faf9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #ebebeb",
    overflow: "hidden",
  },
  sectorBody: {
    padding: "32px 36px 40px",
    flex: 1,
  },
  sectorDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginBottom: 16,
  },
  sectorTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: DARK,
    margin: "0 0 10px",
    letterSpacing: "-1px",
  },
  sectorDesc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: "0 0 24px",
  },
  sectorChecks: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  sectorCheck: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "#374151",
    fontWeight: 500,
  },
  sectorCheckTick: {
    fontSize: 12,
    fontWeight: 800,
    flexShrink: 0,
  },

  // CONSEQUENCES — editorial two-col
  caseSection: {
    padding: "120px 40px",
    background: "#fafafa",
    borderTop: "1px solid #ebebeb",
  },
  caseInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
  },
  caseLeft: {
    flex: "0 0 320px",
    position: "sticky",
    top: 80,
  },
  caseH2: {
    fontSize: "clamp(32px, 4vw, 52px)",
    fontWeight: 900,
    color: DARK,
    lineHeight: 1.05,
    margin: "0 0 20px",
    letterSpacing: "-3px",
    textWrap: "balance",
  },
  caseLead: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: "0 0 32px",
  },
  caseSource: {
    fontSize: 11,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  caseRight: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  caseCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "28px 32px",
    border: "1px solid #ebebeb",
  },
  caseTag: {
    display: "inline-block",
    borderRadius: 5,
    padding: "3px 10px",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.3px",
    textTransform: "uppercase",
    marginBottom: 14,
  },
  caseOrg: {
    fontSize: 15,
    fontWeight: 700,
    color: DARK,
    margin: "0 0 10px",
    letterSpacing: "-0.3px",
  },
  caseDesc: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },
  caseOutcomes: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    margin: "0 0 16px",
    paddingLeft: 4,
  },
  caseOutcome: {
    fontSize: 12,
    color: "#374151",
    lineHeight: 1.5,
    fontWeight: 500,
  },
  caseLesson: {
    fontSize: 12,
    color: "#9ca3af",
    lineHeight: 1.65,
    margin: 0,
    borderTop: "1px solid #f3f4f6",
    paddingTop: 14,
  },

  // PULL QUOTE
  quoteSection: {
    padding: "96px 40px",
    background: DARK,
  },
  quoteInner: {
    maxWidth: 900,
    margin: "0 auto",
  },
  quoteText: {
    fontSize: "clamp(20px, 3vw, 32px)",
    color: "#fff",
    lineHeight: 1.4,
    fontStyle: "italic",
    fontWeight: 700,
    margin: "0 0 32px",
    letterSpacing: "-1px",
    opacity: 0.85,
  },
  quoteRule: {
    width: 48,
    height: 3,
    background: GREEN,
  },

  // FAQ — two-col
  faqSection: {
    padding: "120px 40px",
    background: "#fff",
    borderTop: "1px solid #ebebeb",
  },
  faqInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
  },
  faqLeft: {
    flex: "0 0 280px",
    position: "sticky",
    top: 80,
  },
  faqH2: {
    fontSize: "clamp(28px, 3.5vw, 44px)",
    fontWeight: 900,
    color: DARK,
    lineHeight: 1.05,
    margin: "0 0 16px",
    letterSpacing: "-2.5px",
  },
  faqSub: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 1.7,
    margin: 0,
  },
  faqRight: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  // DEMO CTA — large editorial
  demoSection: {
    background: DARK,
    padding: "120px 40px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  demoInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 96,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  demoLeft: {
    flex: "1 1 380px",
  },
  demoH2: {
    fontSize: "clamp(40px, 5.5vw, 72px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 20px",
    letterSpacing: "-4px",
    lineHeight: 1.0,
  },
  demoSub: {
    fontSize: 16,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.75,
    margin: "0 0 32px",
    letterSpacing: "-0.1px",
    maxWidth: 420,
  },
  demoSocProof: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  demoSocChip: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 5,
    padding: "4px 10px",
    letterSpacing: "0.3px",
  },
  demoRight: {
    flex: "1 1 360px",
  },
  demoForm: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  demoInput: {
    padding: "14px 18px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.08)",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    color: "#fff",
    background: "rgba(255,255,255,0.05)",
    letterSpacing: "-0.1px",
    width: "100%",
  },
  demoBtn: {
    background: GREEN,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "14px 24px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    marginTop: 4,
    letterSpacing: "-0.2px",
    width: "100%",
  },
  demoSuccess: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "40px 32px",
    textAlign: "center",
  },
  demoNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    margin: "10px 0 0",
    textAlign: "center",
  },

  // FOOTER
  footer: {
    background: "#060d18",
    padding: "64px 40px 0",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  footerInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: 48,
    flexWrap: "wrap",
    paddingBottom: 56,
  },
  footerBrand: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: "0 0 220px",
  },
  footerTagline: {
    fontSize: 13,
    color: "rgba(255,255,255,0.2)",
    lineHeight: 1.7,
    margin: 0,
  },
  footerLinks: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },
  footerCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  footerColHead: {
    fontSize: 10,
    fontWeight: 700,
    color: "rgba(255,255,255,0.25)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: 6,
  },
  footerLink: {
    color: "rgba(255,255,255,0.4)",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: "-0.1px",
  },
  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.04)",
    padding: "20px 0",
    maxWidth: 1160,
    margin: "0 auto",
  },
  footerCopy: {
    fontSize: 12,
    color: "rgba(255,255,255,0.15)",
    margin: 0,
  },
};
