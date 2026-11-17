// ─── Veriyo Career Passport — Worker-facing public signup ────────────────────
import { useState } from "react";
import { VeriyoLogo, VeriyoIcon } from "./Nav";

// ─── BRAND COLOURS (mirrors Dashboard.jsx) ────────────────────────────────────
const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  primaryBorder: "#b8deca",
  white: "#ffffff", bg: "#f4f7f5",
  border: "#e3ede8", borderLight: "#f0f5f2",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
  forest: "#0a1f12",
};

const FONT = "'Segoe UI', system-ui, -apple-system, sans-serif";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SECTORS = [
  { id: "agedCare",      label: "Aged Care",        icon: "🏥" },
  { id: "ndis",          label: "NDIS / Disability", icon: "♿" },
  { id: "earlyLearning", label: "Early Learning",    icon: "🌱" },
  { id: "homeCare",      label: "Home Care",         icon: "🏠" },
];

const ROLES = {
  agedCare:      ["Personal Care Worker", "Enrolled Nurse", "Registered Nurse", "Care Coordinator", "Allied Health", "Team Leader", "Other"],
  ndis:          ["Support Worker", "Support Coordinator", "Behaviour Support Practitioner", "Allied Health", "Team Leader", "Other"],
  earlyLearning: ["Educator", "Lead Educator", "Educational Leader", "Centre Director", "Cook / Kitchen Staff", "Other"],
  homeCare:      ["Home Care Worker", "Care Manager", "Case Coordinator", "Allied Health", "Other"],
};

const ALL_CHECKS = [
  { id: "police",      label: "National Police Check",          sectors: ["agedCare","ndis","homeCare","earlyLearning"], renewYears: 3 },
  { id: "ndis",        label: "NDIS Worker Screening Check",    sectors: ["ndis"],                                        renewYears: 5 },
  { id: "wwcc",        label: "Working With Children Check",    sectors: ["earlyLearning","ndis"],                        renewYears: 5 },
  { id: "firstaid",    label: "First Aid Certificate",          sectors: ["agedCare","ndis","homeCare","earlyLearning"], renewYears: 3 },
  { id: "cpr",         label: "CPR Certificate",                sectors: ["agedCare","ndis","homeCare","earlyLearning"], renewYears: 1 },
  { id: "anaphylaxis", label: "Anaphylaxis Management",         sectors: ["earlyLearning"],                              renewYears: 2 },
  { id: "food",        label: "Food Safety Certificate",        sectors: ["earlyLearning"],                              renewYears: 5 },
  { id: "ahpra",       label: "AHPRA Registration",             sectors: ["agedCare","ndis","homeCare"],                 renewYears: 1 },
  { id: "manual",      label: "Manual Handling",                sectors: ["agedCare","ndis","homeCare"],                 renewYears: 2 },
];

const TOTAL_STEPS = 3;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  return Math.round((new Date(dateStr) - new Date()) / 86400000);
}

function checkStatus(expiry) {
  if (!expiry) return "missing";
  const d = daysUntil(expiry);
  if (d < 0)   return "expired";
  if (d <= 60) return "expiring";
  return "current";
}

const statusMeta = {
  current:  { label: "Current",       color: C.green, bg: C.greenBg, border: C.greenBorder, dot: "✓" },
  expiring: { label: "Expiring Soon", color: C.amber, bg: C.amberBg, border: C.amberBorder, dot: "!" },
  expired:  { label: "Expired",       color: C.red,   bg: C.redBg,   border: C.redBorder,   dot: "✕" },
  missing:  { label: "Not Added",     color: C.grey,  bg: C.greyBg,  border: C.greyBorder,  dot: "–" },
};

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function StepDots({ current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginBottom: 32 }}>
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const done = i < current - 1;
        const active = i === current - 1;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: active ? 28 : 10, height: 10, borderRadius: 10,
              background: active ? C.primary : done ? C.primaryLight : C.border,
              transition: "all 0.3s",
            }} />
          </div>
        );
      })}
    </div>
  );
}

function Label({ children, required }) {
  return (
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 6 }}>
      {children}{required && <span style={{ color: C.red, marginLeft: 2 }}>*</span>}
    </label>
  );
}

