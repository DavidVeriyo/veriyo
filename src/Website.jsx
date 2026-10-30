import React, { useState, useEffect, useRef } from "react";
import { VeriyoLogo as VeriyoLogoSVG } from "./Nav";

// ─── SCROLL REVEAL HOOK — re-triggers every time element enters viewport ──────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── TYPING TEXT ──────────────────────────────────────────────────────────────
// Re-types every time the element enters the viewport (hero re-types on scroll back up)
function TypingText({ text, delay = 0, speed = 38, style: styleProp, className }) {
  const [displayed, setDisplayed] = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    clearInterval(intervalRef.current);
    if (!visible) {
      setDisplayed("");
      return;
    }
    let i = 0;
    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalRef.current);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timerRef.current);
      clearInterval(intervalRef.current);
    };
  }, [visible, text, delay, speed]);

  return (
    <span ref={ref} style={styleProp} className={className}>
      {displayed}
      {displayed.length < text.length && visible && (
        <span style={{ borderRight: "2px solid currentColor", marginLeft: 1, animation: "blink 0.7s step-end infinite" }} />
      )}
    </span>
  );
}

// ─── COUNT UP — re-triggers every time element enters viewport ────────────────
function CountUp({ target, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!visible) {
      setCount(0);
      return;
    }
    const num = parseFloat(target);
    const isFloat = target.includes(".");
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = num * eased;
      setCount(isFloat ? val.toFixed(1) : Math.round(val));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [visible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── SECTOR UI MOCKUPS ────────────────────────────────────────────────────────
function AgedCareMockup() {
  return (
    <div style={{ width:"100%", height:"100%", background:"#0a1f12", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ width:"100%", maxWidth:380, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden", fontFamily:"'Inter',sans-serif" }}>
        <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.6)", letterSpacing:"-0.2px" }}>Worker Compliance — Aged Care</span>
          <span style={{ fontSize:10, fontWeight:700, color:"#3dbd74", background:"rgba(61,189,116,0.12)", border:"1px solid rgba(61,189,116,0.2)", borderRadius:4, padding:"2px 8px" }}>ACQSC Ready</span>
        </div>
        <div style={{ padding:"14px 18px 0" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
            {[{n:"18",l:"Compliant",c:"#3dbd74"},{n:"4",l:"Expiring Soon",c:"#f59e0b"},{n:"2",l:"Action Req.",c:"#ef4444"}].map((t,i)=>(
              <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:8, padding:"10px 12px" }}>
                <div style={{ fontSize:20, fontWeight:800, color:t.c, letterSpacing:"-1px" }}>{t.n}</div>
                <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", marginTop:2, fontWeight:500, lineHeight:1.3 }}>{t.l}</div>
              </div>
            ))}
          </div>
          {[
            { name:"Sarah Chen", role:"Personal Carer", checks:"6/6", status:"Compliant", color:"#3dbd74" },
            { name:"James O'Brien", role:"Support Worker", checks:"4/6", status:"Expiring 14 Nov", color:"#f59e0b" },
            { name:"Amara Diallo", role:"Reg. Nurse", checks:"2/6", status:"Action required", color:"#ef4444" },
          ].map((r,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>{r.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.28)" }}>{r.role}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", marginBottom:2 }}>{r.checks} checks</div>
                <div style={{ fontSize:10, fontWeight:700, color:r.color }}>{r.status}</div>
              </div>
            </div>
          ))}
          <div style={{ margin:"12px 0", padding:"10px 14px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:8, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#f59e0b", flexShrink:0 }} />
            <span style={{ fontSize:10, color:"rgba(255,255,255,0.45)", lineHeight:1.4 }}>4 police checks renewing within 30 days — send reminders?</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function NDISMockup() {
  return (
    <div style={{ width:"100%", height:"100%", background:"#0a1525", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ width:"100%", maxWidth:380, fontFamily:"'Inter',sans-serif" }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden", marginBottom:10 }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.6)" }}>NDIS Worker Screening</span>
            <span style={{ fontSize:10, fontWeight:700, color:"#60a5fa", background:"rgba(96,165,250,0.1)", border:"1px solid rgba(96,165,250,0.2)", borderRadius:4, padding:"2px 8px" }}>NDIS Commission</span>
          </div>
          <div style={{ padding:"14px 18px" }}>
            {[
              { name:"Michael Tran", id:"WS-2024-11834", status:"Cleared", exp:"Mar 2027", color:"#3dbd74" },
              { name:"Priya Sharma", id:"WS-2024-09921", status:"Cleared", exp:"Jul 2026", color:"#3dbd74" },
              { name:"David Walsh", id:"WS-2023-77201", status:"Expiring", exp:"Dec 2024", color:"#f59e0b" },
              { name:"Nguyen Linh", id:"Pending", status:"In Progress", exp:"—", color:"#60a5fa" },
            ].map((r,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 0", borderBottom: i<3 ? "1px solid rgba(255,255,255,0.05)":"none" }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>{r.name}</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.25)", fontFamily:"monospace" }}>{r.id}</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:10, fontWeight:700, color:r.color }}>{r.status}</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.25)" }}>Exp: {r.exp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:"rgba(96,165,250,0.06)", border:"1px solid rgba(96,165,250,0.15)", borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#60a5fa", flexShrink:0 }} />
          <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)", lineHeight:1.4 }}>Banning order register check: all workers verified as of today</span>
        </div>
      </div>
    </div>
  );
}

