import { useState, useRef } from "react";

// ─── BRAND ────────────────────────────────────────────────────────────────────
const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  primaryBorder: "#b8deca",
  white: "#ffffff", bg: "#f4f7f5",
  border: "#e3ede8",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
};

// ─── DEMO CANDIDATE DATA (in real product this comes from URL param + API) ────
const DEMO_CANDIDATE = {
  id: "demo-001",
  name: "Sarah Chen",
  role: "Support Worker",
  facility: "Harbour Health — Parramatta",
  organisation: "Harbour Health Group",
  sector: "agedCare",
  ndisRequired: true,
  managerName: "David Truong",
  managerEmail: "david@veriyo.com.au",
};

// ─── CHECKS REQUIRED FOR THIS CANDIDATE ──────────────────────────────────────
const REQUIRED_CHECKS = [
  {
    id: "police",
    label: "National Police Check",
    description: "Must be issued within the last 3 years by an ACIC-accredited provider.",
    accepts: "PDF, JPG, PNG",
    icon: "🔍",
    renewYears: 3,
    tips: ["Issued by an accredited provider (e.g. Australian National Character Check, Fit2Work)", "Must show your full legal name", "Must be dated within 3 years"],
  },
  {
    id: "ndis",
    label: "NDIS Worker Screening",
    description: "Required for all roles involving NDIS participants. Valid for 5 years.",
    accepts: "PDF, JPG, PNG",
    icon: "🛡️",
    renewYears: 5,
    tips: ["Apply via your state's NDIS Worker Screening Unit", "You will receive a Worker Screening ID number — include this", "Processing can take 2–6 weeks — apply early"],
  },
  {
    id: "firstaid",
    label: "First Aid Certificate",
    description: "HLTAID011 or equivalent. Must be current (renewed within 3 years).",
    accepts: "PDF, JPG, PNG",
    icon: "🩺",
    renewYears: 3,
    tips: ["Must include HLTAID011 (Provide First Aid)", "Issued by a Registered Training Organisation (RTO)", "Must be within 3 years of issue date"],
  },
  {
    id: "cpr",
    label: "CPR Certificate",
    description: "HLTAID009 — must be renewed annually.",
    accepts: "PDF, JPG, PNG",
    icon: "❤️",
    renewYears: 1,
    tips: ["HLTAID009 (Provide CPR) required", "Must be renewed every 12 months", "Can be completed as part of First Aid renewal"],
  },
  {
    id: "covid",
    label: "COVID-19 Vaccination",
    description: "Proof of COVID-19 vaccination status as required by NSW Health.",
    accepts: "PDF, JPG, PNG",
    icon: "💉",
    tips: ["Download from Medicare online (myGov)", "Or from your GP or vaccination provider", "Must show full name and vaccination dates"],
  },
  {
    id: "flu",
    label: "Influenza Vaccination",
    description: "Annual flu vaccination — required for all aged care workers.",
    accepts: "PDF, JPG, PNG",
    icon: "🤧",
    renewYears: 1,
    tips: ["Vaccination record from GP or pharmacy", "Must be the current season's vaccination", "Renewed annually (usually April–May each year)"],
  },
  {
    id: "righttowork",
    label: "Right to Work",
    description: "Australian passport, citizenship certificate, or valid visa with work rights.",
    accepts: "PDF, JPG, PNG",
    icon: "🪪",
    tips: ["Australian citizens: passport or citizenship certificate", "Visa holders: current visa grant letter", "Upload front and back if applicable"],
  },
  {
    id: "quals",
    label: "Qualifications / Certificates",
    description: "Relevant care qualifications — Certificate III/IV in Aged Care or equivalent.",
    accepts: "PDF, JPG, PNG",
    icon: "🎓",
    tips: ["Certificate III in Individual Support (Ageing) or equivalent", "Or transcript of completed subjects", "Overseas qualifications — include certified translation"],
  },
];