function Input({ label, required, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 18 }}>
      {label && <Label required={required}>{label}</Label>}
      <input
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "11px 14px", borderRadius: 10, fontSize: 14,
          border: `1.5px solid ${focused ? C.primary : C.border}`,
          outline: "none", background: "#fff", color: C.text,
          fontFamily: FONT, transition: "border-color 0.15s",
          ...props.style,
        }}
      />
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled, style }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: disabled ? C.border : hov ? C.primaryLight : C.primary,
        color: disabled ? C.textMuted : "#fff",
        border: "none", borderRadius: 12, padding: "14px 28px",
        fontSize: 15, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: FONT, transition: "all 0.15s", width: "100%",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function GhostBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent", border: `1.5px solid ${C.border}`,
        borderRadius: 12, padding: "13px 28px", fontSize: 15,
        fontWeight: 600, cursor: "pointer", color: C.textMid,
        fontFamily: FONT, transition: "all 0.15s", width: "100%",
      }}
    >
      {children}
    </button>
  );
}

function SectorCard({ sector, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? C.primaryXLight : "#fff",
        border: `2px solid ${selected ? C.primary : C.border}`,
        borderRadius: 14, padding: "18px 14px", cursor: "pointer",
        textAlign: "center", transition: "all 0.15s", fontFamily: FONT,
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 8 }}>{sector.icon}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: selected ? C.primary : C.text, lineHeight: 1.3 }}>
        {sector.label}
      </div>
    </button>
  );
}

