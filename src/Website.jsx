import { useState } from "react";
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

export default function Website({ onLogin }) {
  const [demoEmail, setDemoEmail] = useState("");
  const [demoName, setDemoName] = useState("");
  const [demoOrg, setDemoOrg] = useState("");
  const [demoSubmitted, setDemoSubmitted] = useState(false);

  function handleDemoRequest(e) {
    e.preventDefault();
    setDemoSubmitted(true);
  }

  return (
    <div style={s.page}>

      {/* ─── NAV ─── */}
      <style>{`
        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .nav-inner { padding: 0 16px !important; }
        }
      `}</style>
      <nav style={s.nav}>
        <div style={s.navInner} className="nav-inner">
          <VeriyoLogoSVG height={36} darkText={true} />
          <div style={s.navLinks} className="nav-links">
            <a href="#products" style={s.navLink}>Products</a>
            <a href="#why" style={s.navLink}>Why Veriyo</a>
            <a href="#sectors" style={s.navLink}>Sectors</a>
            <a href="#contact" style={s.navLink}>Contact</a>
          </div>
          <div style={s.navActions}>
            <button onClick={onLogin} style={s.loginBtn} className="nav-login">Log in</button>
            <a href="#demo" style={s.demoNavBtn}>Request Demo</a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={s.hero}>
        <div style={s.heroInner}>
          {/* Left — copy */}
          <div style={s.heroLeft}>
            <div style={s.heroBadge}>🇦🇺 Built for Australian care sectors</div>
            <h1 style={s.heroH1}>
              Compliance that<br />
              <span style={s.heroAccent}>never misses</span><br />
              a thing.
            </h1>
            <p style={s.heroSub}>
              Veriyo replaces manual compliance checking with an intelligent platform
              that tracks every document, credential, and clearance — so your team
              spends less time chasing paperwork and more time delivering care.
            </p>
            <div style={s.heroCtas}>
              <a href="#demo" style={s.heroPrimary}>Request a Demo</a>
              <button onClick={onLogin} style={s.heroSecondary}>View live demo →</button>
            </div>
            <div style={s.heroStats}>
              {[
                { num: "140+", label: "compliance failures caught" },
                { num: "3", label: "care sectors covered" },
                { num: "Day 1", label: "compliant from first shift" },
              ].map((st, i) => (
                <div key={i} style={s.heroStat}>
                  <span style={s.heroStatNum}>{st.num}</span>
                  <span style={s.heroStatLabel}>{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard mockup */}
          <div style={s.heroRight}>
            <div style={s.heroMock}>
              <div style={s.mockTopBar}>
                <span style={s.mockTopTitle}>Compliance Overview</span>
                <span style={s.mockLiveDot} />
                <span style={s.mockLiveLabel}>Live</span>
              </div>

              {/* Mini donut stat row */}
              <div style={s.mockStatRow}>
                {[
                  { label: "Compliant", val: "24", color: "#22c55e" },
                  { label: "In Progress", val: "8", color: "#f59e0b" },
                  { label: "Action Required", val: "3", color: "#ef4444" },
                ].map((st, i) => (
                  <div key={i} style={s.mockStat}>
                    <span style={{ ...s.mockStatVal, color: st.color }}>{st.val}</span>
                    <span style={s.mockStatLbl}>{st.label}</span>
                  </div>
                ))}
              </div>

              {/* Worker rows */}
              <div style={s.mockDivider} />
              {[
                { name: "Sarah Chen", role: "Support Worker", pct: 100, status: "Compliant", color: "#22c55e" },
                { name: "James O'Brien", role: "Registered Nurse", pct: 75, status: "2 pending", color: "#f59e0b" },
                { name: "Amara Diallo", role: "Personal Carer", pct: 45, status: "In progress", color: "#22a060" },
                { name: "Michael Tran", role: "Team Leader", pct: 12, status: "Action required", color: "#ef4444" },
              ].map((r, i) => (
                <div key={i} style={s.mockRow}>
                  <div style={{ ...s.mockAvatar, background: r.color === "#22c55e" ? "#1a7a4a" : r.color === "#ef4444" ? "#7f1d1d" : "#1e4a6b" }}>{r.name[0]}</div>
                  <div style={s.mockInfo}>
                    <div style={s.mockName}>{r.name}</div>
                    <div style={s.mockRole}>{r.role}</div>
                  </div>
                  <div style={s.mockRight}>
                    <div style={s.mockBarTrack}>
                      <div style={{ ...s.mockBarFill, width: `${r.pct}%`, background: r.color }} />
                    </div>
                    <div style={{ ...s.mockStatus, color: r.color }}>{r.status}</div>
                  </div>
                </div>
              ))}

              {/* Checks due alert */}
              <div style={s.mockAlert}>
                <span style={s.mockAlertDot} />
                <span style={s.mockAlertText}>3 workers have checks expiring in 30 days</span>
              </div>
            </div>

            {/* Floating badge */}
            <div style={s.heroBadgeFloat}>
              <span style={s.heroBadgeIcon}>✓</span>
              <div>
                <div style={s.heroBadgeTitle}>NDIS Screening cleared</div>
                <div style={s.heroBadgeSub}>Sarah Chen · just now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LOGO TRUST STRIP ─── */}
      <div style={s.trustStrip}>
        <span style={s.trustLabel}>Trusted by providers across NSW</span>
        <div style={s.trustLogos}>
          {["Aged Care", "NDIS Providers", "Early Learning Centres", "Disability Services", "Community Care"].map((name, i) => (
            <span key={i} style={s.trustPill}>{name}</span>
          ))}
        </div>
      </div>

      {/* ─── IMPACT STATS BAND ─── */}
      <section style={s.impactBand}>
        <div style={s.impactInner}>
          {[
            { num: "140+", label: "Compliance failures caught", sub: "in a single provider's first 3 months" },
            { num: "8 days", label: "Avg NDIS screening time", sub: "reduced from weeks with manual process" },
            { num: "3×", label: "Faster onboarding", sub: "from offer accepted to Day 1 cleared" },
            { num: "100%", label: "Audit-ready records", sub: "always up to date, never scrambled for" },
          ].map((st, i) => (
            <div key={i} style={s.impactStat}>
              <div style={s.impactNum}>{st.num}</div>
              <div style={s.impactLabel}>{st.label}</div>
              <div style={s.impactSub}>{st.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section id="why" style={s.problemSection}>
        <div style={s.container}>
          <div style={s.eyebrow}>The Problem</div>
          <h2 style={s.sectionH2}>Manual compliance is breaking your team</h2>
          <p style={s.sectionSub}>
            Care organisations are drowning in paperwork. Recruiters miss items. HR checks it again.
            Compliance checks a third time. And still things fall through the cracks.
          </p>
          <div style={s.problemGrid}>
            {[
              { icon: "📋", stat: "3-layer", label: "manual checking process", desc: "Recruitment → Compliance → HR — the same documents reviewed three times by different people with no single source of truth." },
              { icon: "⚠️", stat: "140+", label: "documented failures", desc: "Real compliance failures logged at a single aged care provider in just 3 months — missing workflows, wrong classifications, duplicate records." },
              { icon: "⏱️", stat: "8 days", label: "average NDIS screening time", desc: "Critical roles left unfilled while compliance documentation sits waiting for manual review and approval." },
              { icon: "🎯", stat: "0%", label: "recruiter accountability", desc: "Recruiters focused on placement targets, not compliance accuracy — and there's no system to catch what they miss." },
            ].map((item, i) => (
              <div key={i} style={s.problemCard}>
                <div style={s.problemIcon}>{item.icon}</div>
                <div style={s.problemStat}>{item.stat}</div>
                <div style={s.problemLabel}>{item.label}</div>
                <p style={s.problemDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section id="products" style={s.productsSection}>
        <div style={s.container}>
          <div style={s.eyebrow}>Our Products</div>
          <h2 style={s.sectionH2}>Two products. One compliance engine.</h2>
          <p style={s.sectionSub}>
            Veriyo covers the full compliance lifecycle — from the moment a candidate applies to the moment they're on site — so nothing falls through the gaps.
          </p>

          {/* Veriyo Onboard */}
          <div style={s.productCard}>
            <div style={s.productPhoto}>
              <img
                src="https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=600&q=80"
                alt="Nurse reviewing compliance documents on tablet"
                style={s.productImg}
              />
              <div style={s.productImgOverlay}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  <div style={s.productImgBadge}>Veriyo Onboard</div>
                  {/* mini compliance progress card */}
                  <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Compliance Progress</div>
                    {[
                      { label: "Police Check", done: true },
                      { label: "NDIS Screening", done: true },
                      { label: "Cert III Aged Care", done: true },
                      { label: "First Aid Certificate", done: false },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: item.done ? "#22c55e" : "rgba(255,255,255,0.2)", border: item.done ? "none" : "1.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: "#fff", fontWeight: 800 }}>{item.done ? "✓" : ""}</div>
                        <span style={{ fontSize: 11, color: item.done ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={s.productContent}>
              <div style={s.productTag}>Veriyo Onboard</div>
              <h3 style={s.productH3}>Compliance pipeline, automated</h3>
              <p style={s.productDesc}>
                Every new hire goes through a structured compliance pipeline. Veriyo Onboard tracks each
                required document, clearance, and credential — sending automated reminders, flagging
                missing items, and giving HR a real-time view of every candidate's compliance status.
              </p>
              <div style={s.featureList}>
                {[
                  "AI-powered document reading & verification",
                  "NDIS Worker Screening, Working with Children, Police Checks",
                  "Aged care & NDIS qualification tracking",
                  "Award classification management",
                  "Automated candidate reminders",
                  "Real-time compliance dashboard",
                  "Audit-ready records, always",
                ].map((f, i) => (
                  <div key={i} style={s.featureItem}>
                    <span style={s.featureTick}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#demo" style={s.productCta}>Learn more →</a>
            </div>
          </div>

          {/* Veriyo Verify */}
          <div style={{ ...s.productCard, flexDirection: "row-reverse" }}>
            <div style={s.productPhoto}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Contractor being checked in at a care facility"
                style={s.productImg}
              />
              <div style={{ ...s.productImgOverlay, background: "linear-gradient(135deg, rgba(15,23,42,0.75), rgba(245,158,11,0.55))" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                  <div style={{ ...s.productImgBadge, background: "rgba(245,158,11,0.25)", border: "1px solid rgba(245,158,11,0.4)" }}>Veriyo Verify</div>
                  {/* Contractor check-in card */}
                  <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>Contractor Check-in</div>
                    {[
                      { name: "Metro Cleaning Co.", type: "Facility Contractor", status: "Verified", color: "#4ade80" },
                      { name: "Allied Health Locums", type: "Agency · 3 staff", status: "2 pending", color: "#fbbf24" },
                      { name: "MedEquip Services", type: "Maintenance", status: "Verified", color: "#4ade80" },
                    ].map((c, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, paddingBottom: 6, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                        <div>
                          <div style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{c.name}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>{c.type}</div>
                        </div>
                        <span style={{ fontSize: 10, fontWeight: 700, color: c.color, background: `${c.color}22`, border: `1px solid ${c.color}44`, borderRadius: 20, padding: "2px 8px" }}>{c.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={s.productContent}>
              <div style={{ ...s.productTag, background: "#fef3c7", color: "#92400e" }}>Veriyo Verify</div>
              <h3 style={s.productH3}>Every contractor. Every visit. Compliant.</h3>
              <p style={s.productDesc}>
                Contractors, agency staff, locums, and allied health professionals walk through your doors every day.
                Veriyo Verify ensures every single one is screened, credentialled, and cleared before they set foot
                on site — closing the compliance gap that agencies and providers both assume someone else is covering.
              </p>
              <div style={s.featureList}>
                {[
                  "Contractor & agency staff compliance tracking",
                  "One-time verification, reusable across sites",
                  "Cleaning, maintenance, allied health & locum staff",
                  "Site-specific induction and clearance records",
                  "Instant check-in status for facility managers",
                  "Expired credential alerts before each visit",
                  "Full audit trail — who was on site, when, verified",
                ].map((f, i) => (
                  <div key={i} style={s.featureItem}>
                    <span style={{ ...s.featureTick, color: "#d97706" }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#92400e", lineHeight: 1.5 }}>
                <strong>The gap nobody talks about:</strong> Most providers assume the agency checked their contractors. Most agencies assume the provider will. Veriyo Verify closes it.
              </div>
              <a href="#demo" style={{ ...s.productCta, color: "#d97706" }}>Learn more →</a>
            </div>
          </div>

        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={s.howSection}>
        <div style={s.container}>
          <div style={{ ...s.eyebrow, color: "#6ecf9a", background: "rgba(34,160,96,0.15)" }}>How It Works</div>
          <h2 style={{ ...s.sectionH2, color: "#fff" }}>From offer accepted to Day 1 compliant</h2>
          <div style={s.stepsRow}>
            {[
              { num: "01", title: "Candidate Invited", desc: "HR sends a Veriyo link. The candidate receives a personalised checklist of every document and clearance required for their specific role." },
              { num: "02", title: "Documents Uploaded", desc: "The candidate uploads directly. Veriyo's AI reads and validates each one — certificates, clearances, qualifications, IDs — instantly." },
              { num: "03", title: "Compliance Verified", desc: "HR sees a live dashboard. Missing items trigger automatic reminders. Nothing gets missed. Nothing gets manually chased." },
              { num: "04", title: "Day 1 Ready", desc: "When the pipeline is complete, the worker is cleared to start. Their Veriyo Passport is live and shareable with any connected employer." },
            ].map((step, i) => (
              <div key={i} style={s.stepCard}>
                <div style={s.stepNum}>{step.num}</div>
                <h4 style={s.stepTitle}>{step.title}</h4>
                <p style={s.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTORS ─── */}
      <section id="sectors" style={s.sectorsSection}>
        <div style={s.container}>
          <div style={s.eyebrow}>Sectors</div>
          <h2 style={s.sectionH2}>Built for the Australian care workforce</h2>
          <div style={s.sectorsGrid}>
            {[
              {
                illustration: <AgedCareIllustration />,
                title: "Aged Care",
                desc: "NDIS Worker Screening, police checks, aged care-specific qualifications, and award classification tracking for residential and community aged care providers.",
                tags: ["NDIS Screening", "Police Check", "Aged Care Cert III/IV", "Award Classification"],
              },
              {
                illustration: <NDISIllustration />,
                title: "NDIS",
                desc: "Full NDIS Worker Screening compliance, banning order checks against the NDIS Commission register, and worker registration support ahead of the July 2027 independent registration deadline.",
                tags: ["Worker Screening", "Banning Order Check", "Participant Safety", "2027 Registration"],
              },
              {
                illustration: <EarlyLearningIllustration />,
                title: "Early Learning",
                desc: "Working With Children Checks, early childhood education qualifications, first aid, and anaphylaxis certifications for childcare centres and family day care.",
                tags: ["WWCC", "ECE Qualifications", "First Aid", "Anaphylaxis"],
              },
            ].map((sector, i) => (
              <div key={i} style={s.sectorCard}>
                <div style={s.sectorPhotoWrap}>
                  {sector.illustration}
                </div>
                <div style={s.sectorBody}>
                  <h3 style={s.sectorTitle}>{sector.title}</h3>
                  <p style={s.sectorDesc}>{sector.desc}</p>
                  <div style={s.tagRow}>
                    {sector.tags.map((tag, j) => (
                      <span key={j} style={s.tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section style={s.testimonialSection}>
        <div style={s.testimonialInner}>
          <div style={s.quoteIcon}>"</div>
          <blockquote style={s.quoteText}>
            We had three people manually checking the same documents — recruitment, compliance, then HR again.
            A platform like Veriyo would save us weeks every year and eliminate the risk of something slipping through before Day 1.
          </blockquote>
          <div style={s.quoteAttrib}>
            <div style={s.quoteAvatar}>A</div>
            <div>
              <div style={s.quoteName}>Aged Care HR Manager</div>
              <div style={s.quoteRole}>Residential aged care provider, Sydney NSW</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DEMO CTA ─── */}
      <section id="demo" style={s.demoSection}>
        <div style={s.demoPhoto}>
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
            alt="Care team"
            style={s.demoBgImg}
          />
          <div style={s.demoOverlay} />
        </div>
        <div style={s.demoContent}>
          <h2 style={s.demoH2}>See Veriyo in action</h2>
          <p style={s.demoSub}>
            We're selectively onboarding founding partners. Request a personalised demo and see
            how Veriyo fits your organisation's compliance workflow.
          </p>
          {demoSubmitted ? (
            <div style={s.demoSuccess}>
              <span style={{ fontSize: "32px" }}>✅</span>
              <div>
                <strong>Thanks — we'll be in touch soon.</strong><br />
                David will reach out within 24 hours to arrange your demo.
              </div>
            </div>
          ) : (
            <form onSubmit={handleDemoRequest} style={s.demoForm}>
              <div style={s.demoFields}>
                <input
                  type="text"
                  value={demoName}
                  onChange={(e) => setDemoName(e.target.value)}
                  placeholder="Your name"
                  required
                  style={s.demoInput}
                />
                <input
                  type="text"
                  value={demoOrg}
                  onChange={(e) => setDemoOrg(e.target.value)}
                  placeholder="Organisation"
                  required
                  style={s.demoInput}
                />
                <input
                  type="email"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  placeholder="Work email"
                  required
                  style={s.demoInput}
                />
              </div>
              <button type="submit" style={s.demoBtn}>Request a Demo →</button>
            </form>
          )}
          <p style={s.demoNote}>
            Or email directly: <a href="mailto:david@veriyo.com.au" style={s.demoLink}>david@veriyo.com.au</a>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.footerLeft}>
            <VeriyoLogoSVG height={30} darkText={false} />
            <p style={s.footerTagline}>
              Workforce compliance for Australian care sectors.<br />
              Aged care · NDIS · Early learning.
            </p>
          </div>
          <div style={s.footerLinks}>
            <div style={s.footerLinkCol}>
              <div style={s.footerLinkHead}>Products</div>
              <a href="#products" style={s.footerLink}>Veriyo Onboard</a>
              <a href="#products" style={s.footerLink}>Veriyo Verify</a>
            </div>
            <div style={s.footerLinkCol}>
              <div style={s.footerLinkHead}>Sectors</div>
              <a href="#sectors" style={s.footerLink}>Aged Care</a>
              <a href="#sectors" style={s.footerLink}>NDIS</a>
              <a href="#sectors" style={s.footerLink}>Early Learning</a>
            </div>
            <div style={s.footerLinkCol}>
              <div style={s.footerLinkHead}>Contact</div>
              <a href="mailto:david@veriyo.com.au" style={s.footerLink}>david@veriyo.com.au</a>
              <a href="https://www.veriyo.com.au" style={s.footerLink}>veriyo.com.au</a>
            </div>
          </div>
        </div>
        <div style={s.footerBottom}>
          <p style={s.footerCopy}>© 2026 Veriyo Pty Ltd · Sydney, Australia · ABN pending</p>
        </div>
      </footer>
    </div>
  );
}

const GREEN = "#1a7a4a";
const GREEN_LIGHT = "#22a060";
const GREEN_XL = "#e8f5ee";
const DARK = "#0f172a";
const SLATE = "#64748b";
const BORDER = "#e2e8f0";

const s = {
  page: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
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
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid ${BORDER}`,
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
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
    color: SLATE,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 500,
  },
  navActions: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexShrink: 0,
  },
  loginBtn: {
    background: "none",
    border: `1.5px solid ${BORDER}`,
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  demoNavBtn: {
    background: `linear-gradient(135deg, ${GREEN}, #166840)`,
    color: "#fff",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  },

  // HERO
  hero: {
    background: `linear-gradient(135deg, ${DARK} 0%, #1e3a5f 60%, ${DARK} 100%)`,
    padding: "80px 24px 80px",
  },
  heroInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 64,
    flexWrap: "wrap",
  },
  heroLeft: {
    flex: "1 1 420px",
    minWidth: 0,
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(34,160,96,0.15)",
    border: "1px solid rgba(34,160,96,0.3)",
    borderRadius: 20,
    padding: "6px 16px",
    fontSize: 13,
    color: "#6ecf9a",
    fontWeight: 600,
    marginBottom: 28,
    letterSpacing: "0.3px",
  },
  heroH1: {
    fontSize: "clamp(36px, 5vw, 60px)",
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.1,
    margin: "0 0 24px",
    letterSpacing: "-1.5px",
  },
  heroAccent: {
    background: `linear-gradient(135deg, ${GREEN_LIGHT}, #34d17a)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 17,
    color: "#94a3b8",
    lineHeight: 1.7,
    margin: "0 0 36px",
    maxWidth: 480,
  },
  heroCtas: {
    display: "flex",
    gap: 14,
    flexWrap: "wrap",
    marginBottom: 48,
  },
  heroPrimary: {
    background: `linear-gradient(135deg, ${GREEN}, #166840)`,
    color: "#fff",
    padding: "15px 30px",
    borderRadius: 10,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    boxShadow: "0 8px 24px rgba(26,122,74,0.4)",
  },
  heroSecondary: {
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "15px 30px",
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },
  heroStats: {
    display: "flex",
    gap: 32,
    flexWrap: "wrap",
  },
  heroStat: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  heroStatNum: {
    fontSize: 26,
    fontWeight: 800,
    color: GREEN_LIGHT,
    letterSpacing: "-0.5px",
  },
  heroStatLabel: {
    fontSize: 12,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: 500,
  },

  // HERO RIGHT — mock dashboard
  heroRight: {
    flex: "1 1 380px",
    minWidth: 0,
    position: "relative",
  },
  heroMock: {
    background: "#fff",
    borderRadius: 16,
    padding: 20,
    boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  mockTopBar: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: `1px solid ${BORDER}`,
  },
  mockTopTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: DARK,
    flex: 1,
  },
  mockLiveDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 6px #22c55e",
    display: "inline-block",
  },
  mockLiveLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#22c55e",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  mockStatRow: {
    display: "flex",
    gap: 16,
    marginBottom: 12,
  },
  mockStat: {
    flex: 1,
    background: "#f8fafc",
    borderRadius: 8,
    padding: "8px 10px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  mockStatVal: {
    fontSize: 20,
    fontWeight: 800,
    letterSpacing: "-0.5px",
  },
  mockStatLbl: {
    fontSize: 10,
    color: SLATE,
    fontWeight: 500,
  },
  mockDivider: {
    height: 1,
    background: BORDER,
    margin: "8px 0",
  },
  mockRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "7px 0",
    borderBottom: "1px solid #f8fafc",
  },
  mockAvatar: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  mockInfo: { flex: 1, minWidth: 0 },
  mockName: {
    fontSize: 12,
    fontWeight: 600,
    color: DARK,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mockRole: {
    fontSize: 10,
    color: "#94a3b8",
    marginTop: 1,
  },
  mockRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 3,
    flexShrink: 0,
  },
  mockBarTrack: {
    width: 72,
    height: 4,
    background: "#f1f5f9",
    borderRadius: 2,
    overflow: "hidden",
  },
  mockBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  mockStatus: {
    fontSize: 10,
    fontWeight: 600,
  },
  mockAlert: {
    marginTop: 12,
    background: "#fef9f0",
    border: "1px solid #fde68a",
    borderRadius: 8,
    padding: "8px 12px",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  mockAlertDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#f59e0b",
    flexShrink: 0,
    display: "inline-block",
  },
  mockAlertText: {
    fontSize: 11,
    color: "#92400e",
    fontWeight: 500,
  },
  heroBadgeFloat: {
    position: "absolute",
    bottom: -18,
    right: -16,
    background: "#fff",
    borderRadius: 12,
    padding: "10px 14px",
    display: "flex",
    alignItems: "center",
    gap: 10,
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    border: "1px solid #e2e8f0",
  },
  heroBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: "#dcfce7",
    color: GREEN,
    fontWeight: 800,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  heroBadgeTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: DARK,
  },
  heroBadgeSub: {
    fontSize: 10,
    color: SLATE,
    marginTop: 1,
  },

  // TRUST STRIP
  trustStrip: {
    background: "#f8fafc",
    borderBottom: `1px solid ${BORDER}`,
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    flexWrap: "wrap",
  },
  trustLabel: {
    fontSize: 12,
    color: SLATE,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    flexShrink: 0,
  },
  trustLogos: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  trustPill: {
    background: "#fff",
    border: `1px solid ${BORDER}`,
    borderRadius: 20,
    padding: "5px 14px",
    fontSize: 12,
    color: SLATE,
    fontWeight: 600,
  },

  // IMPACT BAND
  impactBand: {
    background: `linear-gradient(135deg, ${GREEN} 0%, #166840 100%)`,
    padding: "64px 24px",
  },
  impactInner: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 2,
  },
  impactStat: {
    textAlign: "center",
    padding: "24px 20px",
    borderRight: "1px solid rgba(255,255,255,0.15)",
  },
  impactNum: {
    fontSize: "clamp(32px, 4vw, 48px)",
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "-1.5px",
    lineHeight: 1,
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "rgba(255,255,255,0.95)",
    marginBottom: 4,
  },
  impactSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.65)",
    lineHeight: 1.5,
  },

  // SHARED
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 24px",
  },
  eyebrow: {
    display: "inline-block",
    background: GREEN_XL,
    color: GREEN,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: 20,
    marginBottom: 16,
  },
  sectionH2: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: 800,
    color: DARK,
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  sectionSub: {
    fontSize: 17,
    color: SLATE,
    lineHeight: 1.7,
    margin: "0 0 48px",
    maxWidth: 600,
  },

  // PROBLEM
  problemSection: {
    padding: "100px 0",
    background: "#f8fafc",
  },
  problemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  problemCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 28px",
    border: `1px solid ${BORDER}`,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  problemIcon: { fontSize: 28, marginBottom: 16 },
  problemStat: {
    fontSize: 32,
    fontWeight: 800,
    color: "#ef4444",
    letterSpacing: "-1px",
    lineHeight: 1,
    marginBottom: 4,
  },
  problemLabel: {
    fontSize: 14,
    fontWeight: 700,
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    marginBottom: 12,
  },
  problemDesc: {
    fontSize: 14,
    color: SLATE,
    lineHeight: 1.6,
    margin: 0,
  },

  // PRODUCTS
  productsSection: {
    padding: "100px 0",
    background: "#fff",
  },
  productCard: {
    display: "flex",
    gap: 0,
    alignItems: "stretch",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 32,
    border: `1px solid ${BORDER}`,
    boxShadow: "0 8px 40px rgba(0,0,0,0.07)",
    flexWrap: "wrap",
  },
  productPhoto: {
    flex: "0 0 380px",
    position: "relative",
    minHeight: 360,
    overflow: "hidden",
  },
  productImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  productImgOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(30,58,95,0.4))",
    display: "flex",
    alignItems: "flex-end",
    padding: 24,
  },
  productImgBadge: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.25)",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    padding: "6px 14px",
    borderRadius: 20,
    letterSpacing: "0.3px",
  },
  productContent: {
    flex: "1 1 380px",
    padding: "48px 44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  productTag: {
    display: "inline-block",
    background: DARK,
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    padding: "5px 12px",
    borderRadius: 20,
    marginBottom: 16,
    letterSpacing: "0.3px",
    alignSelf: "flex-start",
  },
  productH3: {
    fontSize: "clamp(22px, 3vw, 30px)",
    fontWeight: 800,
    color: DARK,
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
  },
  productDesc: {
    fontSize: 15,
    color: SLATE,
    lineHeight: 1.7,
    margin: "0 0 24px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 28,
  },
  featureItem: {
    display: "flex",
    gap: 10,
    fontSize: 14,
    color: "#374151",
    alignItems: "flex-start",
  },
  featureTick: {
    color: GREEN,
    fontWeight: 700,
    flexShrink: 0,
    fontSize: 15,
  },
  productCta: {
    color: GREEN,
    fontWeight: 700,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-block",
  },

  // HOW IT WORKS
  howSection: {
    padding: "100px 0",
    background: DARK,
    textAlign: "center",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 8,
  },
  stepCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "36px 28px",
    textAlign: "left",
  },
  stepNum: {
    fontSize: 36,
    fontWeight: 900,
    color: GREEN,
    lineHeight: 1,
    marginBottom: 16,
    letterSpacing: "-1px",
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 12px",
  },
  stepDesc: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 1.7,
    margin: 0,
  },

  // SECTORS
  sectorsSection: {
    padding: "100px 0",
    background: "#f8fafc",
  },
  sectorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
  },
  sectorCard: {
    background: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    border: `1px solid ${BORDER}`,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
  },
  sectorPhotoWrap: {
    height: 200,
    overflow: "hidden",
  },
  sectorPhoto: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.4s ease",
  },
  sectorBody: {
    padding: "28px 28px 32px",
  },
  sectorTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: DARK,
    margin: "0 0 10px",
  },
  sectorDesc: {
    fontSize: 14,
    color: SLATE,
    lineHeight: 1.7,
    margin: "0 0 20px",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    background: GREEN_XL,
    color: GREEN,
    fontSize: 11,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 20,
    border: "1px solid #b8deca",
  },

  // TESTIMONIAL
  testimonialSection: {
    padding: "80px 24px",
    background: "#fff",
  },
  testimonialInner: {
    maxWidth: 720,
    margin: "0 auto",
    textAlign: "center",
  },
  quoteIcon: {
    fontSize: 80,
    color: GREEN_XL,
    lineHeight: 0.6,
    marginBottom: 24,
    display: "block",
    fontFamily: "Georgia, serif",
    color: "#b8deca",
  },
  quoteText: {
    fontSize: "clamp(18px, 2.5vw, 24px)",
    color: DARK,
    lineHeight: 1.6,
    fontStyle: "italic",
    fontWeight: 500,
    margin: "0 0 32px",
    letterSpacing: "-0.2px",
  },
  quoteAttrib: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },
  quoteAvatar: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: `linear-gradient(135deg, ${GREEN}, #166840)`,
    color: "#fff",
    fontWeight: 800,
    fontSize: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteName: {
    fontSize: 15,
    fontWeight: 700,
    color: DARK,
    textAlign: "left",
  },
  quoteRole: {
    fontSize: 13,
    color: SLATE,
    textAlign: "left",
    marginTop: 2,
  },

  // DEMO CTA
  demoSection: {
    position: "relative",
    padding: "100px 24px",
    textAlign: "center",
    overflow: "hidden",
  },
  demoPhoto: {
    position: "absolute",
    inset: 0,
  },
  demoBgImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  demoOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(15,23,42,0.88), rgba(26,122,74,0.82))",
  },
  demoContent: {
    position: "relative",
    zIndex: 1,
    maxWidth: 640,
    margin: "0 auto",
  },
  demoH2: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: 800,
    color: "#fff",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
  },
  demoSub: {
    fontSize: 17,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.7,
    margin: "0 0 40px",
  },
  demoForm: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    maxWidth: 440,
    margin: "0 auto 24px",
  },
  demoFields: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  demoInput: {
    padding: "14px 18px",
    borderRadius: 10,
    border: "none",
    fontSize: 15,
    fontFamily: "inherit",
    outline: "none",
    color: DARK,
    background: "rgba(255,255,255,0.95)",
  },
  demoBtn: {
    background: `linear-gradient(135deg, ${GREEN}, #166840)`,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "15px 24px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  },
  demoSuccess: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    background: "rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "24px 32px",
    color: "#fff",
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: 440,
    margin: "0 auto 24px",
    textAlign: "left",
  },
  demoNote: {
    fontSize: 14,
    color: "rgba(255,255,255,0.65)",
    margin: 0,
  },
  demoLink: {
    color: "#fff",
    fontWeight: 600,
  },

  // FOOTER
  footer: {
    background: DARK,
    padding: "56px 24px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  footerInner: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: 48,
    flexWrap: "wrap",
    paddingBottom: 48,
  },
  footerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    flex: "1 1 260px",
  },
  footerTagline: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 1.7,
    margin: 0,
  },
  footerLinks: {
    display: "flex",
    gap: 48,
    flexWrap: "wrap",
  },
  footerLinkCol: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  footerLinkHead: {
    fontSize: 12,
    fontWeight: 700,
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: 4,
  },
  footerLink: {
    color: "#64748b",
    textDecoration: "none",
    fontSize: 14,
  },
  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "20px 0",
    maxWidth: 1200,
    margin: "0 auto",
  },
  footerCopy: {
    fontSize: 13,
    color: "#475569",
    margin: 0,
  },
};
