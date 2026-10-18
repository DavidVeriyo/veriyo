import { useState } from "react";

export default function Website({ onLogin }) {
  const [demoEmail, setDemoEmail] = useState("");
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleDemoRequest(e) {
    e.preventDefault();
    setDemoSubmitted(true);
  }

  return (
    <div style={styles.page}>
      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.logoRow}>
            <div style={styles.logoMark}>V</div>
            <span style={styles.logoText}>Veriyo</span>
          </div>
          <div style={styles.navLinks}>
            <a href="#products" style={styles.navLink}>Products</a>
            <a href="#problem" style={styles.navLink}>Why Veriyo</a>
            <a href="#sectors" style={styles.navLink}>Sectors</a>
            <a href="#contact" style={styles.navLink}>Contact</a>
          </div>
          <div style={styles.navActions}>
            <button onClick={onLogin} style={styles.loginBtn}>Log in</button>
            <a href="#demo" style={styles.demoNavBtn}>Request Demo</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>🇦🇺 Built for Australian care sectors</div>
          <h1 style={styles.heroH1}>
            Workforce compliance,<br />
            <span style={styles.heroAccent}>automated.</span>
          </h1>
          <p style={styles.heroSub}>
            Veriyo replaces manual compliance checking with an intelligent platform that tracks every document,
            credential, and clearance — so your HR team spends less time chasing paperwork and more time
            delivering care.
          </p>
          <div style={styles.heroCtas}>
            <a href="#demo" style={styles.heroPrimary}>Request a Demo</a>
            <button onClick={onLogin} style={styles.heroSecondary}>Customer Login →</button>
          </div>
          <div style={styles.heroStats}>
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>140+</span>
              <span style={styles.heroStatLabel}>compliance failures caught</span>
            </div>
            <div style={styles.heroStatDiv} />
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>3</span>
              <span style={styles.heroStatLabel}>care sectors covered</span>
            </div>
            <div style={styles.heroStatDiv} />
            <div style={styles.heroStat}>
              <span style={styles.heroStatNum}>Day 1</span>
              <span style={styles.heroStatLabel}>compliant from first shift</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" style={styles.problemSection}>
        <div style={styles.container}>
          <div style={styles.sectionBadge}>The Problem</div>
          <h2 style={styles.sectionH2}>Manual compliance is breaking your team</h2>
          <p style={styles.sectionSub}>
            Care organisations are drowning in paperwork. Recruiters miss items. HR checks it again.
            Then compliance checks it a third time. And still things fall through the cracks.
          </p>
          <div style={styles.problemGrid}>
            {[
              { icon: "📋", stat: "3-layer", label: "manual checking process", desc: "Recruitment → Compliance → HR — the same documents reviewed three times by different people" },
              { icon: "⚠️", stat: "140+", label: "documented failures", desc: "Real compliance failures logged at a single aged care provider in just 3 months — missing workflows, wrong classifications, duplicate records" },
              { icon: "⏱️", stat: "8 days", label: "average NDIS screening time", desc: "Critical roles left unfilled while compliance documentation sits waiting for manual review and approval" },
              { icon: "🎯", stat: "0%", label: "recruiter accountability", desc: "Recruiters focused on placement targets, not compliance accuracy — and there's no system to catch what they miss" },
            ].map((item, i) => (
              <div key={i} style={styles.problemCard}>
                <div style={styles.problemIcon}>{item.icon}</div>
                <div style={styles.problemStat}>{item.stat}</div>
                <div style={styles.problemLabel}>{item.label}</div>
                <p style={styles.problemDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={styles.productsSection}>
        <div style={styles.container}>
          <div style={styles.sectionBadge}>Our Products</div>
          <h2 style={styles.sectionH2}>Two products. One compliance engine.</h2>
          <p style={styles.sectionSub}>
            Veriyo covers the full compliance lifecycle — from the moment a candidate applies, to the moment they're on shift.
          </p>

          {/* Veriyo Onboard */}
          <div style={styles.productCard}>
            <div style={styles.productLeft}>
              <div style={styles.productBadge} data-product="onboard">Veriyo Onboard</div>
              <h3 style={styles.productH3}>Compliance pipeline, automated</h3>
              <p style={styles.productDesc}>
                Every new hire goes through a structured compliance pipeline. Veriyo Onboard tracks each
                required document, clearance, and credential — sending automated reminders, flagging
                missing items, and giving HR a real-time view of every candidate's compliance status.
              </p>
              <div style={styles.featureList}>
                {[
                  "AI-powered document reading & verification",
                  "NDIS Worker Screening, Working with Children, Police Checks",
                  "Aged care & NDIS qualification tracking",
                  "Award classification management",
                  "Automated candidate reminders",
                  "Real-time compliance dashboard",
                  "Audit-ready records, always",
                ].map((f, i) => (
                  <div key={i} style={styles.featureItem}>
                    <span style={styles.featureTick}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.productRight}>
              <div style={styles.mockDashboard}>
                <div style={styles.mockHeader}>
                  <span style={styles.mockTitle}>Compliance Pipeline</span>
                  <span style={styles.mockBadgeGreen}>Live</span>
                </div>
                {[
                  { name: "Sarah Chen", role: "Support Worker", status: "Complete", pct: 100, color: "#22c55e" },
                  { name: "James O'Brien", role: "Registered Nurse", status: "2 pending", pct: 75, color: "#f59e0b" },
                  { name: "Amara Diallo", role: "Personal Carer", status: "In progress", pct: 45, color: "#3b82f6" },
                  { name: "Michael Tran", role: "Team Leader", status: "Not started", pct: 10, color: "#ef4444" },
                ].map((r, i) => (
                  <div key={i} style={styles.mockRow}>
                    <div style={styles.mockAvatar}>{r.name[0]}</div>
                    <div style={styles.mockInfo}>
                      <div style={styles.mockName}>{r.name}</div>
                      <div style={styles.mockRole}>{r.role}</div>
                    </div>
                    <div style={styles.mockProgress}>
                      <div style={styles.mockBar}>
                        <div style={{ ...styles.mockFill, width: `${r.pct}%`, background: r.color }} />
                      </div>
                      <div style={{ ...styles.mockStatus, color: r.color }}>{r.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Veriyo Connect */}
          <div style={{ ...styles.productCard, flexDirection: "row-reverse", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
            <div style={styles.productLeft}>
              <div style={{ ...styles.productBadge, background: "linear-gradient(135deg, #0891b2, #0e7490)" }}>Veriyo Connect</div>
              <h3 style={styles.productH3}>Pre-verified talent, ready to work</h3>
              <p style={styles.productDesc}>
                Connect links compliant workers directly with organisations that need them. Every worker
                on the platform has a verified Veriyo Passport — a live profile showing their complete
                compliance status, ready to share with any participating employer.
              </p>
              <div style={styles.featureList}>
                {[
                  "Pre-verified worker profiles (Veriyo Passport)",
                  "Instant compliance status visibility",
                  "NDIS registration support (July 2027 deadline ready)",
                  "Aged care, NDIS, and early learning talent pools",
                  "No double-checking — compliance already done",
                  "Direct employer-to-worker connection",
                  "Workforce pipeline for growing providers",
                ].map((f, i) => (
                  <div key={i} style={styles.featureItem}>
                    <span style={{ ...styles.featureTick, color: "#0891b2" }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.productRight}>
              <div style={{ ...styles.mockDashboard, borderColor: "#bae6fd" }}>
                <div style={styles.mockHeader}>
                  <span style={styles.mockTitle}>Veriyo Connect</span>
                  <span style={{ ...styles.mockBadgeGreen, background: "#0891b2" }}>Active</span>
                </div>
                {[
                  { name: "Priya Sharma", role: "NDIS Support Worker", badge: "Passport ✓", avail: "Available now" },
                  { name: "Tom Nguyen", role: "Aged Care Worker", badge: "Passport ✓", avail: "Available Mon" },
                  { name: "Lisa Park", role: "Early Childhood Ed.", badge: "Passport ✓", avail: "Available now" },
                  { name: "David Osei", role: "Registered Nurse", badge: "Passport ✓", avail: "Available Tue" },
                ].map((r, i) => (
                  <div key={i} style={styles.mockRow}>
                    <div style={{ ...styles.mockAvatar, background: "#0891b2" }}>{r.name[0]}</div>
                    <div style={styles.mockInfo}>
                      <div style={styles.mockName}>{r.name}</div>
                      <div style={styles.mockRole}>{r.role}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#0891b2", fontWeight: "600" }}>{r.badge}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>{r.avail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.howSection}>
        <div style={styles.container}>
          <div style={styles.sectionBadge}>How It Works</div>
          <h2 style={styles.sectionH2}>From offer accepted to Day 1 compliant</h2>
          <div style={styles.stepsRow}>
            {[
              { num: "01", title: "Candidate Invited", desc: "HR sends a Veriyo link. The candidate receives a personalised checklist of every document and clearance required for their specific role." },
              { num: "02", title: "Documents Uploaded", desc: "The candidate uploads their documents directly. Veriyo's AI reads and validates each one — certificates, clearances, qualifications, IDs." },
              { num: "03", title: "Compliance Verified", desc: "HR sees a live dashboard. Missing items trigger automatic reminders to the candidate. Nothing gets missed. Nothing gets manually chased." },
              { num: "04", title: "Day 1 Ready", desc: "When the pipeline is complete, the worker is cleared to start. Their Veriyo Passport is live — shareable with any connected employer." },
            ].map((step, i) => (
              <div key={i} style={styles.stepCard}>
                <div style={styles.stepNum}>{step.num}</div>
                <h4 style={styles.stepTitle}>{step.title}</h4>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section id="sectors" style={styles.sectorsSection}>
        <div style={styles.container}>
          <div style={styles.sectionBadge}>Sectors</div>
          <h2 style={styles.sectionH2}>Built for the Australian care workforce</h2>
          <div style={styles.sectorsGrid}>
            {[
              {
                icon: "🏥",
                title: "Aged Care",
                desc: "NDIS Worker Screening, police checks, aged care-specific qualifications, and award classification tracking for residential and community aged care providers.",
                tags: ["NDIS Screening", "Police Check", "Aged Care Cert III/IV", "Award Classification"],
              },
              {
                icon: "♿",
                title: "NDIS",
                desc: "Full NDIS Worker Screening compliance, participant safety documentation, and worker registration support ahead of the July 2027 independent worker registration deadline.",
                tags: ["Worker Screening", "Participant Safety", "2027 Registration", "Support Worker Cert"],
              },
              {
                icon: "🧒",
                title: "Early Learning",
                desc: "Working With Children Checks, early childhood education qualifications, first aid, and anaphylaxis certifications for childcare centres and family day care.",
                tags: ["WWCC", "ECE Qualifications", "First Aid", "Anaphylaxis"],
              },
            ].map((sector, i) => (
              <div key={i} style={styles.sectorCard}>
                <div style={styles.sectorIcon}>{sector.icon}</div>
                <h3 style={styles.sectorTitle}>{sector.title}</h3>
                <p style={styles.sectorDesc}>{sector.desc}</p>
                <div style={styles.tagRow}>
                  {sector.tags.map((tag, j) => (
                    <span key={j} style={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO / CTA */}
      <section id="demo" style={styles.demoSection}>
        <div style={styles.demoInner}>
          <h2 style={styles.demoH2}>See Veriyo in action</h2>
          <p style={styles.demoSub}>
            We're onboarding our founding partners now. Request a personalised demo and see
            how Veriyo fits your organisation's compliance workflow.
          </p>
          {demoSubmitted ? (
            <div style={styles.demoSuccess}>
              <span style={{ fontSize: "32px" }}>✅</span>
              <div>
                <strong>Thanks — we'll be in touch soon.</strong><br />
                David will reach out within 24 hours to arrange your demo.
              </div>
            </div>
          ) : (
            <form onSubmit={handleDemoRequest} style={styles.demoForm}>
              <input
                type="email"
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                placeholder="your@organisation.com.au"
                required
                style={styles.demoInput}
              />
              <button type="submit" style={styles.demoBtn}>Request a Demo →</button>
            </form>
          )}
          <p style={styles.demoNote}>
            Or email us directly: <a href="mailto:david@veriyo.com.au" style={styles.demoLink}>david@veriyo.com.au</a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLeft}>
            <div style={styles.logoRow}>
              <div style={{ ...styles.logoMark, width: "28px", height: "28px", fontSize: "14px" }}>V</div>
              <span style={{ ...styles.logoText, fontSize: "18px", color: "#fff" }}>Veriyo</span>
            </div>
            <p style={styles.footerTagline}>
              Workforce compliance for Australian care sectors.<br />
              Aged care · NDIS · Early learning.
            </p>
          </div>
          <div style={styles.footerRight}>
            <div style={styles.footerLinks}>
              <a href="mailto:david@veriyo.com.au" style={styles.footerLink}>david@veriyo.com.au</a>
              <a href="https://www.veriyo.com.au" style={styles.footerLink}>veriyo.com.au</a>
            </div>
            <p style={styles.footerCopy}>© 2026 Veriyo Pty Ltd · Sydney, Australia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    color: "#0f172a",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
  },

  // NAV
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e2e8f0",
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "24px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexShrink: 0,
  },
  logoMark: {
    width: "32px",
    height: "32px",
    borderRadius: "7px",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    flex: 1,
    justifyContent: "center",
  },
  navLink: {
    color: "#64748b",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  navActions: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexShrink: 0,
  },
  loginBtn: {
    background: "none",
    border: "1.5px solid #e2e8f0",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  demoNavBtn: {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    borderRadius: "8px",
    padding: "9px 18px",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
  },

  // HERO
  hero: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0f172a 100%)",
    padding: "100px 24px 80px",
    textAlign: "center",
  },
  heroInner: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(37,99,235,0.15)",
    border: "1px solid rgba(37,99,235,0.3)",
    borderRadius: "20px",
    padding: "6px 16px",
    fontSize: "13px",
    color: "#93c5fd",
    fontWeight: "600",
    marginBottom: "28px",
    letterSpacing: "0.3px",
  },
  heroH1: {
    fontSize: "clamp(36px, 6vw, 64px)",
    fontWeight: "800",
    color: "#ffffff",
    lineHeight: 1.15,
    margin: "0 0 24px",
    letterSpacing: "-1.5px",
  },
  heroAccent: {
    background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: 1.7,
    margin: "0 0 40px",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  heroCtas: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "60px",
  },
  heroPrimary: {
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
    boxShadow: "0 8px 24px rgba(37,99,235,0.4)",
  },
  heroSecondary: {
    background: "rgba(255,255,255,0.08)",
    border: "1.5px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "16px 32px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    flexWrap: "wrap",
  },
  heroStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  heroStatNum: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#3b82f6",
    letterSpacing: "-1px",
  },
  heroStatLabel: {
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontWeight: "500",
  },
  heroStatDiv: {
    width: "1px",
    height: "40px",
    background: "rgba(255,255,255,0.15)",
  },

  // SHARED
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  sectionBadge: {
    display: "inline-block",
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "4px 12px",
    borderRadius: "20px",
    marginBottom: "16px",
  },
  sectionH2: {
    fontSize: "clamp(28px, 4vw, 42px)",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
    lineHeight: 1.2,
  },
  sectionSub: {
    fontSize: "17px",
    color: "#64748b",
    lineHeight: 1.7,
    margin: "0 0 48px",
    maxWidth: "600px",
  },

  // PROBLEM
  problemSection: {
    padding: "100px 0",
    background: "#f8fafc",
  },
  problemGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "24px",
  },
  problemCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px 28px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  problemIcon: {
    fontSize: "28px",
    marginBottom: "16px",
  },
  problemStat: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ef4444",
    letterSpacing: "-1px",
    lineHeight: 1,
    marginBottom: "4px",
  },
  problemLabel: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    marginBottom: "12px",
  },
  problemDesc: {
    fontSize: "14px",
    color: "#64748b",
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
    gap: "64px",
    alignItems: "center",
    background: "linear-gradient(135deg, #f8faff 0%, #eff6ff 100%)",
    borderRadius: "24px",
    padding: "56px 48px",
    marginBottom: "32px",
    border: "1px solid #dbeafe",
    flexWrap: "wrap",
  },
  productLeft: {
    flex: "1 1 360px",
  },
  productBadge: {
    display: "inline-block",
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "700",
    padding: "6px 14px",
    borderRadius: "20px",
    marginBottom: "20px",
    letterSpacing: "0.3px",
  },
  productH3: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
  },
  productDesc: {
    fontSize: "16px",
    color: "#475569",
    lineHeight: 1.7,
    margin: "0 0 28px",
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  featureItem: {
    display: "flex",
    gap: "10px",
    fontSize: "15px",
    color: "#374151",
    alignItems: "flex-start",
  },
  featureTick: {
    color: "#2563eb",
    fontWeight: "700",
    flexShrink: 0,
    fontSize: "16px",
  },
  productRight: {
    flex: "1 1 320px",
  },
  mockDashboard: {
    background: "#fff",
    borderRadius: "16px",
    border: "1.5px solid #dbeafe",
    padding: "20px",
    boxShadow: "0 8px 32px rgba(37,99,235,0.1)",
  },
  mockHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "1px solid #f1f5f9",
  },
  mockTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#0f172a",
  },
  mockBadgeGreen: {
    background: "#22c55e",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "700",
    padding: "3px 8px",
    borderRadius: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  mockRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 0",
    borderBottom: "1px solid #f8fafc",
  },
  mockAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "700",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  mockInfo: {
    flex: 1,
    minWidth: 0,
  },
  mockName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#0f172a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mockRole: {
    fontSize: "11px",
    color: "#94a3b8",
    marginTop: "2px",
  },
  mockProgress: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
    flexShrink: 0,
  },
  mockBar: {
    width: "80px",
    height: "5px",
    background: "#f1f5f9",
    borderRadius: "3px",
    overflow: "hidden",
  },
  mockFill: {
    height: "100%",
    borderRadius: "3px",
  },
  mockStatus: {
    fontSize: "11px",
    fontWeight: "600",
  },

  // HOW IT WORKS
  howSection: {
    padding: "100px 0",
    background: "#0f172a",
    textAlign: "center",
  },
  stepsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "8px",
  },
  stepCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "36px 28px",
    textAlign: "left",
  },
  stepNum: {
    fontSize: "36px",
    fontWeight: "900",
    color: "#2563eb",
    lineHeight: 1,
    marginBottom: "16px",
    letterSpacing: "-1px",
  },
  stepTitle: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 12px",
  },
  stepDesc: {
    fontSize: "14px",
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
    gap: "24px",
  },
  sectorCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "40px 32px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  sectorIcon: {
    fontSize: "40px",
    marginBottom: "20px",
  },
  sectorTitle: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 12px",
  },
  sectorDesc: {
    fontSize: "15px",
    color: "#64748b",
    lineHeight: 1.7,
    margin: "0 0 24px",
  },
  tagRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tag: {
    background: "#eff6ff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #dbeafe",
  },

  // DEMO CTA
  demoSection: {
    padding: "100px 24px",
    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    textAlign: "center",
  },
  demoInner: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  demoH2: {
    fontSize: "clamp(28px, 4vw, 44px)",
    fontWeight: "800",
    color: "#fff",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
  },
  demoSub: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.7,
    margin: "0 0 40px",
  },
  demoForm: {
    display: "flex",
    gap: "12px",
    maxWidth: "480px",
    margin: "0 auto 24px",
    flexWrap: "wrap",
  },
  demoInput: {
    flex: 1,
    minWidth: "200px",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "none",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    color: "#0f172a",
  },
  demoBtn: {
    background: "#fff",
    color: "#2563eb",
    border: "none",
    borderRadius: "10px",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  demoSuccess: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "12px",
    padding: "24px 32px",
    color: "#fff",
    fontSize: "16px",
    lineHeight: 1.5,
    maxWidth: "480px",
    margin: "0 auto 24px",
    textAlign: "left",
  },
  demoNote: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  },
  demoLink: {
    color: "#fff",
    fontWeight: "600",
  },

  // FOOTER
  footer: {
    background: "#0f172a",
    padding: "48px 24px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  footerInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "40px",
    flexWrap: "wrap",
  },
  footerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerTagline: {
    fontSize: "14px",
    color: "#64748b",
    lineHeight: 1.6,
    margin: 0,
  },
  footerRight: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "flex-end",
  },
  footerLinks: {
    display: "flex",
    gap: "24px",
  },
  footerLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
  },
  footerCopy: {
    fontSize: "13px",
    color: "#475569",
    margin: 0,
  },
};