function CheckRow({ check, value, onChange }) {
  const status = checkStatus(value);
  const meta = statusMeta[status];
  return (
    <div style={{
      background: "#fff", border: `1.5px solid ${C.border}`, borderRadius: 12,
      padding: "14px 16px", marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: value !== undefined ? 10 : 0 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{check.label}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Renews every {check.renewYears} year{check.renewYears !== 1 ? "s" : ""}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {value && (
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
              background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`,
            }}>
              {meta.dot} {meta.label}
            </span>
          )}
          <button
            onClick={() => onChange(value ? undefined : "")}
            style={{
              background: value !== undefined ? C.redBg : C.primaryXLight,
              color: value !== undefined ? C.red : C.primary,
              border: "none", borderRadius: 8, padding: "5px 12px",
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
            }}
          >
            {value !== undefined ? "Remove" : "+ Add"}
          </button>
        </div>
      </div>
      {value !== undefined && (
        <div>
          <Label>Expiry date</Label>
          <input
            type="date"
            value={value || ""}
            min={todayStr()}
            onChange={e => onChange(e.target.value)}
            style={{
              padding: "9px 12px", borderRadius: 8, fontSize: 13,
              border: `1.5px solid ${C.border}`, outline: "none",
              fontFamily: FONT, color: C.text, background: C.bg,
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── PASSPORT CARD (shown on completion) ─────────────────────────────────────
function PassportCard({ data }) {
  const sector = SECTORS.find(s => s.id === data.sector);
  const addedChecks = ALL_CHECKS.filter(c => data.checks[c.id] !== undefined);
  const overallStatus = addedChecks.length === 0 ? "missing"
    : addedChecks.some(c => checkStatus(data.checks[c.id]) === "expired") ? "expired"
    : addedChecks.some(c => checkStatus(data.checks[c.id]) === "expiring") ? "expiring"
    : "current";
  const overall = statusMeta[overallStatus];

  return (
    <div style={{
      background: "#fff", borderRadius: 20,
      border: `2px solid ${C.primaryBorder}`,
      overflow: "hidden", maxWidth: 420, margin: "0 auto",
      boxShadow: "0 8px 40px rgba(26,122,74,0.12)",
    }}>
      {/* Header band */}
      <div style={{ background: C.forest, padding: "24px 24px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <VeriyoLogo height={26} darkText={false} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 6 }}>
            Career Passport
          </div>
        </div>
        <div style={{
          background: overall.bg, color: overall.color,
          border: `1px solid ${overall.border}`,
          borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700,
        }}>
          {overall.dot} {overall.label}
        </div>
      </div>

      {/* Worker info */}
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: C.primaryXLight, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, fontWeight: 800, color: C.primary, flexShrink: 0,
          }}>
            {data.firstName?.[0]}{data.lastName?.[0]}
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.text, letterSpacing: "-0.3px" }}>
              {data.firstName} {data.lastName}
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
              {data.role} · {sector?.label}
            </div>
          </div>
        </div>
      </div>

      {/* Checks */}
      <div style={{ padding: "16px 24px 20px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Credentials & Checks
        </div>
        {addedChecks.length === 0 ? (
          <div style={{ fontSize: 13, color: C.textMuted, padding: "12px 0" }}>No checks added yet</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {addedChecks.map(check => {
              const expiry = data.checks[check.id];
              const st = checkStatus(expiry);
              const meta = statusMeta[st];
              const days = daysUntil(expiry);
              return (
                <div key={check.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 14px", borderRadius: 10,
                  background: meta.bg, border: `1px solid ${meta.border}`,
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{check.label}</div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: meta.color }}>
                      {meta.dot} {meta.label}
                    </div>
                    {expiry && (
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>
                        {st === "expired" ? `${Math.abs(days)}d ago` : `${days}d left`}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: C.bg, padding: "12px 24px", borderTop: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, color: C.textMuted, textAlign: "center" }}>
          Verified by Veriyo · veriyo.com.au
        </div>
      </div>
    </div>
  );
}

// ─── STEP 1 — Personal details ────────────────────────────────────────────────
function Step1({ data, onChange, onNext }) {
  const valid = data.firstName?.trim() && data.lastName?.trim() && data.email?.includes("@") && data.phone?.trim();
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Your details
        </h2>
        <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
          This is your passport profile. Workers see your name and credentials — employers see the status.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
        <Input label="First name" required placeholder="Sarah" value={data.firstName || ""} onChange={e => onChange("firstName", e.target.value)} />
        <Input label="Last name" required placeholder="Chen" value={data.lastName || ""} onChange={e => onChange("lastName", e.target.value)} />
      </div>
      <Input label="Email address" required type="email" placeholder="sarah@email.com" value={data.email || ""} onChange={e => onChange("email", e.target.value)} />
      <Input label="Phone number" required type="tel" placeholder="04xx xxx xxx" value={data.phone || ""} onChange={e => onChange("phone", e.target.value)} />
      <div style={{ marginTop: 8 }}>
        <PrimaryBtn onClick={onNext} disabled={!valid}>Continue →</PrimaryBtn>
      </div>
      <p style={{ fontSize: 12, color: C.textMuted, textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
        Your details are private. Only verified employers you share with can see them.
      </p>
    </div>
  );
}

// ─── STEP 2 — Sector & role ───────────────────────────────────────────────────
function Step2({ data, onChange, onNext, onBack }) {
  const roles = data.sector ? ROLES[data.sector] : [];
  const valid = data.sector && data.role;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Your sector & role
        </h2>
        <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
          We use this to know which checks are relevant to you.
        </p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Label required>Which sector do you work in?</Label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {SECTORS.map(s => (
            <SectorCard key={s.id} sector={s} selected={data.sector === s.id}
              onClick={() => { onChange("sector", s.id); onChange("role", ""); onChange("checks", {}); }} />
          ))}
        </div>
      </div>

      {data.sector && (
        <div style={{ marginBottom: 24 }}>
          <Label required>Your role</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {roles.map(r => (
              <button key={r} onClick={() => onChange("role", r)} style={{
                padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                cursor: "pointer", fontFamily: FONT, transition: "all 0.15s",
                background: data.role === r ? C.primaryXLight : "#fff",
                color: data.role === r ? C.primary : C.textMid,
                border: `1.5px solid ${data.role === r ? C.primary : C.border}`,
              }}>{r}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
        <PrimaryBtn onClick={onNext} disabled={!valid}>Continue →</PrimaryBtn>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
      </div>
    </div>
  );
}

// ─── STEP 3 — Checks & expiries ──────────────────────────────────────────────
function Step3({ data, onChange, onSubmit, onBack }) {
  const relevantChecks = ALL_CHECKS.filter(c =>
    c.sectors.includes(data.sector) || c.sectors.includes("all")
  );
  const hasAny = Object.values(data.checks || {}).some(v => v !== undefined);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: "-0.5px", marginBottom: 6 }}>
          Your checks & credentials
        </h2>
        <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
          Add the checks you currently hold. You can always update these later.
        </p>
      </div>

      <div>
        {relevantChecks.map(check => (
          <CheckRow
            key={check.id}
            check={check}
            value={data.checks?.[check.id]}
            onChange={val => {
              const updated = { ...data.checks };
              if (val === undefined) delete updated[check.id];
              else updated[check.id] = val;
              onChange("checks", updated);
            }}
          />
        ))}
      </div>

      {!hasAny && (
        <div style={{
          background: C.amberBg, border: `1px solid ${C.amberBorder}`,
          borderRadius: 12, padding: "12px 16px", marginBottom: 16,
          fontSize: 13, color: C.amber, fontWeight: 500,
        }}>
          💡 Add at least one check to make your passport useful — you can skip for now and add them later.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
        <PrimaryBtn onClick={onSubmit}>Create my Passport ✓</PrimaryBtn>
        <GhostBtn onClick={onBack}>← Back</GhostBtn>
      </div>
    </div>
  );
}

// ─── MAIN PASSPORT PAGE ───────────────────────────────────────────────────────
export default function Passport({ onLogin }) {
  const [step, setStep]       = useState(1);
  const [done, setDone]       = useState(false);
  const [data, setData]       = useState({
    firstName: "", lastName: "", email: "", phone: "",
    sector: "", role: "", checks: {},
  });

  function change(key, val) {
    setData(d => ({ ...d, [key]: val }));
  }

  function submit() {
    // In production: POST to Supabase / API here
    setDone(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONT }}>

      {/* Nav */}
      <div style={{
        background: C.forest, padding: "0 24px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <VeriyoLogo height={28} darkText={false} />
        <button
          onClick={onLogin}
          style={{
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8, color: "rgba(255,255,255,0.7)", fontSize: 13,
            padding: "5px 14px", cursor: "pointer", fontFamily: FONT,
          }}
        >
          Provider login
        </button>
      </div>

      {/* Hero band */}
      {!done && step === 1 && (
        <div style={{ background: C.forest, padding: "40px 24px 48px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(52,194,116,0.15)", border: "1px solid rgba(52,194,116,0.3)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 14 }}>🇦🇺</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#34c274", letterSpacing: "0.05em", textTransform: "uppercase" }}>Free for workers</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 42px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 14 }}>
            Your Career Passport
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            One verified profile for all your credentials. Share it with any employer — no more chasing paperwork every time you start a new role.
          </p>
        </div>
      )}

      {/* Card */}
      <div style={{ maxWidth: 520, margin: "0 auto", padding: "32px 20px 80px" }}>
        {done ? (
          <div>
            {/* Success */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: C.primaryXLight, margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
              }}>✓</div>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: C.text, letterSpacing: "-0.5px", marginBottom: 8 }}>
                Passport created!
              </h2>
              <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
                Your Career Passport is live. Share it with employers or save the link — it stays up to date as you renew your checks.
              </p>
            </div>

            <PassportCard data={data} />

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <PrimaryBtn onClick={() => { setDone(false); setStep(3); }}>
                Update my checks
              </PrimaryBtn>
              <div style={{
                background: C.primaryXLight, border: `1px solid ${C.primaryBorder}`,
                borderRadius: 12, padding: "14px 18px", textAlign: "center",
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                  Your passport link
                </div>
                <div style={{ fontSize: 13, color: C.textMid, fontWeight: 500 }}>
                  veriyo.com.au/passport/{data.firstName?.toLowerCase()}-{data.lastName?.toLowerCase()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            background: "#fff", borderRadius: 20, padding: "32px 28px",
            boxShadow: "0 4px 24px rgba(26,122,74,0.08)",
            border: `1px solid ${C.border}`,
          }}>
            <StepDots current={step} />
            <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24, textAlign: "center" }}>
              Step {step} of {TOTAL_STEPS}
            </div>

            {step === 1 && <Step1 data={data} onChange={change} onNext={() => setStep(2)} />}
            {step === 2 && <Step2 data={data} onChange={change} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <Step3 data={data} onChange={change} onSubmit={submit} onBack={() => setStep(2)} />}
          </div>
        )}
      </div>
    </div>
  );
}