function EarlyLearningMockup() {
  return (
    <div style={{ width:"100%", height:"100%", background:"#191008", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
      <div style={{ width:"100%", maxWidth:380, fontFamily:"'Inter',sans-serif" }}>
        <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.6)" }}>Educator Compliance — ACECQA</span>
            <span style={{ fontSize:10, fontWeight:700, color:"#fbbf24", background:"rgba(251,191,36,0.1)", border:"1px solid rgba(251,191,36,0.2)", borderRadius:4, padding:"2px 8px" }}>NQF Ready</span>
          </div>
          <div style={{ padding:"14px 18px" }}>
            <div style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600 }}>Overall compliance rate</span>
                <span style={{ fontSize:10, fontWeight:700, color:"#fbbf24" }}>87%</span>
              </div>
              <div style={{ height:4, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ width:"87%", height:"100%", background:"linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius:2 }} />
              </div>
            </div>
            {[
              { label:"Working With Children Check", done:14, total:14, color:"#3dbd74" },
              { label:"Anaphylaxis Management", done:11, total:14, color:"#fbbf24" },
              { label:"Cert III/IV Early Childhood Ed.", done:13, total:14, color:"#3dbd74" },
              { label:"First Aid & CPR", done:10, total:14, color:"#f59e0b" },
            ].map((row,i)=>(
              <div key={i} style={{ padding:"9px 0", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span style={{ fontSize:10, color:"rgba(255,255,255,0.55)", fontWeight:500 }}>{row.label}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:row.color }}>{row.done}/{row.total}</span>
                </div>
                <div style={{ height:3, background:"rgba(255,255,255,0.06)", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${(row.done/row.total)*100}%`, height:"100%", background:row.color, borderRadius:2, opacity:0.7 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%", textAlign: "left", background: "none", border: "none",
          padding: "22px 0", cursor: "pointer", display: "flex",
          justifyContent: "space-between", alignItems: "center", gap: 16,
          fontFamily: "inherit",
        }}
        aria-expanded={open}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 20, color: GREEN, fontWeight: 300, flexShrink: 0, lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0, overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div style={{ padding: "0 0 22px", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.8 }}>{a}</div>
      </div>
    </div>
  );
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const GREEN = "#2d9e5f";
const GREEN_BRIGHT = "#3dbd74";
const DEEP = "#060f0a";
const FOREST = "#0a1f12";
const FOREST2 = "#0d2b1a";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
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
      if (res.ok) setDemoSubmitted(true);
      else alert("Something went wrong — please email david@veriyo.com.au directly.");
    } catch {
      alert("Something went wrong — please email david@veriyo.com.au directly.");
    }
  }

  return (
    <div style={s.page}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        .reveal { opacity:0; transform:translateY(28px); transition:opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .reveal.in { opacity:1; transform:translateY(0); }
        .reveal-d1 { transition-delay:0.1s; }
        .reveal-d2 { transition-delay:0.2s; }
        .reveal-d3 { transition-delay:0.3s; }
        .reveal-d4 { transition-delay:0.4s; }
        .nav-link:hover { color:#fff !important; }
        .sector-card::-webkit-scrollbar { display:none; }
        .h-scroll::-webkit-scrollbar { display:none; }
        .demo-input:focus { border-color:${GREEN} !important; outline:none; }
        .demo-input::placeholder { color:rgba(255,255,255,0.2); }
        .faq-link:hover { color:${GREEN_BRIGHT} !important; }
        @media(max-width:768px){
          .nav-links-wrap{display:none!important}
          .hero-h1{font-size:clamp(42px,11vw,72px)!important;letter-spacing:-3px!important}
          .hero-cols{flex-direction:column!important;gap:40px!important}
          .problem-inner{flex-direction:column!important;gap:48px!important}
          .how-grid{grid-template-columns:1fr!important}
          .demo-inner{flex-direction:column!important}
          .footer-inner{flex-direction:column!important;gap:40px!important}
          .products-split{flex-direction:column!important}
          .products-split-rev{flex-direction:column-reverse!important}
          .sectors-grid{grid-template-columns:1fr!important}
          .sector-card-mockup{height:200px!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <VeriyoLogoSVG height={34} darkText={false} />
          <div style={s.navLinks} className="nav-links-wrap">
            {["#products", "#why", "#sectors", "#faq", "/blog/", "#demo"].map((href, i) => (
              <a key={i} href={href} style={s.navLink} className="nav-link">
                {["Products","Why Veriyo","Sectors","FAQ","Blog","Get Demo"][i]}
              </a>
            ))}
          </div>
          <div style={s.navActions}>
            <button onClick={onLogin} style={s.loginBtn}>Log in</button>
            <a href="#demo" style={s.demoNavBtn}>Request Demo</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={s.hero}>
        {/* noise texture overlay */}
        <div style={s.heroNoise} />
        {/* glow orbs */}
        <div style={{ ...s.heroOrb, width: 600, height: 600, top: -100, left: -100, background: "radial-gradient(circle, rgba(45,158,95,0.18) 0%, transparent 70%)" }} />
        <div style={{ ...s.heroOrb, width: 400, height: 400, top: 200, right: -80, background: "radial-gradient(circle, rgba(45,158,95,0.10) 0%, transparent 70%)" }} />

        <div style={s.heroInner}>
          <div style={{ animation: "fadeIn 0.6s ease both" }}>
            <p style={s.heroKicker}>🇦🇺 Built for Australian care providers</p>
          </div>
          <h1 style={s.heroH1} className="hero-h1">
            <TypingText text="Compliance that" delay={200} speed={42} />
            <br />
            <span style={s.heroEm}>
              <TypingText text="never misses" delay={900} speed={42} />
            </span>
            <br />
            <TypingText text="a thing." delay={1600} speed={42} />
          </h1>
          <div style={s.heroCols} className="hero-cols">
            <p style={s.heroSub}>
              Veriyo is workforce compliance software purpose-built for Australian aged care,
              NDIS, and early learning providers. Every credential. Every clearance.
              Audit-ready from Day&nbsp;1.
            </p>
            <div style={s.heroActions}>
              <a href="#demo" style={s.heroPrimary}>Request a Demo</a>
              <button onClick={onLogin} style={s.heroSecondary}>View live demo →</button>
            </div>
          </div>

          {/* Stats row */}
          <div style={s.heroStats}>
            {[
              { num: "100", suffix: "%", label: "audit-ready from Day 1" },
              { num: "3", suffix: "", label: "care sectors covered" },
              { num: "30", suffix: "s", label: "to generate a compliance report" },
            ].map((st, i) => (
              <div key={i} style={s.heroStat}>
                <div style={s.heroStatNum}>
                  <CountUp target={st.num} suffix={st.suffix} />
                </div>
                <div style={s.heroStatLabel}>{st.label}</div>
              </div>
            ))}
          </div>

          {/* Dashboard mock */}
          <div style={s.heroMockWrap}>
            <div style={s.heroMock}>
              <div style={s.mockBar}>
                <div style={s.mockDots}>
                  <span style={{ ...s.mockDot, background: "#ef4444" }} />
                  <span style={{ ...s.mockDot, background: "#f59e0b" }} />
                  <span style={{ ...s.mockDot, background: "#22c55e" }} />
                </div>
                <div style={s.mockUrl}>app.veriyo.com.au / compliance</div>
                <span style={s.mockLiveDot} />
                <span style={s.mockLiveLabel}>Live</span>
              </div>
              <div style={s.mockBody}>
                <div style={s.mockTiles}>
                  {[
                    { n: "24", l: "Compliant", c: GREEN_BRIGHT },
                    { n: "8", l: "In Progress", c: "#f59e0b" },
                    { n: "3", l: "Action Required", c: "#ef4444" },
                    { n: "35", l: "Total Workers", c: "rgba(255,255,255,0.5)" },
                  ].map((t, i) => (
                    <div key={i} style={{ ...s.mockTile, background: i === 0 ? "rgba(45,158,95,0.15)" : "rgba(255,255,255,0.04)" }}>
                      <div style={{ fontSize: 22, fontWeight: 800, color: t.c, letterSpacing: "-1px" }}>{t.n}</div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 2, fontWeight: 500 }}>{t.l}</div>
                    </div>
                  ))}
                </div>
                <div style={s.mockTable}>
                  <div style={s.mockTableHead}>
                    {["Worker", "Role", "Checks", "Status"].map((h, i) => (
                      <div key={i} style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
                    ))}
                  </div>
                  {[
                    { name: "Sarah Chen", role: "Support Worker", checks: "6/6", status: "Compliant", sc: GREEN_BRIGHT },
                    { name: "James O'Brien", role: "Registered Nurse", checks: "4/6", status: "2 pending", sc: "#f59e0b" },
                    { name: "Amara Diallo", role: "Personal Carer", checks: "3/6", status: "In progress", sc: "#f59e0b" },
                    { name: "Michael Tran", role: "Team Leader", checks: "1/6", status: "Action req.", sc: "#ef4444" },
                  ].map((r, i) => (
                    <div key={i} style={{ ...s.mockTableRow, borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{r.role}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{r.checks}</div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: r.sc }}>{r.status}</div>
                    </div>
                  ))}
                </div>
                <div style={s.mockAlert}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, animation: "pulse 2s ease infinite" }} />
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>3 workers have checks expiring within 30 days — send reminders?</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATEMENT BAND ── */}
      <RevealSection style={s.statementBand}>
        <div style={s.statementInner}>
          <p style={s.statementEyebrow}>The Problem</p>
          <h2 style={s.statementH2}>
            Most compliance failures aren't accidents.<br />
            They're <em style={{ color: GREEN_BRIGHT, fontStyle: "italic" }}>spreadsheets.</em>
          </h2>
        </div>
      </RevealSection>

      {/* ── PROBLEM — large stats ── */}
      <section id="why" style={s.problemSection}>
        <div style={s.problemInner} className="problem-inner">
          <div style={s.problemLeft}>
            <p style={s.sectionLabel}>The Cost of Manual Compliance</p>
            <p style={s.problemIntro}>
              Australian care providers face increasing regulatory scrutiny.
              Manual tracking leaves teams exposed — and workers at risk.
            </p>
          </div>
          <div style={s.problemRight}>
            {[
              { stat: "68%", colour: GREEN_BRIGHT, label: "of providers still track compliance in spreadsheets", desc: "Manual processes create gaps that auditors find — and regulators penalise." },
              { stat: "$14k", colour: "#f59e0b", label: "average fine per compliance breach in aged care", desc: "ACQSC and NDIS Commission enforcement actions are increasing year on year." },
              { stat: "30+", colour: "#ef4444", label: "checks required per worker before Day 1", desc: "Police checks, WWCC, NDIS screening, qualifications, inductions — tracked manually by your team." },
              { stat: "1 click", colour: GREEN_BRIGHT, label: "to generate a full audit report with Veriyo", desc: "Instead of days pulling files, give auditors a complete compliance snapshot instantly." },
            ].map((item, i) => (
              <RevealRow key={i} delay={i * 80} style={s.problemRow} className="problem-row">
                <div style={{ ...s.problemStat, color: item.colour }}>{item.stat}</div>
                <div style={s.problemText}>
                  <div style={s.problemLabel}>{item.label}</div>
                  <p style={s.problemDesc}>{item.desc}</p>
                </div>
              </RevealRow>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={s.productsSection}>
        <div style={s.productsSectionInner}>
          <RevealSection>
            <p style={s.sectionLabel}>Two Products. One Platform.</p>
            <h2 style={s.productsH2}>Built for every stage<br />of the compliance lifecycle.</h2>
          </RevealSection>

          {[
            {
              num: "01",
              name: "Veriyo Onboard",
              tagline: "From offer to compliant — before Day 1.",
              desc: "Manage the entire pre-employment compliance pipeline. Collect documents, track clearances, and ensure every new worker is fully compliant before they set foot on site.",
              features: ["Police check tracking", "NDIS Worker Screening", "WWCC management", "Qualification verification", "Policy acknowledgements", "Automated worker reminders"],
              callout: "ACQSC · NDIS Commission · ACECQA compliant",
              rev: false,
            },
            {
              num: "02",
              name: "Veriyo Verify",
              tagline: "Every contractor. Every visit. Verified.",
              desc: "Screen contractors, agency staff, locums and allied health professionals before they arrive. Real-time compliance status for every external worker across all your sites.",
              features: ["Contractor screening", "Agency staff compliance", "Visitor credential checks", "Real-time status alerts", "Multi-site management", "Audit-ready reports"],
              callout: "Designed for aged care, NDIS, and early learning",
              rev: true,
            },
          ].map((p, i) => (
            <RevealSection key={i}>
              <div style={{ ...s.productSplit, flexDirection: p.rev ? "row-reverse" : "row" }} className={p.rev ? "products-split-rev" : "products-split"}>
                <div style={s.productLeft}>
                  <div style={s.productNum}>{p.num}</div>
                  <h3 style={s.productH3}>{p.name}</h3>
                  <p style={s.productTagline}>{p.tagline}</p>
                  <p style={s.productDesc}>{p.desc}</p>
                  <div style={s.featureGrid}>
                    {p.features.map((f, j) => (
                      <div key={j} style={s.featureChip}>
                        <span style={s.featureDot} />
                        {f}
                      </div>
                    ))}
                  </div>
                  <p style={s.productCallout}>{p.callout}</p>
                  <a href="#demo" style={s.productCta}>Request a demo →</a>
                </div>
                <div style={s.productRight}>
                  <div style={{ width: "100%", height: "100%", minHeight: 400 }}>
                    {i === 0 ? <AgedCareMockup /> : <NDISMockup />}
                  </div>
                </div>
              </div>
              {i === 0 && <div style={s.productDivider} />}
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={s.howSection}>
        <div style={s.howInner}>
          <RevealSection>
            <p style={s.sectionLabelLight}>How It Works</p>
            <h2 style={s.howH2}>Up and running<br />in under a week.</h2>
          </RevealSection>
          <div style={s.howGrid} className="how-grid">
            {[
              { n: "01", title: "Connect your workforce", desc: "Import your workers via CSV or add them manually. Veriyo structures your compliance data from day one." },
              { n: "02", title: "Set your requirements", desc: "Configure the checks required by sector — aged care, NDIS, early learning. Veriyo knows the rules." },
              { n: "03", title: "Automated reminders", desc: "Workers and managers are alerted before credentials expire. No more chasing. No more gaps." },
              { n: "04", title: "Audit-ready in one click", desc: "When auditors arrive, generate a complete compliance report instantly. Every credential. Every worker." },
            ].map((step, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div style={s.howStep}>
                  <div style={s.howStepN}>{step.n}</div>
                  <div style={s.howStepLine} />
                  <h3 style={s.howStepTitle}>{step.title}</h3>
                  <p style={s.howStepDesc}>{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS — 3-card static layout ── */}
      <RevealSection style={s.sectorsSection}>
        <div style={s.sectorsHeader}>
          <p style={s.sectionLabel}>Built For Your Sector</p>
          <h2 style={s.sectorsH2}>Every sector. Every rule. Covered.</h2>
        </div>
        <div style={s.sectorsGrid} className="sectors-grid">
          {[
            {
              label:"Aged Care", tag:"ACQSC · Aged Care Quality Standards", accent:GREEN_BRIGHT,
              desc:"Track every mandatory requirement under the Aged Care Quality Standards — police checks, qualifications, Code of Conduct acknowledgements, and more.",
              checks:["National Police Check","Aged Care Code of Conduct","Certificate III / IV in Aged Care","First Aid & CPR","Manual Handling","ACQSC audit readiness"],
              Mockup: AgedCareMockup,
            },
            {
              label:"NDIS", tag:"NDIS Commission · Worker Screening", accent:"#60a5fa",
              desc:"Stay compliant with the NDIS Practice Standards. Track Worker Screening clearances, monitor the banning order register, and keep every support worker verified.",
              checks:["NDIS Worker Screening Check","NDIS Practice Standards","Working With Children Check","First Aid certificate","Banning order monitoring","NDIS Commission audit readiness"],
              Mockup: NDISMockup,
            },
            {
              label:"Early Learning", tag:"ACECQA · National Quality Framework", accent:"#fbbf24",
              desc:"Meet every requirement under the National Quality Framework. Track WWCC, educator qualifications, anaphylaxis training, and child safety compliance.",
              checks:["Working With Children Check","ACECQA educator qualifications","Anaphylaxis management","Child Safe Standards","First Aid & CPR","National Quality Framework"],
              Mockup: EarlyLearningMockup,
            },
          ].map((sector, i) => (
            <div key={i} style={s.sectorCard}>
              <div style={s.sectorCardMockup}>
                <sector.Mockup />
              </div>
              <div style={s.sectorCardBody}>
                <p style={{ ...s.sectorTag, color:sector.accent, borderColor:sector.accent }}>{sector.tag}</p>
                <h3 style={{ ...s.sectorTitle, color: sector.accent }}>{sector.label}</h3>
                <p style={s.sectorDesc}>{sector.desc}</p>
                <ul style={s.sectorChecks}>
                  {sector.checks.map((c,j)=>(
                    <li key={j} style={s.sectorCheck}>
                      <span style={{ color:sector.accent, fontWeight:700, fontSize:12 }}>✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── PULL QUOTE ── */}
      <RevealSection style={s.quoteSection}>
        <div style={s.quoteInner}>
          <div style={s.quoteRule} />
          <p style={s.quoteText}>
            "The ones who get compliance right don't work harder —
            they work with better systems."
          </p>
          <p style={s.quoteAttr}>Built for compliance managers who are done firefighting.</p>
        </div>
      </RevealSection>

      {/* ── FAQ ── */}
      <section id="faq" style={s.faqSection}>
        <div style={s.faqInner}>
          <RevealSection style={s.faqLeft}>
            <p style={s.sectionLabel}>FAQ</p>
            <h2 style={s.faqH2}>Common<br />questions.</h2>
            <p style={s.faqSub}>Everything else: <a href="mailto:hello@veriyo.com.au" style={{ color: GREEN_BRIGHT, textDecoration: "none" }} className="faq-link">hello@veriyo.com.au</a></p>
          </RevealSection>
          <div style={s.faqRight}>
            {[
              { q: "What compliance checks does Veriyo track for aged care workers?", a: "Veriyo tracks all mandatory requirements including National Police Checks, NDIS Worker Screening, Working With Children Checks, aged care qualifications (Certificate III and IV), First Aid and CPR certificates, and mandatory policy acknowledgements such as the Aged Care Code of Conduct." },
              { q: "Does Veriyo support NDIS Worker Screening compliance?", a: "Yes. Veriyo tracks which workers hold a current NDIS Worker Screening clearance, flags those pending or expired, and monitors the NDIS banning order register so providers can verify a worker before they begin work." },
              { q: "How does Veriyo help early learning centres with compliance?", a: "Veriyo tracks Working With Children Checks, early childhood education qualifications, First Aid certificates, Anaphylaxis management training, and supports the National Child Safe Standards and ACECQA educator qualification requirements." },
              { q: "What's the difference between Veriyo Onboard and Veriyo Verify?", a: "Veriyo Onboard manages the pre-employment compliance pipeline for new employees — collecting documents, tracking clearances, and ensuring compliance before Day 1. Veriyo Verify manages ongoing compliance for contractors, agency staff, locums, and allied health professionals." },
              { q: "Is Veriyo suitable for multi-site providers?", a: "Yes. Veriyo gives compliance managers a single dashboard across their entire workforce, with filtering by site, sector, role type, and compliance status. Audit reports can be generated for individual sites or the whole organisation." },
              { q: "How does Veriyo help prepare for an audit?", a: "Veriyo generates a one-click Compliance Audit Report covering every worker's credential status, policy acknowledgements, and outstanding items — giving auditors a complete picture in seconds rather than days." },
            ].map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
          </div>
        </div>
      </section>

      {/* ── DEMO CTA ── */}
      <section id="demo" style={s.demoSection}>
        <div style={s.demoOrb} />
        <div style={s.demoInner} className="demo-inner">
          <RevealSection style={s.demoLeft}>
            <p style={s.sectionLabelLight}>Get Started</p>
            <h2 style={s.demoH2}>Ready to see<br />Veriyo in action?</h2>
            <p style={s.demoSub}>
              Book a personalised walkthrough with our team. We'll show you exactly how
              Veriyo works for your sector and your team size.
            </p>
            <div style={s.demoChips}>
              {["ACQSC compliant", "NDIS Commission ready", "ACECQA supported", "Australian-built"].map((c, i) => (
                <span key={i} style={s.demoChip}>{c}</span>
              ))}
            </div>
          </RevealSection>
          <div style={s.demoRight}>
            {demoSubmitted ? (
              <div style={s.demoSuccess}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>We'll be in touch shortly.</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Usually within one business day.</div>
              </div>
            ) : (
              <form onSubmit={handleDemoRequest} style={s.demoForm}>
                {[
                  { ph: "Your name", val: demoName, set: setDemoName, type: "text" },
                  { ph: "Organisation name", val: demoOrg, set: setDemoOrg, type: "text" },
                  { ph: "Work email", val: demoEmail, set: setDemoEmail, type: "email" },
                  { ph: "Phone (optional)", val: demoPhone, set: setDemoPhone, type: "tel" },
                ].map((f, i) => (
                  <input
                    key={i}
                    type={f.type}
                    placeholder={f.ph}
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    required={f.type !== "tel"}
                    style={s.demoInput}
                    className="demo-input"
                  />
                ))}
                <button type="submit" style={s.demoBtn}>Request a Demo</button>
                <p style={s.demoNote}>No spam. No lock-in. Just a conversation.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── GEO SEO BAND (hidden visually but indexed) ── */}
      <div style={{ background: DEEP, padding: "40px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", lineHeight: 1.8, margin: 0 }}>
            Veriyo provides workforce compliance software for Australian aged care providers, NDIS registered providers, and early learning centres across New South Wales, Victoria, Queensland, Western Australia, and South Australia. Our platform supports ACQSC audit preparation, NDIS Worker Screening compliance, ACECQA educator qualification tracking, and Working With Children Check (WWCC) management. Built in Sydney, serving care providers across Australia.
          </p>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <div style={s.footerInner} className="footer-inner">
          <div style={s.footerBrand}>
            <VeriyoLogoSVG height={32} darkText={false} />
            <p style={s.footerTagline}>Workforce compliance software<br />for Australian care providers.</p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", margin: 0 }}>hello@veriyo.com.au</p>
          </div>
          <div style={s.footerLinks}>
            {[
              { head: "Product", links: [["Products", "#products"], ["Why Veriyo", "#why"], ["Sectors", "#sectors"], ["Request Demo", "#demo"]] },
              { head: "Resources", links: [["Blog", "/blog/"], ["FAQ", "#faq"], ["Privacy Policy", "/privacy/"]] },
              { head: "Sectors", links: [["Aged Care", "#sectors"], ["NDIS", "#sectors"], ["Early Learning", "#sectors"]] },
            ].map((col, i) => (
              <div key={i} style={s.footerCol}>
                <p style={s.footerColHead}>{col.head}</p>
                {col.links.map(([label, href], j) => (
                  <a key={j} href={href} style={s.footerLink} className="faq-link">{label}</a>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={s.footerBottom}>
          <p style={s.footerCopy}>© {new Date().getFullYear()} Veriyo. All rights reserved. ABN to be confirmed. Built in Sydney, Australia.</p>
        </div>
      </footer>
    </div>
  );
}

// ─── REVEAL WRAPPER ───────────────────────────────────────────────────────────
function RevealSection({ children, style: styleProp, delay = 0 }) {
  const [ref, visible] = useReveal(0.12);
  return (
    <div
      ref={ref}
      style={{
        ...styleProp,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.75s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function RevealRow({ children, style: styleProp, delay = 0, className }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...styleProp,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    color: "#fff",
    margin: 0,
    padding: 0,
    overflowX: "hidden",
    background: DEEP,
  },

  // NAV
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(6,15,10,0.92)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  navInner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 40px",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 32,
  },
  navLinks: {
    display: "flex",
    gap: 32,
    alignItems: "center",
  },
  navLink: {
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: "-0.1px",
    transition: "color 0.2s",
  },
  navActions: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  loginBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "rgba(255,255,255,0.6)",
    borderRadius: 7,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 500,
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
    letterSpacing: "-0.1px",
  },

  // HERO
  hero: {
    background: `linear-gradient(160deg, ${DEEP} 0%, ${FOREST} 50%, ${FOREST2} 100%)`,
    paddingTop: 96,
    paddingBottom: 0,
    position: "relative",
    overflow: "hidden",
  },
  heroNoise: {
    position: "absolute",
    inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
    backgroundSize: "200px 200px",
    pointerEvents: "none",
    opacity: 0.4,
  },
  heroOrb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  heroInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px 80px",
    position: "relative",
    zIndex: 1,
  },
  heroKicker: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.5px",
    color: GREEN_BRIGHT,
    margin: "0 0 28px",
    animation: "fadeIn 0.8s ease 0.1s both",
  },
  heroH1: {
    fontSize: "clamp(52px, 8vw, 96px)",
    fontWeight: 900,
    lineHeight: 1.0,
    letterSpacing: "-4px",
    margin: "0 0 40px",
    color: "#fff",
  },
  heroEm: {
    color: GREEN_BRIGHT,
    fontStyle: "italic",
  },
  heroCols: {
    display: "flex",
    gap: 80,
    alignItems: "flex-start",
    marginBottom: 64,
    flexWrap: "wrap",
  },
  heroSub: {
    flex: "1 1 360px",
    fontSize: 17,
    color: "rgba(255,255,255,0.45)",
    lineHeight: 1.75,
    margin: 0,
    letterSpacing: "-0.1px",
  },
  heroActions: {
    flex: "0 0 auto",
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
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "-0.1px",
    display: "inline-block",
  },
  heroSecondary: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.4)",
    fontSize: 13,
    cursor: "pointer",
    fontFamily: "inherit",
    padding: 0,
    letterSpacing: "-0.1px",
  },
  heroStats: {
    display: "flex",
    gap: 0,
    marginBottom: 64,
    flexWrap: "wrap",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  heroStat: {
    padding: "24px 40px 24px 0",
    marginRight: 40,
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  heroStatNum: {
    fontSize: 36,
    fontWeight: 900,
    color: "#fff",
    letterSpacing: "-2px",
    lineHeight: 1,
    marginBottom: 4,
  },
  heroStatLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.3)",
    fontWeight: 500,
    letterSpacing: "-0.1px",
  },

  // HERO MOCK
  heroMockWrap: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
    position: "relative",
    zIndex: 1,
  },
  heroMock: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
    boxShadow: "0 -8px 64px rgba(45,158,95,0.08)",
  },
  mockBar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 20px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  mockDots: { display: "flex", gap: 6 },
  mockDot: { width: 10, height: 10, borderRadius: "50%", display: "inline-block" },
  mockUrl: { flex: 1, fontSize: 11, color: "rgba(255,255,255,0.2)", fontWeight: 500 },
  mockLiveDot: { width: 6, height: 6, borderRadius: "50%", background: GREEN_BRIGHT, display: "inline-block", animation: "pulse 2s ease infinite" },
  mockLiveLabel: { fontSize: 10, fontWeight: 700, color: GREEN_BRIGHT, textTransform: "uppercase", letterSpacing: "0.5px" },
  mockBody: { padding: "20px 24px 0" },
  mockTiles: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 12,
    marginBottom: 16,
  },
  mockTile: {
    borderRadius: 10,
    padding: "14px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
  },
  mockTable: {
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  mockTableHead: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1fr 1.2fr",
    padding: "10px 16px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    gap: 8,
  },
  mockTableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1fr 1.2fr",
    padding: "10px 16px",
    alignItems: "center",
    gap: 8,
  },
  mockAlert: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    background: "rgba(245,158,11,0.07)",
    borderTop: "1px solid rgba(245,158,11,0.15)",
  },

  // STATEMENT BAND
  statementBand: {
    padding: "100px 40px",
    background: "#fff",
  },
  statementInner: {
    maxWidth: 1160,
    margin: "0 auto",
  },
  statementEyebrow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: GREEN,
    margin: "0 0 20px",
  },
  statementH2: {
    fontSize: "clamp(36px, 5.5vw, 72px)",
    fontWeight: 900,
    color: "#060f0a",
    lineHeight: 1.05,
    margin: 0,
    letterSpacing: "-3px",
    textWrap: "balance",
  },

  // SHARED
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: GREEN_BRIGHT,
    margin: "0 0 20px",
  },
  sectionLabelLight: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.3)",
    margin: "0 0 20px",
  },

  // PROBLEM
  problemSection: {
    padding: "120px 40px",
    background: "#fff",
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
    flex: "0 0 280px",
    position: "sticky",
    top: 80,
  },
  problemIntro: {
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: 0,
  },
  problemRight: {
    flex: 1,
    minWidth: 0,
  },
  problemRow: {
    display: "flex",
    gap: 40,
    alignItems: "flex-start",
    padding: "40px 0",
    borderBottom: "1px solid #ebebeb",
  },
  problemStat: {
    fontSize: "clamp(40px,5vw,60px)",
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
    color: "#0f172a",
    margin: "0 0 8px",
    letterSpacing: "-0.3px",
    lineHeight: 1.3,
  },
  problemDesc: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 1.75,
    margin: 0,
  },

  // PRODUCTS
  productsSection: {
    background: DEEP,
    paddingBottom: 120,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  productsSectionInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "120px 40px 0",
  },
  productsH2: {
    fontSize: "clamp(32px,4.5vw,60px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 72px",
    letterSpacing: "-3px",
    lineHeight: 1.05,
    textWrap: "balance",
  },
  productSplit: {
    display: "flex",
    gap: 0,
    alignItems: "stretch",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 0,
  },
  productLeft: {
    flex: "1 1 480px",
    padding: "64px 56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 0,
  },
  productRight: {
    flex: "1 1 400px",
    minHeight: 480,
    background: FOREST,
  },
  productNum: {
    fontSize: 56,
    fontWeight: 900,
    color: "rgba(45,158,95,0.2)",
    letterSpacing: "-3px",
    lineHeight: 1,
    marginBottom: 16,
  },
  productH3: {
    fontSize: "clamp(28px,3.5vw,44px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "-2px",
    lineHeight: 1.05,
  },
  productTagline: {
    fontSize: 14,
    color: "rgba(255,255,255,0.35)",
    margin: "0 0 20px",
  },
  productDesc: {
    fontSize: 15,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.75,
    margin: "0 0 28px",
    letterSpacing: "-0.1px",
  },
  featureGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 20px",
    marginBottom: 24,
  },
  featureChip: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontWeight: 500,
  },
  featureDot: {
    width: 5,
    height: 5,
    borderRadius: "50%",
    background: GREEN_BRIGHT,
    flexShrink: 0,
  },
  productCallout: {
    fontSize: 11,
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.3px",
    margin: "0 0 20px",
    fontWeight: 500,
  },
  productCta: {
    color: GREEN_BRIGHT,
    fontWeight: 700,
    fontSize: 13,
    textDecoration: "none",
    letterSpacing: "-0.1px",
  },
  productDivider: {
    height: 1,
    background: "rgba(255,255,255,0.05)",
    margin: "24px 0",
  },

  // HOW IT WORKS
  howSection: {
    background: FOREST,
    padding: "120px 0",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  howInner: {
    maxWidth: 1160,
    margin: "0 auto",
    padding: "0 40px",
  },
  howH2: {
    fontSize: "clamp(36px,5vw,64px)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.0,
    margin: "0 0 72px",
    letterSpacing: "-3px",
    textWrap: "balance",
  },
  howGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 0,
  },
  howStep: {
    padding: "40px 32px 40px 0",
    borderLeft: "1px solid rgba(255,255,255,0.07)",
    paddingLeft: 32,
  },
  howStepN: {
    fontSize: 52,
    fontWeight: 900,
    color: "rgba(255,255,255,0.05)",
    lineHeight: 1,
    marginBottom: 28,
    letterSpacing: "-2px",
  },
  howStepLine: {
    width: 28,
    height: 2,
    background: GREEN,
    marginBottom: 20,
  },
  howStepTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    margin: "0 0 10px",
    letterSpacing: "-0.3px",
  },
  howStepDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.35)",
    lineHeight: 1.75,
    margin: 0,
  },

  // SECTORS — clean 3-card static layout
  sectorsSection: {
    background: DEEP,
    borderTop: "1px solid rgba(255,255,255,0.05)",
    padding: "100px 40px 120px",
  },
  sectorsHeader: {
    textAlign: "center",
    marginBottom: 64,
  },
  sectorsH2: {
    fontSize: "clamp(28px,3vw,44px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 0",
    letterSpacing: "-2px",
    lineHeight: 1.1,
  },
  sectorsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 24,
    maxWidth: 1280,
    margin: "0 auto",
  },
  sectorCard: {
    background: FOREST,
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  sectorCardMockup: {
    height: 260,
    overflow: "hidden",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    flexShrink: 0,
  },
  sectorCardBody: {
    padding: "28px 28px 32px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  sectorTag: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    border: "1px solid",
    borderRadius: 5,
    padding: "3px 10px",
    display: "inline-block",
    margin: "0 0 12px",
  },
  sectorTitle: {
    fontSize: "clamp(22px,2.5vw,32px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 8px",
    letterSpacing: "-1.5px",
  },
  sectorDesc: {
    fontSize: 13,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.7,
    margin: "0 0 16px",
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
    fontSize: 11,
    color: "rgba(255,255,255,0.45)",
    fontWeight: 500,
  },

  // PULL QUOTE
  quoteSection: {
    padding: "96px 40px",
    background: FOREST,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  quoteInner: {
    maxWidth: 800,
    margin: "0 auto",
  },
  quoteRule: {
    width: 40,
    height: 3,
    background: GREEN,
    marginBottom: 32,
  },
  quoteText: {
    fontSize: "clamp(20px,2.8vw,32px)",
    color: "#fff",
    lineHeight: 1.45,
    fontStyle: "italic",
    fontWeight: 700,
    margin: "0 0 20px",
    letterSpacing: "-1px",
    opacity: 0.85,
  },
  quoteAttr: {
    fontSize: 13,
    color: "rgba(255,255,255,0.25)",
    margin: 0,
    fontStyle: "normal",
  },

  // FAQ
  faqSection: {
    padding: "120px 40px",
    background: DEEP,
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  faqInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 96,
    alignItems: "flex-start",
  },
  faqLeft: {
    flex: "0 0 260px",
    position: "sticky",
    top: 80,
  },
  faqH2: {
    fontSize: "clamp(28px,3.5vw,44px)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.05,
    margin: "0 0 16px",
    letterSpacing: "-2.5px",
  },
  faqSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.25)",
    margin: 0,
    lineHeight: 1.7,
  },
  faqRight: {
    flex: 1,
    minWidth: 0,
  },

  // DEMO
  demoSection: {
    background: FOREST2,
    padding: "120px 40px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    position: "relative",
    overflow: "hidden",
  },
  demoOrb: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(45,158,95,0.12) 0%, transparent 70%)",
    top: -200,
    right: -100,
    pointerEvents: "none",
  },
  demoInner: {
    maxWidth: 1160,
    margin: "0 auto",
    display: "flex",
    gap: 96,
    alignItems: "flex-start",
    position: "relative",
    zIndex: 1,
  },
  demoLeft: {
    flex: "1 1 400px",
  },
  demoH2: {
    fontSize: "clamp(40px,5.5vw,72px)",
    fontWeight: 900,
    color: "#fff",
    margin: "0 0 20px",
    letterSpacing: "-4px",
    lineHeight: 1.0,
  },
  demoSub: {
    fontSize: 15,
    color: "rgba(255,255,255,0.4)",
    lineHeight: 1.75,
    margin: "0 0 32px",
    maxWidth: 400,
  },
  demoChips: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  demoChip: {
    fontSize: 11,
    fontWeight: 600,
    color: "rgba(255,255,255,0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 5,
    padding: "4px 10px",
    letterSpacing: "0.2px",
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
    color: "#fff",
    background: "rgba(255,255,255,0.04)",
    letterSpacing: "-0.1px",
    width: "100%",
    transition: "border-color 0.2s",
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
    background: "rgba(45,158,95,0.08)",
    border: "1px solid rgba(45,158,95,0.2)",
    borderRadius: 12,
    padding: "56px 32px",
    textAlign: "center",
  },
  demoNote: {
    fontSize: 12,
    color: "rgba(255,255,255,0.2)",
    margin: "6px 0 0",
    textAlign: "center",
  },

  // FOOTER
  footer: {
    background: "#030a05",
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
    color: "rgba(255,255,255,0.2)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    margin: "0 0 6px",
  },
  footerLink: {
    color: "rgba(255,255,255,0.35)",
    textDecoration: "none",
    fontSize: 13,
    letterSpacing: "-0.1px",
    transition: "color 0.2s",
  },
  footerBottom: {
    borderTop: "1px solid rgba(255,255,255,0.04)",
    padding: "20px 0",
    maxWidth: 1160,
    margin: "0 auto",
  },
  footerCopy: {
    fontSize: 12,
    color: "rgba(255,255,255,0.12)",
    margin: 0,
  },
};
