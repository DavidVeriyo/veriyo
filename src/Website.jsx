import { useState } from "react";
import { VeriyoLogo as VeriyoLogoSVG } from "./Nav";

function NDISIllustration() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #e8f5ee 0%, #d1edd9 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 300 }}>
        {/* Background circles */}
        <circle cx="160" cy="100" r="90" fill="#c8e6d0" opacity="0.4" />
        <circle cx="160" cy="100" r="65" fill="#b8deca" opacity="0.4" />

        {/* Wheelchair */}
        <circle cx="118" cy="155" r="16" stroke="#1a7a4a" strokeWidth="3" fill="none" />
        <circle cx="118" cy="155" r="4" fill="#1a7a4a" />
        <circle cx="152" cy="155" r="10" stroke="#1a7a4a" strokeWidth="3" fill="none" />
        <circle cx="152" cy="155" r="3" fill="#1a7a4a" />
        {/* Wheelchair frame */}
        <path d="M118 139 L118 115 L138 115 L152 139 L118 139Z" stroke="#1a7a4a" strokeWidth="2.5" fill="#e8f5ee" strokeLinejoin="round" />
        <line x1="118" y1="139" x2="152" y2="139" stroke="#1a7a4a" strokeWidth="2.5" />
        <path d="M125 115 L130 100" stroke="#1a7a4a" strokeWidth="2.5" strokeLinecap="round" />

        {/* Person in wheelchair - body */}
        <circle cx="130" cy="92" r="10" fill="#f4a261" /> {/* head */}
        <path d="M120 105 Q130 110 140 105 L142 130 L118 130Z" fill="#4a90d9" /> {/* torso */}
        <path d="M125 130 L122 145" stroke="#4a90d9" strokeWidth="3" strokeLinecap="round" /> {/* legs */}
        <path d="M135 130 L138 145" stroke="#4a90d9" strokeWidth="3" strokeLinecap="round" />
        {/* arm reaching out */}
        <path d="M140 112 L158 118" stroke="#f4a261" strokeWidth="3" strokeLinecap="round" />

        {/* Support worker */}
        <circle cx="185" cy="88" r="12" fill="#f4a261" /> {/* head */}
        <path d="M173 102 Q185 108 197 102 L200 145 L170 145Z" fill="#1a7a4a" /> {/* torso - green uniform */}
        <path d="M176 145 L174 160" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        <path d="M194 145 L196 160" stroke="#555" strokeWidth="3" strokeLinecap="round" />
        {/* support worker arm reaching to person */}
        <path d="M173 110 L158 118" stroke="#f4a261" strokeWidth="3" strokeLinecap="round" />
        {/* hands clasped */}
        <circle cx="158" cy="119" r="5" fill="#f4a261" />

        {/* Clipboard in other hand */}
        <rect x="196" y="100" width="20" height="26" rx="2" fill="#fff" stroke="#1a7a4a" strokeWidth="1.5" />
        <line x1="200" y1="107" x2="212" y2="107" stroke="#1a7a4a" strokeWidth="1.5" />
        <line x1="200" y1="112" x2="212" y2="112" stroke="#1a7a4a" strokeWidth="1.5" />
        <line x1="200" y1="117" x2="208" y2="117" stroke="#22c55e" strokeWidth="2" />
        <path d="M200 122 L203 125 L208 119" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Shield / compliance badge */}
        <path d="M75 60 L75 80 Q75 90 85 95 Q95 90 95 80 L95 60 L85 57Z" fill="#1a7a4a" opacity="0.9" />
        <path d="M80 75 L83 79 L91 70" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Stars / sparkles */}
        <path d="M230 55 L232 60 L237 60 L233 63 L235 68 L230 65 L225 68 L227 63 L223 60 L228 60Z" fill="#22c55e" opacity="0.7" />
        <path d="M85 35 L86 38 L89 38 L87 40 L88 43 L85 41 L82 43 L83 40 L81 38 L84 38Z" fill="#1a7a4a" opacity="0.5" />

        {/* Label */}
        <rect x="95" y="168" width="130" height="22" rx="11" fill="#1a7a4a" />
        <text x="160" y="183" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">NDIS Compliant Worker</text>
      </svg>
    </div>
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
      <nav style={s.nav}>
        <div style={s.navInner}>
          <VeriyoLogoSVG height={34} darkText={true} />
          <div style={s.navLinks}>
            <a href="#products" style={s.navLink}>Products</a>
            <a href="#why" style={s.navLink}>Why Veriyo</a>
            <a href="#sectors" style={s.navLink}>Sectors</a>
            <a href="#contact" style={s.navLink}>Contact</a>
          </div>
          <div style={s.navActions}>
            <button onClick={onLogin} style={s.loginBtn}>Log in</button>
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
            Veriyo covers the full compliance lifecycle — from the moment a candidate applies to the moment they're on shift.
          </p>

          {/* Veriyo Onboard */}
          <div style={s.productCard}>
            <div style={s.productPhoto}>
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80"
                alt="Aged care nurse with elderly patient"
                style={s.productImg}
              />
              <div style={s.productImgOverlay}>
                <div style={s.productImgBadge}>Veriyo Onboard</div>
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

          {/* Veriyo Connect */}
          <div style={{ ...s.productCard, flexDirection: "row-reverse" }}>
            <div style={s.productPhoto}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80"
                alt="HR professional at desk reviewing documents"
                style={s.productImg}
              />
              <div style={{ ...s.productImgOverlay, background: "linear-gradient(135deg, rgba(26,122,74,0.7), rgba(22,104,64,0.5))" }}>
                <div style={s.productImgBadge}>Veriyo Connect</div>
              </div>
            </div>
            <div style={s.productContent}>
              <div style={{ ...s.productTag, background: "#e8f5ee", color: "#1a7a4a" }}>Veriyo Connect</div>
              <h3 style={s.productH3}>Pre-verified talent, ready to work</h3>
              <p style={s.productDesc}>
                Connect links compliant workers directly with organisations that need them. Every worker
                on the platform has a verified Veriyo Passport — a live profile showing their complete
                compliance status, ready to share with any participating employer.
              </p>
              <div style={s.featureList}>
                {[
                  "Pre-verified worker profiles (Veriyo Passport)",
                  "Instant compliance status visibility",
                  "NDIS registration support (July 2027 deadline ready)",
                  "Aged care, NDIS, and early learning talent pools",
                  "No double-checking — compliance already done",
                  "Direct employer-to-worker connection",
                  "Workforce pipeline for growing providers",
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
                visual: "photo",
                photo: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&q=80",
                alt: "Aged care worker with elderly resident",
                title: "Aged Care",
                desc: "NDIS Worker Screening, police checks, aged care-specific qualifications, and award classification tracking for residential and community aged care providers.",
                tags: ["NDIS Screening", "Police Check", "Aged Care Cert III/IV", "Award Classification"],
              },
              {
                visual: "illustration",
                title: "NDIS",
                desc: "Full NDIS Worker Screening compliance, banning order checks against the NDIS Commission register, and worker registration support ahead of the July 2027 independent registration deadline.",
                tags: ["Worker Screening", "Banning Order Check", "Participant Safety", "2027 Registration"],
              },
              {
                visual: "photo",
                photo: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=500&q=80",
                alt: "Early childhood educator playing with toddlers",
                title: "Early Learning",
                desc: "Working With Children Checks, early childhood education qualifications, first aid, and anaphylaxis certifications for childcare centres and family day care.",
                tags: ["WWCC", "ECE Qualifications", "First Aid", "Anaphylaxis"],
              },
            ].map((sector, i) => (
              <div key={i} style={s.sectorCard}>
                <div style={s.sectorPhotoWrap}>
                  {sector.visual === "illustration"
                    ? <NDISIllustration />
                    : <img src={sector.photo} alt={sector.alt} style={s.sectorPhoto} />
                  }
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
            We're onboarding founding partners now. Request a personalised demo and see
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
              <a href="#products" style={s.footerLink}>Veriyo Connect</a>
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