// ─── AI REVIEW SIMULATION ─────────────────────────────────────────────────────
function simulateAiReview(checkId) {
  const results = {
    police:       { status: "approved", summary: "National Police Check verified", detail: "Issued 14 March 2024 · Expires 14 March 2027 · No disclosable outcomes", confidence: 98 },
    ndis:         { status: "approved", summary: "NDIS Worker Screening cleared",  detail: "Worker Screening ID confirmed · Issued NSW · Valid 5 years from issue", confidence: 96 },
    firstaid:     { status: "approved", summary: "First Aid Certificate verified", detail: "HLTAID011 · Issued by St John Ambulance · Expires August 2026", confidence: 94 },
    cpr:          { status: "warning",  summary: "CPR Certificate — check expiry", detail: "HLTAID009 · Issue date detected · Renewal may be due — please confirm with your manager", confidence: 81 },
    covid:        { status: "approved", summary: "COVID-19 vaccination confirmed", detail: "3 doses recorded · Last dose 12 November 2023 · Meets NSW Health requirements", confidence: 99 },
    flu:          { status: "approved", summary: "Flu vaccination verified",       detail: "2024 season · Administered 22 April 2024 · Meets aged care requirements", confidence: 97 },
    righttowork:  { status: "approved", summary: "Australian Passport verified",   detail: "Passport detected · Expiry 2029 · Confirms right to work in Australia", confidence: 99 },
    quals:        { status: "approved", summary: "Qualification verified",         detail: "Certificate III in Individual Support (Ageing) · Awarded 2021 · Registered RTO", confidence: 92 },
  };
  return results[checkId] || { status: "approved", summary: "Document verified", detail: "Document reviewed and accepted", confidence: 90 };
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CandidatePortal({ candidate = DEMO_CANDIDATE, onBack }) {
  const [step, setStep]             = useState("welcome");   // welcome | checklist | submitted
  const [uploads, setUploads]       = useState({});          // checkId → { file, status, result }
  const [aiLoading, setAiLoading]   = useState({});
  const [expanded, setExpanded]     = useState(null);
  const fileRefs                    = useRef({});

  const checks = REQUIRED_CHECKS; // in real product, filtered by candidate.sector + ndisRequired

  const completedCount = Object.values(uploads).filter(u => u.status === "approved" || u.status === "warning").length;
  const allDone        = completedCount === checks.length;
  const pct            = Math.round((completedCount / checks.length) * 100);

  function handleFileSelect(checkId, file) {
    if (!file) return;
    setUploads(p => ({ ...p, [checkId]: { file, status: "reviewing", result: null } }));
    setAiLoading(p => ({ ...p, [checkId]: true }));
    // Simulate AI review delay
    setTimeout(() => {
      const result = simulateAiReview(checkId);
      setUploads(p => ({ ...p, [checkId]: { file, status: result.status, result } }));
      setAiLoading(p => ({ ...p, [checkId]: false }));
    }, 2000 + Math.random() * 1000);
  }

  function triggerUpload(checkId) {
    if (!fileRefs.current[checkId]) return;
    fileRefs.current[checkId].click();
  }

  // ── WELCOME SCREEN ──────────────────────────────────────────────────────────
  if (step === "welcome") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f4f2e 0%, #1a7a4a 60%, #22a060 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 480, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", textAlign: "center" }}>
          {/* Logo */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.primaryXLight, border: `1px solid ${C.primaryBorder}`, borderRadius: 12, padding: "8px 16px" }}>
              <span style={{ fontSize: 20 }}>✓</span>
              <span style={{ fontSize: 16, fontWeight: 900, color: C.primary, letterSpacing: "-0.5px" }}>Veriyo</span>
            </div>
          </div>

          <div style={{ fontSize: 26, fontWeight: 900, color: C.text, marginBottom: 8, letterSpacing: "-0.5px" }}>
            Welcome, {candidate.name.split(" ")[0]} 👋
          </div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 28, lineHeight: 1.6 }}>
            <strong style={{ color: C.textMid }}>{candidate.organisation}</strong> has invited you to complete your pre-employment compliance checklist before starting your role as <strong style={{ color: C.textMid }}>{candidate.role}</strong>.
          </div>

          {/* Info cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
            {[
              { icon: "📋", label: "Checks required", value: `${checks.length} documents` },
              { icon: "⏱️", label: "Estimated time",  value: "10–15 minutes" },
              { icon: "🔒", label: "Secure upload",    value: "256-bit encrypted" },
              { icon: "🤖", label: "AI review",        value: "Instant feedback" },
            ].map(item => (
              <div key={item.label} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", textAlign: "left" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{item.icon}</div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 10, padding: "12px 14px", marginBottom: 24, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, marginBottom: 4 }}>📌 Before you start</div>
            <div style={{ fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
              Have your documents ready to upload. Each document is reviewed by our AI instantly — you'll know straight away if anything needs attention.
            </div>
          </div>

          <button
            onClick={() => setStep("checklist")}
            style={{ width: "100%", padding: "14px 0", borderRadius: 12, border: "none", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, color: "white", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: "-0.2px" }}
          >
            Start my compliance checklist →
          </button>

          <div style={{ marginTop: 14, fontSize: 11, color: C.textMuted }}>
            Questions? Contact {candidate.managerName} at <a href={`mailto:${candidate.managerEmail}`} style={{ color: C.primary }}>{candidate.managerEmail}</a>
          </div>
        </div>
      </div>
    );
  }

  // ── SUBMITTED SCREEN ────────────────────────────────────────────────────────
  if (step === "submitted") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0f4f2e 0%, #1a7a4a 60%, #22a060 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 16px", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>
        <div style={{ background: "white", borderRadius: 20, padding: "48px 36px", maxWidth: 460, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.25)", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <div style={{ fontSize: 26, fontWeight: 900, color: C.text, marginBottom: 8 }}>You're all done!</div>
          <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 28, lineHeight: 1.6 }}>
            Your compliance documents have been submitted to <strong style={{ color: C.textMid }}>{candidate.organisation}</strong>. {candidate.managerName} will review and be in touch shortly.
          </div>
          <div style={{ background: C.greenBg, border: `1px solid ${C.greenBorder}`, borderRadius: 12, padding: "16px", marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.green, marginBottom: 6 }}>✓ Submitted successfully</div>
            <div style={{ fontSize: 12, color: C.textMid }}>
              {completedCount} of {checks.length} documents uploaded and AI-reviewed.<br />
              You'll receive a confirmation email at the address on file.
            </div>
          </div>
          <div style={{ fontSize: 12, color: C.textMuted }}>
            Powered by <strong style={{ color: C.primary }}>Veriyo</strong> · Workforce Compliance for Care
          </div>
        </div>
      </div>
    );
  }

  // ── CHECKLIST SCREEN ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI',system-ui,sans-serif" }}>

      {/* Header */}
      <div style={{ background: C.primary, padding: "0", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16, fontWeight: 900, color: "white", letterSpacing: "-0.5px" }}>✓ Veriyo</span>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{candidate.organisation}</div>
        </div>

        {/* Progress bar */}
        <div style={{ background: "rgba(0,0,0,0.2)", height: 4 }}>
          <div style={{ height: "100%", background: "rgba(255,255,255,0.9)", width: `${pct}%`, transition: "width 0.5s ease", borderRadius: "0 2px 2px 0" }} />
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 16px 40px" }}>

        {/* Candidate info */}
        <div style={{ background: "white", borderRadius: 14, padding: "16px 18px", marginBottom: 16, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.primaryXLight, border: `1.5px solid ${C.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 900, color: C.primary }}>{candidate.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.text }}>{candidate.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{candidate.role} · {candidate.facility}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: completedCount === checks.length ? C.green : C.primary }}>{pct}%</div>
              <div style={{ fontSize: 10, color: C.textMuted }}>{completedCount}/{checks.length} done</div>
            </div>
          </div>
        </div>

        {/* Status banner */}
        {allDone ? (
          <div style={{ background: C.greenBg, border: `1.5px solid ${C.greenBorder}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🎉</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.green }}>All documents uploaded!</div>
              <div style={{ fontSize: 12, color: C.textMid }}>Review the checklist below then tap Submit when ready.</div>
            </div>
          </div>
        ) : (
          <div style={{ background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: "#92400e", fontWeight: 600 }}>
              📋 {checks.length - completedCount} document{checks.length - completedCount !== 1 ? "s" : ""} still needed — upload each one below and our AI will check it instantly.
            </div>
          </div>
        )}

        {/* Check cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {checks.map(check => {
            const upload = uploads[check.id];
            const loading = aiLoading[check.id];
            const isExpanded = expanded === check.id;
            const statusColor = !upload ? C.grey
              : upload.status === "reviewing" ? C.amber
              : upload.status === "approved"  ? C.green
              : upload.status === "warning"   ? C.amber
              : C.red;
            const statusBg = !upload ? C.greyBg
              : upload.status === "reviewing" ? C.amberBg
              : upload.status === "approved"  ? C.greenBg
              : upload.status === "warning"   ? C.amberBg
              : C.redBg;
            const statusBorder = !upload ? C.greyBorder
              : upload.status === "reviewing" ? C.amberBorder
              : upload.status === "approved"  ? C.greenBorder
              : upload.status === "warning"   ? C.amberBorder
              : C.redBorder;
            const statusLabel = !upload ? "Not uploaded"
              : upload.status === "reviewing" ? "🔍 Reviewing…"
              : upload.status === "approved"  ? "✓ Verified"
              : upload.status === "warning"   ? "⚠️ Check required"
              : "✗ Issue found";

            return (
              <div
                key={check.id}
                style={{ background: "white", borderRadius: 14, border: `1.5px solid ${upload ? statusBorder : C.border}`, overflow: "hidden", transition: "box-shadow 0.2s" }}
              >
                {/* Card header — always visible */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : check.id)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", userSelect: "none" }}
                >
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{check.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: C.text }}>{check.label}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{check.description}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, color: statusColor, background: statusBg, border: `1px solid ${statusBorder}` }}>
                      {statusLabel}
                    </span>
                    <span style={{ fontSize: 12, color: C.textMuted }}>{isExpanded ? "▲" : "▼"}</span>
                  </div>
                </div>

                {/* AI result bar — shown when reviewed */}
                {upload && upload.result && (
                  <div style={{ margin: "0 16px 12px", padding: "10px 12px", background: statusBg, border: `1px solid ${statusBorder}`, borderRadius: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: statusColor, marginBottom: 3 }}>{upload.result.summary}</div>
                    <div style={{ fontSize: 11, color: C.textMid }}>{upload.result.detail}</div>
                    {upload.result.confidence && (
                      <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>AI confidence: {upload.result.confidence}%</div>
                    )}
                  </div>
                )}

                {/* Reviewing spinner */}
                {loading && (
                  <div style={{ margin: "0 16px 12px", padding: "10px 12px", background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.amber }}>🔍 AI is reviewing your document…</div>
                    <div style={{ marginTop: 8, height: 4, background: "#fcd48a", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: C.amber, width: "60%", borderRadius: 2, animation: "pulse 1.2s ease-in-out infinite" }} />
                    </div>
                  </div>
                )}

                {/* Expanded section — tips + upload button */}
                {isExpanded && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>What we need</div>
                      {check.tips.map((tip, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                          <span style={{ fontSize: 11, color: C.green, flexShrink: 0, marginTop: 1 }}>✓</span>
                          <span style={{ fontSize: 12, color: C.textMid, lineHeight: 1.5 }}>{tip}</span>
                        </div>
                      ))}
                    </div>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      ref={el => fileRefs.current[check.id] = el}
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(check.id, e.target.files[0])}
                    />

                    <button
                      onClick={() => triggerUpload(check.id)}
                      disabled={loading}
                      style={{
                        width: "100%", padding: "12px 0", borderRadius: 10, fontSize: 13, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                        border: upload && (upload.status === "approved") ? `1.5px solid ${C.greenBorder}` : `1.5px solid ${C.primaryBorder}`,
                        background: upload && (upload.status === "approved") ? C.greenBg : C.primaryXLight,
                        color: upload && (upload.status === "approved") ? C.green : C.primary,
                      }}
                    >
                      {loading ? "Reviewing…"
                        : upload && upload.status === "approved" ? "✓ Uploaded — tap to replace"
                        : upload ? "Replace document"
                        : `Upload ${check.label}`}
                    </button>
                    {upload && upload.file && (
                      <div style={{ marginTop: 6, fontSize: 11, color: C.textMuted, textAlign: "center" }}>
                        📄 {upload.file.name}
                      </div>
                    )}
                  </div>
                )}

                {/* Quick upload button when collapsed and not yet uploaded */}
                {!isExpanded && !upload && !loading && (
                  <div style={{ padding: "0 16px 14px" }}>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      ref={el => fileRefs.current[`${check.id}_quick`] = el}
                      style={{ display: "none" }}
                      onChange={e => handleFileSelect(check.id, e.target.files[0])}
                    />
                    <button
                      onClick={e => { e.stopPropagation(); fileRefs.current[`${check.id}_quick`]?.click(); }}
                      style={{ width: "100%", padding: "9px 0", borderRadius: 9, fontSize: 12, fontWeight: 700, cursor: "pointer", border: `1.5px dashed ${C.primaryBorder}`, background: C.primaryXLight, color: C.primary }}
                    >
                      + Upload {check.label}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        <button
          onClick={() => allDone && setStep("submitted")}
          disabled={!allDone}
          style={{
            width: "100%", padding: "16px 0", borderRadius: 14, fontSize: 15, fontWeight: 900, letterSpacing: "-0.2px",
            border: "none", cursor: allDone ? "pointer" : "not-allowed",
            background: allDone ? `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})` : C.greyBg,
            color: allDone ? "white" : C.textMuted,
            boxShadow: allDone ? "0 4px 20px rgba(26,122,74,0.35)" : "none",
            transition: "all 0.3s",
          }}
        >
          {allDone ? "Submit all documents →" : `Upload ${checks.length - completedCount} more document${checks.length - completedCount !== 1 ? "s" : ""} to continue`}
        </button>

        <div style={{ marginTop: 16, textAlign: "center", fontSize: 11, color: C.textMuted }}>
          🔒 Your documents are encrypted and only accessible to {candidate.organisation} compliance staff.<br />
          Powered by <strong style={{ color: C.primary }}>Veriyo</strong>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; width: 30%; }
          50% { opacity: 0.7; width: 80%; }
        }
      `}</style>
    </div>
  );
}
