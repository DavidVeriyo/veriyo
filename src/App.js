import { useState, useRef } from "react";

const C = {
  primary: "#1a7a4a", primaryLight: "#22a060", primaryXLight: "#e8f5ee",
  primaryBorder: "#b8deca", accent: "#34d17a",
  white: "#ffffff", bg: "#f7faf8",
  border: "#e3ede8", borderLight: "#f0f5f2",
  text: "#1a2e24", textMid: "#4a6357", textMuted: "#7a9e8e",
  green: "#1a7a4a", greenBg: "#e8f5ee", greenBorder: "#b8deca",
  amber: "#d97706", amberBg: "#fef3e2", amberBorder: "#fcd48a",
  red: "#dc2626", redBg: "#fef2f2", redBorder: "#fca5a5",
  blue: "#2563eb", blueBg: "#eff6ff", blueBorder: "#bfdbfe",
  purple: "#7c3aed", purpleBg: "#f5f3ff", purpleBorder: "#ddd6fe",
  grey: "#64748b", greyBg: "#f8fafc", greyBorder: "#e2e8f0",
  teal: "#0e7490", tealBg: "#ecfeff", tealBorder: "#a5f3fc",
};

// ─── FACILITIES ───────────────────────────────────────────────────
const FACILITIES = [
  { id: "f1", name: "Uniting Aged Care — Parramatta", sector: "agedCare", ndisRequired: true },
  { id: "f2", name: "Uniting Aged Care — Liverpool", sector: "agedCare", ndisRequired: true },
  { id: "f3", name: "Uniting Aged Care — Blacktown", sector: "agedCare", ndisRequired: false },
  { id: "f4", name: "HACC Senior Gym — Sydney", sector: "agedCare", ndisRequired: false },
  { id: "f5", name: "All About Children — Bella Vista", sector: "earlyLearning", ndisRequired: false },
  { id: "f6", name: "All About Children — Castle Hill", sector: "earlyLearning", ndisRequired: false },
  { id: "f7", name: "Explorers Early Learning — Norwest", sector: "earlyLearning", ndisRequired: false },
  { id: "f8", name: "NSW CSE — Singleton", sector: "agedCare", ndisRequired: true },
];

// ─── ALL CHECKS ───────────────────────────────────────────────────
const ALL_CHECKS = [
  { id: "ref", name: "Reference Check (x2)", category: "mandatory", type: "reference", eta: 2, icon: "👥", sectors: ["agedCare","earlyLearning"], stage: 1,
    acceptedDocs: [{ id: "form", label: "Completed Reference Form" },{ id: "email", label: "Email Reference" }],
    aiLookFor: ["Referee name and position","Organisation and relationship","Duration known — min 12 months preferred","Overall recommendation","Any performance concerns","Any conduct issues"],
    escalateIf: ["would not re-employ","performance concerns","conduct issues","dismissed","resigned under investigation"],
    refQuestions: { agedCare: ["How long have you known the candidate and in what capacity?","What was their role and key responsibilities?","How would you rate their reliability and punctuality?","How did they interact with elderly or vulnerable clients?","Did they demonstrate empathy and patience under pressure?","Were there any performance concerns during their time with you?","Were there any conduct or behaviour issues?","How did they handle conflict or difficult situations?","Would you re-employ this person?","Is there anything else you'd like to add?"],
      earlyLearning: ["How long have you known the candidate and in what capacity?","What was their role working with children?","How did they interact with children and families?","Did they demonstrate appropriate child protection awareness?","How did they handle challenging behaviour in children?","Were there any performance concerns?","Were there any conduct or behaviour issues?","How did they work within a team environment?","Would you re-employ this person in a role working with children?","Is there anything else you'd like to share?"] }
  },
  { id: "rtw", name: "Right to Work / Visa", category: "mandatory", type: "identity", eta: 1, icon: "🪪", sectors: ["agedCare","earlyLearning"], stage: 1,
    acceptedDocs: [{ id: "passport", label: "Australian Passport" },{ id: "visa", label: "Visa Grant Notice" },{ id: "pr", label: "Permanent Residency Evidence" }],
    aiLookFor: ["Document type — passport, visa, or PR","Full name matches candidate file","Expiry date — must be current","Visa subclass and work rights","Country of birth and citizenship"],
    escalateIf: ["expired","no work rights","visa conditions restrict employment","bridging visa"],
    idRules: ["Entire passport photo page must be visible — no cropping of any edge","Machine Readable Zone (MRZ) at bottom must be fully legible","No glare over photo or hologram — hologram must be visible","Document must be flat — no bending or folding","Photo must be unobscured and undamaged","Liveness check required — selfie holding document next to face"]
  },
  { id: "id", name: "Identity Verification", category: "mandatory", type: "identity", eta: 1, icon: "🪪", sectors: ["agedCare","earlyLearning"], stage: 1,
    acceptedDocs: [{ id: "licence", label: "Driver's Licence (front + back)" },{ id: "passport", label: "Passport" },{ id: "birth", label: "Birth Certificate" }],
    aiLookFor: ["Full name matches candidate file","Date of birth matches records","Document not expired","All four corners visible — no cropping","Photo clear and unobscured","Back of licence included for driver's licence"],
    escalateIf: ["expired","name mismatch","photo obscured","document appears altered"],
    idRules: ["Front AND back of driver's licence required","All four corners must be visible — no cropping","Name must exactly match candidate file","Photo must be clear — no glare, blur, or shadow","Document must be current — check expiry date","Liveness check required — thumbs up selfie next to face"]
  },
  { id: "police", name: "Police Clearance", category: "mandatory", type: "screening", eta: 10, icon: "🔍", sectors: ["agedCare","earlyLearning"], stage: 2,
    acceptedDocs: [{ id: "npc", label: "National Police Certificate" },{ id: "receipt", label: "Application Receipt" }],
    aiLookFor: ["Issuing authority — AFP or state police","Applicant name matches candidate","'No Disclosable Court Outcomes' = clear","'Disclosable Court Outcomes' = escalate","Date of issue — must be within 3 years","Date of birth matches candidate"],
    escalateIf: ["Disclosable Court Outcomes","assault","fraud","drug trafficking","offence involving vulnerable persons"]
  },
  { id: "ndis", name: "NDIS Worker Screening", category: "conditional", type: "screening", eta: 14, icon: "🛡️", sectors: ["agedCare"], stage: 2, condition: "ndisRequired", conditionLabel: "Required — facility has NDIS participants",
    acceptedDocs: [{ id: "approval", label: "NDIS Clearance Letter" },{ id: "receipt", label: "Application Receipt + Number" },{ id: "payment", label: "Payment Confirmation" }],
    aiLookFor: ["Document stage — payment, receipt, or clearance","Application number — NDISWS format","Applicant name matches candidate","'Cleared' status = approved","'Interim Bar' = immediate escalation","'Exclusion' = cannot proceed","Expiry — valid 5 years"],
    escalateIf: ["Interim Bar","Exclusion","pending further assessment"]
  },
  { id: "ahpra", name: "AHPRA Registration", category: "conditional", type: "screening", eta: 3, icon: "⚕️", sectors: ["agedCare"], stage: 2, condition: "isHealthProfessional", conditionLabel: "Required for registered health professionals only",
    acceptedDocs: [{ id: "cert", label: "AHPRA Registration Certificate" },{ id: "statement", label: "AHPRA Registration Statement" }],
    aiLookFor: ["Registrant name matches candidate","Registration number","Profession and division","Registration status — Registered, Suspended, Cancelled","Registration expiry — must be current","Conditions, undertakings or reprimands"],
    escalateIf: ["Suspended","Cancelled","conditions","undertakings","reprimand","caution"]
  },
  { id: "wwcc", name: "Working With Children Check", category: "conditional", type: "screening", eta: 5, icon: "👶", sectors: ["earlyLearning"], stage: 2, condition: "alwaysTrue", conditionLabel: "Required for all early learning roles",
    acceptedDocs: [{ id: "card", label: "WWCC Card or Letter" },{ id: "receipt", label: "Application Receipt" }],
    aiLookFor: ["State issuing authority","Applicant name and date of birth","Check number","Status — Active, Pending, Barred","Expiry date — must be current","Employment type — paid or volunteer"],
    escalateIf: ["Barred","conditions attached","interim bar"]
  },
  { id: "nwr", name: "National Worker Register", category: "conditional", type: "screening", eta: 2, icon: "📋", sectors: ["earlyLearning"], stage: 2, condition: "alwaysTrue", conditionLabel: "Required under Feb 2026 legislation",
    acceptedDocs: [{ id: "confirm", label: "NWR Registration Confirmation" }],
    aiLookFor: ["Registration confirmation number","Applicant name matches candidate","Registration date","Status — Active or Pending","Issuing authority — ACECQA or state body"],
    escalateIf: ["Refused","suspended","conditions attached"]
  },
  { id: "firstaid", name: "First Aid Certificate", category: "conditional", type: "training", eta: 5, icon: "🩹", sectors: ["agedCare","earlyLearning"], stage: 2, condition: "alwaysTrue", conditionLabel: "Required for direct care roles",
    acceptedDocs: [{ id: "cert", label: "First Aid Certificate" }],
    aiLookFor: ["Issuing RTO name and registration number","Candidate name matches","Certificate number","Date of issue","Expiry — typically 3 years","Units of competency — HLTAID011 required"],
    escalateIf: ["expired","issuing RTO not registered","unit of competency not met"]
  },
  { id: "cpt", name: "Child Protection Training", category: "conditional", type: "training", eta: 3, icon: "🛡️", sectors: ["earlyLearning"], stage: 2, condition: "alwaysTrue", conditionLabel: "Required — must complete by Aug 2026",
    acceptedDocs: [{ id: "cert", label: "Child Protection Training Certificate" }],
    aiLookFor: ["Training provider name","Candidate name matches","Completion date","Certificate or statement of completion","Training meets NSW/VIC/QLD requirements"],
    escalateIf: ["expired","incomplete","provider not recognised"]
  },
  { id: "flu", name: "Flu Vaccination", category: "optional", type: "medical", eta: 3, icon: "💉", sectors: ["agedCare","earlyLearning"], stage: 2, optionalNote: "Recommended — no longer legally mandated" ,
    acceptedDocs: [{ id: "cert", label: "Vaccination Certificate or Record" },{ id: "immunisation", label: "AIR Immunisation History Statement" }],
    aiLookFor: ["Vaccine name — Influenza","Date of vaccination — current season","Provider name","Candidate name matches","Australian Immunisation Register reference if present"],
    escalateIf: []
  },
  { id: "covid", name: "COVID-19 Vaccination", category: "optional", type: "medical", eta: 3, icon: "💉", sectors: ["agedCare","earlyLearning"], stage: 2, optionalNote: "Recommended — mandate removed, facility preference only",
    acceptedDocs: [{ id: "cert", label: "COVID Vaccination Certificate" },{ id: "immunisation", label: "AIR Immunisation History Statement" }],
    aiLookFor: ["Vaccine name and dose number","Date of last dose","Provider name","Candidate name matches","AIR certificate reference"],
    escalateIf: []
  },
  { id: "contract", name: "Signed Contract", category: "mandatory", type: "contract", eta: 1, icon: "✍️", sectors: ["agedCare","earlyLearning"], stage: 2,
    acceptedDocs: [{ id: "signed", label: "Signed Employment Contract" }],
    aiLookFor: ["Candidate signature present","Date of signing","Position title matches offer","Employer signature present","All pages signed or initialled"],
    escalateIf: ["unsigned","missing pages","signature appears altered"]
  },
];

const CHECK_TYPE_CFG = {
  reference: { color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
  identity: { color: C.blue, bg: C.blueBg, border: C.blueBorder },
  screening: { color: C.red, bg: C.redBg, border: C.redBorder },
  medical: { color: C.amber, bg: C.amberBg, border: C.amberBorder },
  training: { color: C.primary, bg: C.primaryXLight, border: C.primaryBorder },
  contract: { color: C.grey, bg: C.greyBg, border: C.greyBorder },
};

const CHECK_STATUS_CFG = {
  complete: { label: "Complete", color: C.green, bg: C.greenBg, border: C.greenBorder },
  "in-progress": { label: "In Progress", color: C.blue, bg: C.blueBg, border: C.blueBorder },
  "awaiting-candidate": { label: "Awaiting Candidate", color: C.amber, bg: C.amberBg, border: C.amberBorder },
  overdue: { label: "Overdue", color: C.red, bg: C.redBg, border: C.redBorder },
  escalated: { label: "Escalated 🚨", color: C.red, bg: C.redBg, border: C.redBorder },
  "not-started": { label: "Not Started", color: C.grey, bg: C.greyBg, border: C.greyBorder },
};

const OVERALL_CFG = {
  "on-track": { label: "On Track", color: C.green, bg: C.greenBg, border: C.greenBorder },
  "needs-action": { label: "Needs Action", color: C.red, bg: C.redBg, border: C.redBorder },
  "pending-workflow": { label: "No Workflow", color: C.red, bg: C.redBg, border: C.redBorder },
  delayed: { label: "Delayed", color: C.amber, bg: C.amberBg, border: C.amberBorder },
  cleared: { label: "Cleared ✓", color: C.green, bg: "#dcfce7", border: "#86efac" },
};

// ─── CANDIDATES ───────────────────────────────────────────────────
const INIT_CANDIDATES = [
  { id:1, name:"Anika Sharma", role:"Care Worker", facilityId:"f1", recruiter:"Chris T.", email:"anika.sharma@email.com", phone:"0412 345 678", sector:"agedCare", triggeredAt:"2026-06-03 09:14", daysInPipeline:7, overallStatus:"on-track", alert:null, isHealthProfessional:false, isSeniorRole:false,
    checks:[
      { id:"ref", stage:1, status:"complete", completedAt:"2026-06-04", notes:[], decided:false },
      { id:"rtw", stage:1, status:"complete", completedAt:"2026-06-03", notes:[], decided:false },
      { id:"id", stage:1, status:"complete", completedAt:"2026-06-03", notes:[], decided:false },
      { id:"police", stage:2, status:"in-progress", completedAt:null, notes:[], decided:false },
      { id:"ndis", stage:2, status:"awaiting-candidate", completedAt:null, notes:[], decided:false },
      { id:"firstaid", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"flu", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"contract", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
    ]
  },
  { id:2, name:"Benjamin Saclausa", role:"Support Worker", facilityId:"f4", recruiter:"Riza K.", email:"bsac0945@uni.sydney.edu.au", phone:"0411 206 722", sector:"agedCare", triggeredAt:"2026-06-01 11:30", daysInPipeline:9, overallStatus:"pending-workflow", alert:{ type:"error", message:"Workflow not assigned — role and location could not be matched. Please assign checks manually." }, isHealthProfessional:false, isSeniorRole:false, checks:[] },
  { id:3, name:"Sarah Mitchell", role:"Educator", facilityId:"f5", recruiter:"Loula O.", email:"sarah.mitchell@email.com", phone:"0423 567 890", sector:"earlyLearning", triggeredAt:"2026-06-05 14:22", daysInPipeline:5, overallStatus:"on-track", alert:null, isHealthProfessional:false, isSeniorRole:false,
    checks:[
      { id:"ref", stage:1, status:"complete", completedAt:"2026-06-06", notes:[], decided:false },
      { id:"rtw", stage:1, status:"complete", completedAt:"2026-06-05", notes:[], decided:false },
      { id:"id", stage:1, status:"complete", completedAt:"2026-06-05", notes:[], decided:false },
      { id:"wwcc", stage:2, status:"in-progress", completedAt:null, notes:[], decided:false },
      { id:"police", stage:2, status:"awaiting-candidate", completedAt:null, notes:[], decided:false },
      { id:"cpt", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"firstaid", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"nwr", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"contract", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
    ]
  },
  { id:4, name:"Marcus Webb", role:"Centre Director", facilityId:"f7", recruiter:"Kelly O.", email:"marcus.webb@email.com", phone:"0434 789 012", sector:"earlyLearning", triggeredAt:"2026-05-28 09:00", daysInPipeline:13, overallStatus:"delayed", alert:{ type:"warning", message:"Candidate has not responded to 2 reminders. Police Clearance overdue by 3 days. Consider calling candidate directly." }, isHealthProfessional:false, isSeniorRole:true,
    checks:[
      { id:"ref", stage:1, status:"complete", completedAt:"2026-05-30", notes:[], decided:false },
      { id:"rtw", stage:1, status:"complete", completedAt:"2026-05-28", notes:[], decided:false },
      { id:"id", stage:1, status:"complete", completedAt:"2026-05-28", notes:[], decided:false },
      { id:"wwcc", stage:2, status:"complete", completedAt:"2026-06-02", notes:[], decided:false },
      { id:"police", stage:2, status:"escalated", completedAt:null, notes:[{ role:"Veriyo AI", isAI:true, timestamp:"14 Jun 2026, 09:15", text:"National Police Certificate uploaded. Disclosable Court Outcome detected: One count of Common Assault — QLD Magistrates Court — 14 March 2019 — Conviction recorded — Fine $800. Offence is 7 years old, does not directly involve vulnerable persons. Escalated to Compliance Manager and HR for review and determination.", decision:null }], decided:false },
      { id:"cpt", stage:2, status:"awaiting-candidate", completedAt:null, notes:[], decided:false },
      { id:"firstaid", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"nwr", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"contract", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
    ]
  },
  { id:5, name:"Priya Nair", role:"Registered Nurse", facilityId:"f2", recruiter:"Tim K.", email:"priya.nair@email.com", phone:"0445 678 901", sector:"agedCare", triggeredAt:"2026-06-08 08:45", daysInPipeline:2, overallStatus:"cleared", alert:null, isHealthProfessional:true, isSeniorRole:false,
    checks:[
      { id:"ref", stage:1, status:"complete", completedAt:"2026-06-09", notes:[], decided:false },
      { id:"rtw", stage:1, status:"complete", completedAt:"2026-06-08", notes:[], decided:false },
      { id:"id", stage:1, status:"complete", completedAt:"2026-06-08", notes:[], decided:false },
      { id:"ahpra", stage:2, status:"complete", completedAt:"2026-06-09", notes:[], decided:false },
      { id:"police", stage:2, status:"complete", completedAt:"2026-06-10", notes:[], decided:false },
      { id:"ndis", stage:2, status:"complete", completedAt:"2026-06-10", notes:[], decided:false },
      { id:"flu", stage:2, status:"complete", completedAt:"2026-06-09", notes:[], decided:false },
      { id:"contract", stage:2, status:"complete", completedAt:"2026-06-10", notes:[], decided:false },
    ]
  },
  { id:6, name:"Emma Gallagher", role:"Educator", facilityId:"f6", recruiter:"Loula O.", email:"emma.gallagher@email.com", phone:"0467 890 123", sector:"earlyLearning", triggeredAt:"2026-06-07 10:00", daysInPipeline:3, overallStatus:"on-track", alert:null, isHealthProfessional:false, isSeniorRole:false,
    checks:[
      { id:"ref", stage:1, status:"complete", completedAt:"2026-06-08", notes:[], decided:false },
      { id:"rtw", stage:1, status:"complete", completedAt:"2026-06-07", notes:[], decided:false },
      { id:"id", stage:1, status:"complete", completedAt:"2026-06-07", notes:[], decided:false },
      { id:"wwcc", stage:2, status:"in-progress", completedAt:null, notes:[], decided:false },
      { id:"police", stage:2, status:"in-progress", completedAt:null, notes:[], decided:false },
      { id:"cpt", stage:2, status:"awaiting-candidate", completedAt:null, notes:[], decided:false },
      { id:"firstaid", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"nwr", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
      { id:"contract", stage:2, status:"not-started", completedAt:null, notes:[], decided:false },
    ]
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────
const facilityName = id => FACILITIES.find(f=>f.id===id)?.name||"Unknown";
const getCheckDef = id => ALL_CHECKS.find(c=>c.id===id)||{};
const progressOf = checks => !checks.length?0:Math.round(checks.filter(c=>c.status==="complete").length/checks.length*100);
const s1Done = checks => { const s1=checks.filter(c=>c.stage===1); return s1.length>0&&s1.every(c=>c.status==="complete"); };
const ts = () => new Date().toLocaleString("en-AU",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});

// ─── SMALL COMPONENTS ────────────────────────────────────────────
function Pill({status, cfg, small}) {
  const c = cfg[status]||cfg["not-started"]||Object.values(cfg)[0];
  return <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:small?10:11,fontWeight:700,color:c.color,background:c.bg,border:`1px solid ${c.border}`,borderRadius:20,padding:small?"2px 8px":"3px 10px",whiteSpace:"nowrap"}}><span style={{width:5,height:5,borderRadius:"50%",background:c.color,display:"inline-block"}}/>{c.label}</span>;
}

function Avatar({name,color=C.primary,size=36}) {
  return <div style={{width:size,height:size,borderRadius:size/3,background:`${color}18`,border:`1.5px solid ${color}35`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size/3,fontWeight:700,color,flexShrink:0}}>{name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>;
}

function ProgressBar({pct,s1}) {
  return <div><div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted,marginBottom:4}}><span>Stage 1 {s1?"✓":"→"} Stage 2</span><span style={{color:pct===100?C.green:C.textMuted,fontWeight:pct===100?700:400}}>{pct}%</span></div><div style={{height:5,background:C.border,borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${pct}%`,background:pct===100?`linear-gradient(90deg,${C.primary},${C.accent})`:`linear-gradient(90deg,${C.primaryLight},${C.accent})`,borderRadius:99,transition:"width 0.5s"}}/></div></div>;
}

// ─── REFERENCE SMS MODAL ─────────────────────────────────────────
function RefSMSModal({check, candidate, onClose}) {
  const sector = candidate.sector;
  const questions = check.refQuestions?.[sector]||check.refQuestions?.agedCare||[];
  const [refName, setRefName] = useState("");
  const [refPhone, setRefPhone] = useState("");
  const [refRole, setRefRole] = useState("");
  const [sent, setSent] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [responses, setResponses] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  const MOCK_RESPONSES = [
    "I have known Sarah for 3 years as her direct supervisor at Sunrise Aged Care.",
    "She was a Personal Care Assistant responsible for daily living support for 12 residents.",
    "Excellent — never missed a shift in 3 years, always on time.",
    "Outstanding. She has a natural warmth with elderly clients, very patient and respectful.",
    "Yes absolutely. She remained calm during difficult situations and supported colleagues well.",
    "No performance concerns at all during her time with us.",
    "None whatsoever. She was a model employee.",
    "She handled conflict professionally and always sought resolution calmly.",
    "Yes, without hesitation. I would re-employ her immediately.",
    "Sarah is one of the best PCAs I have managed. Highly recommend her."
  ];

  function sendSMS() { setSent(true); setTimeout(()=>simulateResponses(),1500); }

  function simulateResponses() {
    setSimulating(true);
    setCurrentQ(0);
    setResponses([]);
    questions.forEach((_,i) => {
      setTimeout(()=>{
        setCurrentQ(i+1);
        setResponses(prev=>[...prev,{ q:questions[i], a:MOCK_RESPONSES[i]||"Response received." }]);
      },(i+1)*1200);
    });
    setTimeout(()=>setSimulating(false),questions.length*1200+500);
  }

  const inp = { padding:"8px 11px", border:`1.5px solid ${C.border}`, borderRadius:8, fontSize:13, color:C.text, fontFamily:"inherit", outline:"none", width:"100%" };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:700,padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:18,width:560,maxHeight:"90vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 100px rgba(0,0,0,0.25)"}}>
        <div style={{padding:"20px 24px 16px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:16,fontWeight:800,color:C.text}}>📱 SMS Reference Check</div>
          <div style={{fontSize:12,color:C.textMuted,marginTop:3}}>Questions sent automatically — referee replies at their own pace</div>
        </div>

        <div style={{overflowY:"auto",flex:1,padding:"20px 24px"}}>
          {!sent && (
            <div>
              <div style={{fontSize:12,fontWeight:700,color:C.textMid,marginBottom:14}}>Referee Details</div>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:20}}>
                <div><label style={{fontSize:11,fontWeight:700,color:C.textMuted,display:"block",marginBottom:4}}>Referee Full Name</label><input style={inp} placeholder="e.g. Jane Smith" value={refName} onChange={e=>setRefName(e.target.value)}/></div>
                <div><label style={{fontSize:11,fontWeight:700,color:C.textMuted,display:"block",marginBottom:4}}>Mobile Number</label><input style={inp} placeholder="04xx xxx xxx" value={refPhone} onChange={e=>setRefPhone(e.target.value)}/></div>
                <div><label style={{fontSize:11,fontWeight:700,color:C.textMuted,display:"block",marginBottom:4}}>Relationship to Candidate</label><input style={inp} placeholder="e.g. Direct Manager" value={refRole} onChange={e=>setRefRole(e.target.value)}/></div>
              </div>

              <div style={{fontSize:12,fontWeight:700,color:C.textMid,marginBottom:10}}>Questions to be sent ({questions.length} total — {sector==="earlyLearning"?"Early Learning":"Aged Care"} template)</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
                {questions.map((q,i)=>(
                  <div key={i} style={{display:"flex",gap:10,padding:"9px 12px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}>
                    <span style={{fontSize:11,fontWeight:700,color:C.primary,minWidth:20}}>{i+1}.</span>
                    <span style={{fontSize:12,color:C.text}}>{q}</span>
                  </div>
                ))}
              </div>

              <div style={{background:C.blueBg,border:`1px solid ${C.blueBorder}`,borderRadius:10,padding:"10px 14px",fontSize:12,color:C.blue,marginBottom:16}}>
                💡 Referee receives questions one at a time via SMS. Next question only sends after they reply. Ends with a thank you message. All responses captured automatically in Veriyo.
              </div>

              <button onClick={sendSMS} disabled={!refName||!refPhone} style={{width:"100%",padding:"11px 0",background:refName&&refPhone?C.primary:C.border,border:"none",borderRadius:9,color:C.white,fontSize:13,fontWeight:700,cursor:refName&&refPhone?"pointer":"default"}}>
                Send SMS Reference Check
              </button>
            </div>
          )}

          {sent && (
            <div>
              <div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:10,padding:"12px 16px",marginBottom:20,display:"flex",gap:8,alignItems:"center"}}>
                <span>✅</span>
                <div>
                  <div style={{fontSize:13,fontWeight:700,color:C.green}}>SMS sent to {refName||"referee"}</div>
                  <div style={{fontSize:12,color:C.textMid}}>Questions will be delivered one at a time. Responses appear below in real time.</div>
                </div>
              </div>

              {/* SMS simulation */}
              <div style={{background:"#1a1a2e",borderRadius:14,padding:16,marginBottom:16}}>
                <div style={{fontSize:11,color:"#888",textAlign:"center",marginBottom:12}}>SMS Conversation — {refPhone||"04xx xxx xxx"}</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div style={{alignSelf:"flex-start",background:"#2a2a4a",color:"#e2e8f0",borderRadius:"12px 12px 12px 4px",padding:"10px 14px",maxWidth:"85%",fontSize:12,lineHeight:1.5}}>
                    Hi {refName||"there"}, you've been listed as a referee for <strong>{candidate.name}</strong> at Veriyo. We have {questions.length} short questions. Reply START to begin.
                  </div>
                  {responses.length>0&&<div style={{alignSelf:"flex-end",background:C.primary,color:C.white,borderRadius:"12px 12px 4px 12px",padding:"8px 12px",fontSize:12}}>START</div>}
                  {responses.map((r,i)=>(
                    <div key={i} style={{display:"flex",flexDirection:"column",gap:6}}>
                      <div style={{alignSelf:"flex-start",background:"#2a2a4a",color:"#e2e8f0",borderRadius:"12px 12px 12px 4px",padding:"10px 14px",maxWidth:"85%",fontSize:12,lineHeight:1.5}}>
                        <span style={{color:"#34d17a",fontWeight:700}}>Q{i+1}:</span> {r.q}
                      </div>
                      <div style={{alignSelf:"flex-end",background:C.primary,color:C.white,borderRadius:"12px 12px 4px 12px",padding:"8px 12px",maxWidth:"85%",fontSize:12,lineHeight:1.5}}>{r.a}</div>
                    </div>
                  ))}
                  {simulating&&currentQ<questions.length&&(
                    <div style={{alignSelf:"flex-start",background:"#2a2a4a",color:"#888",borderRadius:"12px 12px 12px 4px",padding:"10px 14px",fontSize:12}}>
                      Sending Q{currentQ+1}... <span style={{animation:"pulse 1s infinite"}}>⏳</span>
                    </div>
                  )}
                  {!simulating&&responses.length===questions.length&&(
                    <div style={{alignSelf:"flex-start",background:"#2a2a4a",color:"#e2e8f0",borderRadius:"12px 12px 12px 4px",padding:"10px 14px",maxWidth:"85%",fontSize:12,lineHeight:1.5}}>
                      Thank you for completing this reference check for {candidate.name}. Your responses have been submitted securely to Veriyo. 🙏
                    </div>
                  )}
                </div>
              </div>

              {!simulating&&responses.length===questions.length&&(
                <div style={{background:C.primaryXLight,border:`1px solid ${C.primaryBorder}`,borderRadius:12,padding:"14px 16px"}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
                    <span>🤖</span>
                    <span style={{fontSize:12,fontWeight:700,color:C.primary}}>Veriyo AI — Reference Summary</span>
                  </div>
                  <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>
                    <strong>Overall:</strong> Strongly positive reference from direct supervisor with 3 years oversight.<br/>
                    <strong>Key strengths:</strong> Exceptional reliability, outstanding empathy with elderly clients, calm under pressure, professional conflict resolution.<br/>
                    <strong>Concerns:</strong> None identified.<br/>
                    <strong>Re-employ:</strong> Yes — without hesitation.<br/>
                    <strong>Recommendation:</strong> ✅ Reference check passed. No escalation required.
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{padding:"14px 24px",borderTop:`1px solid ${C.border}`}}>
          <button onClick={onClose} style={{width:"100%",padding:"9px 0",background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:8,color:C.textMid,fontSize:13,cursor:"pointer"}}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ─── DOCUMENT REVIEW MODAL ────────────────────────────────────────
function DocReviewModal({checkId, candidate, onClose, onUpdateCheck}) {
  const check = getCheckDef(checkId);
  const candidateCheck = candidate.checks.find(c=>c.id===checkId)||{};
  const [tab, setTab] = useState(candidateCheck.notes?.length>0?"ai":"upload");
  const [noteText, setNoteText] = useState("");
  const [noteRole, setNoteRole] = useState("Compliance Manager");
  const [decision, setDecision] = useState("");
  const [decisionReason, setDecisionReason] = useState("");
  const [uploading, setUploading] = useState(false);
  const [aiReading, setAiReading] = useState(false);
  const [aiStep, setAiStep] = useState(0);
  const [docUploaded, setDocUploaded] = useState(candidateCheck.notes?.length>0);
  const [showRefSMS, setShowRefSMS] = useState(false);
  const fileRef = useRef();

  const notes = candidateCheck.notes||[];
  const isEscalated = candidateCheck.status==="escalated";
  const isDecided = candidateCheck.decided;
  const typeCfg = CHECK_TYPE_CFG[check.type]||CHECK_TYPE_CFG.training;

  const AI_STEPS = ["Reading document type and issuer...","Verifying applicant name against candidate file...","Extracting key fields and dates...","Checking for escalation triggers...","Generating compliance summary..."];

  function simulateUpload() {
    setUploading(true);
    setTimeout(()=>{
      setUploading(false);
      setAiReading(true);
      setAiStep(0);
      setTab("ai");
      AI_STEPS.forEach((_,i)=>setTimeout(()=>{ setAiStep(i+1); if(i===AI_STEPS.length-1) { setTimeout(()=>{ setAiReading(false); setDocUploaded(true); onUpdateCheck(candidate.id,checkId,"notes",[...notes,{ role:"Veriyo AI",isAI:true,timestamp:ts(),text:`Document uploaded and verified. ${check.name} for ${candidate.name} — all key fields extracted successfully. Name matches candidate file. No escalation triggers detected. Document meets compliance requirements.`,decision:null }]); },400); } },( i+1)*800));
    },1200);
  }

  function addNote() {
    if(!noteText.trim()) return;
    const newNotes=[...notes,{role:noteRole,isAI:false,timestamp:ts(),text:noteText.trim(),decision:null}];
    onUpdateCheck(candidate.id,checkId,"notes",newNotes);
    setNoteText("");
  }

  function recordDecision() {
    if(!decision||!decisionReason.trim()) return;
    const newNotes=[...notes,{role:noteRole,isAI:false,timestamp:ts(),text:decisionReason.trim(),decision}];
    onUpdateCheck(candidate.id,checkId,"notes",newNotes);
    onUpdateCheck(candidate.id,checkId,"decided",true);
    onUpdateCheck(candidate.id,checkId,"status",decision==="Approved"?"complete":decision==="Rejected"?"not-started":"escalated");
  }

  const roleColors = { "Veriyo AI":{color:C.primary,bg:C.primaryXLight,border:C.primaryBorder,icon:"🤖"}, "Compliance Manager":{color:C.blue,bg:C.blueBg,border:C.blueBorder,icon:"🛡️"}, "HR Manager":{color:C.purple,bg:C.purpleBg,border:C.purpleBorder,icon:"👔"}, "Recruiter":{color:C.amber,bg:C.amberBg,border:C.amberBorder,icon:"🔍"} };

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:600,padding:16}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:18,width:600,maxHeight:"92vh",display:"flex",flexDirection:"column",boxShadow:"0 32px 100px rgba(0,0,0,0.25)"}}>

        {/* Header */}
        <div style={{padding:"18px 22px 0",borderBottom:`1px solid ${C.border}`,paddingBottom:14}}>
          <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:12}}>
            <div style={{display:"flex",gap:10,alignItems:"center"}}>
              <div style={{width:36,height:36,borderRadius:10,background:typeCfg.bg,border:`1.5px solid ${typeCfg.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{check.icon||"📄"}</div>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:15,fontWeight:800,color:C.text}}>{check.name}</span>
                  {isEscalated&&!isDecided&&<span style={{fontSize:10,fontWeight:700,color:C.red,background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:20,padding:"2px 8px"}}>🚨 Escalated</span>}
                  {isDecided&&<span style={{fontSize:10,fontWeight:700,color:C.green,background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:20,padding:"2px 8px"}}>✓ Decision Recorded</span>}
                </div>
                <div style={{fontSize:12,color:C.textMuted}}>{candidate.name} · {candidate.role}</div>
              </div>
            </div>
            <button onClick={onClose} style={{background:C.bg,border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:18,color:C.textMuted}}>×</button>
          </div>

          <div style={{display:"flex",gap:2}}>
            {[{id:"upload",label:"📤 Upload"},{id:"ai",label:`🤖 AI Review ${notes.length>0?`(${notes.length})`:""}`},{id:"notes",label:"💬 Notes"},{id:"guide",label:"🔍 Guide"},{id:"rules",label:"⚠️ ID Rules"}].filter(t=>!(!check.idRules&&t.id==="rules")).map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 13px",borderRadius:"7px 7px 0 0",border:"none",cursor:"pointer",fontSize:11,fontWeight:600,background:tab===t.id?C.white:"transparent",color:tab===t.id?C.primary:C.textMuted,borderBottom:tab===t.id?`2px solid ${C.primary}`:"2px solid transparent"}}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{overflowY:"auto",flex:1,padding:"18px 22px"}}>

          {/* UPLOAD */}
          {tab==="upload"&&(
            <div>
              {check.id==="ref"&&(
                <div style={{background:C.purpleBg,border:`1px solid ${C.purpleBorder}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.purple,marginBottom:6}}>📱 SMS Reference Check Available</div>
                  <div style={{fontSize:12,color:C.textMid,marginBottom:10}}>Instead of chasing referees by phone, send an automated SMS survey. Referee answers questions one by one at their own pace.</div>
                  <button onClick={()=>setShowRefSMS(true)} style={{padding:"8px 18px",background:C.purple,border:"none",borderRadius:8,color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Launch SMS Reference Check →</button>
                </div>
              )}

              <div style={{fontSize:12,fontWeight:700,color:C.textMid,marginBottom:10}}>Accepted document types</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:16}}>
                {(check.acceptedDocs||[]).map(d=>(
                  <div key={d.id} style={{padding:"10px 14px",borderRadius:9,background:C.bg,border:`1px solid ${C.border}`,fontSize:13,color:C.text}}>
                    <span style={{color:C.primary,marginRight:8}}>✓</span>{d.label}
                    {d.description&&<div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{d.description}</div>}
                  </div>
                ))}
              </div>

              <div onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${C.primaryBorder}`,borderRadius:12,padding:"28px 20px",textAlign:"center",cursor:"pointer",background:C.primaryXLight}}>
                <div style={{fontSize:28,marginBottom:8}}>📄</div>
                <div style={{fontSize:14,fontWeight:700,color:C.primary,marginBottom:4}}>Drop document here or click to browse</div>
                <div style={{fontSize:12,color:C.textMuted}}>PDF, JPG, PNG accepted</div>
                <input ref={fileRef} type="file" style={{display:"none"}} onChange={simulateUpload}/>
              </div>
              <button onClick={simulateUpload} disabled={uploading} style={{marginTop:12,width:"100%",padding:"10px 0",background:uploading?C.border:C.primary,border:"none",borderRadius:9,color:C.white,fontSize:13,fontWeight:700,cursor:uploading?"default":"pointer"}}>
                {uploading?"⏳ Uploading...":"Upload & Run AI Check"}
              </button>
            </div>
          )}

          {/* AI REVIEW */}
          {tab==="ai"&&(
            <div>
              {aiReading&&(
                <div style={{background:C.primaryXLight,border:`1px solid ${C.primaryBorder}`,borderRadius:12,padding:"18px 16px",marginBottom:16}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                    <div style={{width:26,height:26,borderRadius:7,background:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🤖</div>
                    <span style={{fontSize:12,fontWeight:700,color:C.primary}}>Veriyo AI is reading this document</span>
                  </div>
                  {AI_STEPS.map((s,i)=>(
                    <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:6,opacity:i<aiStep?1:0.3,transition:"opacity 0.4s"}}>
                      <span style={{fontSize:13}}>{i<aiStep?"✅":"⏳"}</span>
                      <span style={{fontSize:12,color:i<aiStep?C.text:C.textMuted}}>{s}</span>
                    </div>
                  ))}
                </div>
              )}

              {!aiReading&&notes.length===0&&(
                <div style={{textAlign:"center",padding:"40px 0",color:C.textMuted}}>
                  <div style={{fontSize:32,marginBottom:10}}>📤</div>
                  <div style={{fontSize:14,fontWeight:600,color:C.text}}>No document uploaded yet</div>
                  <div style={{fontSize:12,marginTop:4}}>Go to Upload tab to add a document.</div>
                </div>
              )}

              {notes.filter(n=>n.isAI).map((note,i)=>(
                <div key={i} style={{background:isEscalated&&!isDecided?C.redBg:C.primaryXLight,border:`1px solid ${isEscalated&&!isDecided?C.redBorder:C.primaryBorder}`,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                    <div style={{width:26,height:26,borderRadius:7,background:isEscalated&&!isDecided?C.red:C.primary,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🤖</div>
                    <span style={{fontSize:12,fontWeight:700,color:isEscalated&&!isDecided?C.red:C.primary}}>
                      Veriyo AI — {isEscalated&&!isDecided?"🚨 Escalation Required":"✅ Analysis Complete"}
                    </span>
                    <span style={{marginLeft:"auto",fontSize:11,color:C.textMuted}}>{note.timestamp}</span>
                  </div>
                  <div style={{fontSize:12,color:C.text,lineHeight:1.7}}>{note.text}</div>
                </div>
              ))}

              {isEscalated&&!isDecided&&(
                <div style={{background:C.amberBg,border:`1px solid ${C.amberBorder}`,borderRadius:12,padding:"16px 18px",marginTop:12}}>
                  <div style={{fontSize:13,fontWeight:700,color:C.amber,marginBottom:4}}>⚠️ Decision Required</div>
                  <div style={{fontSize:12,color:C.textMid,marginBottom:14}}>Review the document and notes, then record your decision.</div>
                  <div style={{display:"flex",gap:8,marginBottom:12}}>
                    {["Approved","Escalate to HR","Rejected"].map(d=>(
                      <button key={d} onClick={()=>setDecision(d)} style={{flex:1,padding:"9px 0",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,background:decision===d?(d==="Approved"?C.green:d==="Rejected"?C.red:C.amber):C.white,color:decision===d?C.white:(d==="Approved"?C.green:d==="Rejected"?C.red:C.amber),border:`2px solid ${d==="Approved"?C.green:d==="Rejected"?C.red:C.amber}`,transition:"all 0.15s"}}>{d}</button>
                    ))}
                  </div>
                  <select value={noteRole} onChange={e=>setNoteRole(e.target.value)} style={{width:"100%",padding:"7px 10px",border:`1.5px solid ${C.border}`,borderRadius:7,fontSize:12,color:C.text,fontFamily:"inherit",marginBottom:8,outline:"none"}}>
                    <option>Compliance Manager</option><option>HR Manager</option>
                  </select>
                  <textarea value={decisionReason} onChange={e=>setDecisionReason(e.target.value)} placeholder="Mandatory: Record your reason for this decision..." rows={3} style={{width:"100%",padding:"8px 10px",border:`1.5px solid ${C.amberBorder}`,borderRadius:7,fontSize:12,fontFamily:"inherit",resize:"none",outline:"none"}}/>
                  <button onClick={recordDecision} disabled={!decision||!decisionReason.trim()} style={{marginTop:10,width:"100%",padding:"10px 0",background:decision&&decisionReason.trim()?C.primary:C.border,border:"none",borderRadius:8,color:C.white,fontSize:13,fontWeight:700,cursor:decision&&decisionReason.trim()?"pointer":"default"}}>Record Decision</button>
                </div>
              )}

              {isDecided&&<div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:10,padding:"12px 16px",display:"flex",gap:8,alignItems:"center",marginTop:12}}><span>✅</span><span style={{fontSize:13,fontWeight:700,color:C.green}}>Decision recorded. Audit trail updated.</span></div>}
            </div>
          )}

          {/* NOTES */}
          {tab==="notes"&&(
            <div>
              <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                {notes.length===0&&<div style={{textAlign:"center",padding:"24px 0",color:C.textMuted,fontSize:13}}>No notes yet. Upload a document first.</div>}
                {notes.map((note,i)=>{
                  const rc=roleColors[note.role]||roleColors["Compliance Manager"];
                  return(
                    <div key={i} style={{background:rc.bg,border:`1px solid ${rc.border}`,borderRadius:10,padding:"12px 14px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                        <div style={{display:"flex",gap:6,alignItems:"center"}}>
                          <span>{rc.icon}</span>
                          <span style={{fontSize:12,fontWeight:700,color:rc.color}}>{note.role}</span>
                          {note.isAI&&<span style={{fontSize:10,color:C.primary,background:C.white,border:`1px solid ${C.primaryBorder}`,borderRadius:4,padding:"1px 5px",fontWeight:700}}>AI</span>}
                        </div>
                        <span style={{fontSize:11,color:C.textMuted}}>{note.timestamp}</span>
                      </div>
                      <div style={{fontSize:12,color:C.text,lineHeight:1.6}}>{note.text}</div>
                      {note.decision&&<div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:5,fontSize:11,fontWeight:700,padding:"2px 10px",borderRadius:20,background:note.decision==="Approved"?C.greenBg:note.decision==="Escalate to HR"?C.amberBg:C.redBg,color:note.decision==="Approved"?C.green:note.decision==="Escalate to HR"?C.amber:C.red,border:`1px solid ${note.decision==="Approved"?C.greenBorder:note.decision==="Escalate to HR"?C.amberBorder:C.redBorder}`}}>Decision: {note.decision}</div>}
                    </div>
                  );
                })}
              </div>
              {docUploaded&&(
                <div style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:10,padding:14}}>
                  <select value={noteRole} onChange={e=>setNoteRole(e.target.value)} style={{width:"100%",padding:"7px 10px",border:`1.5px solid ${C.border}`,borderRadius:7,fontSize:12,color:C.text,fontFamily:"inherit",marginBottom:8,outline:"none"}}>
                    <option>Compliance Manager</option><option>HR Manager</option><option>Recruiter</option>
                  </select>
                  <textarea value={noteText} onChange={e=>setNoteText(e.target.value)} placeholder="Add review notes, context, or observations..." rows={3} style={{width:"100%",padding:"8px 10px",border:`1.5px solid ${C.border}`,borderRadius:7,fontSize:12,fontFamily:"inherit",resize:"vertical",outline:"none"}}/>
                  <button onClick={addNote} style={{marginTop:8,padding:"8px 18px",background:C.primary,border:"none",borderRadius:7,color:C.white,fontSize:12,fontWeight:700,cursor:"pointer"}}>Add Note</button>
                </div>
              )}
            </div>
          )}

          {/* GUIDE */}
          {tab==="guide"&&(
            <div>
              <div style={{background:C.primaryXLight,border:`1px solid ${C.primaryBorder}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:C.primary,marginBottom:4}}>What Veriyo AI looks for in this document</div>
                <div style={{fontSize:12,color:C.textMid}}>These fields are extracted and verified automatically on every upload.</div>
              </div>
              <div style={{marginBottom:20}}>
                <div style={{fontSize:12,fontWeight:700,color:C.text,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fields Extracted Automatically</div>
                {(check.aiLookFor||[]).map((item,i)=>(
                  <div key={i} style={{display:"flex",gap:10,padding:"9px 12px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:8,marginBottom:6}}>
                    <span style={{color:C.primary,fontWeight:700}}>✓</span>
                    <span style={{fontSize:13,color:C.text}}>{item}</span>
                  </div>
                ))}
              </div>
              {(check.escalateIf||[]).length>0&&(
                <div>
                  <div style={{fontSize:12,fontWeight:700,color:C.red,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Auto-Escalation Triggers</div>
                  <div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:10,padding:"12px 14px"}}>
                    <div style={{fontSize:12,color:C.textMid,marginBottom:10}}>If any of these are detected, Veriyo escalates immediately to Compliance Manager and HR:</div>
                    {check.escalateIf.map((t,i)=>(
                      <div key={i} style={{display:"flex",gap:8,alignItems:"center",marginBottom:5}}>
                        <span style={{color:C.red}}>🚨</span>
                        <span style={{fontSize:12,color:C.text,fontFamily:"monospace",background:C.white,padding:"2px 8px",borderRadius:4,border:`1px solid ${C.redBorder}`}}>"{t}"</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ID RULES */}
          {tab==="rules"&&check.idRules&&(
            <div>
              <div style={{background:C.amberBg,border:`1px solid ${C.amberBorder}`,borderRadius:12,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:C.amber,marginBottom:4}}>⚠️ Australian ID Document Requirements</div>
                <div style={{fontSize:12,color:C.textMid}}>Documents that don't meet these requirements will be automatically rejected by Veriyo AI with a specific reason for the candidate to resubmit.</div>
              </div>
              {check.idRules.map((rule,i)=>(
                <div key={i} style={{display:"flex",gap:12,padding:"12px 14px",background:C.bg,border:`1px solid ${C.border}`,borderRadius:9,marginBottom:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:16,flexShrink:0}}>{"🪪📸📄🔍✅🤳".split("")[i]||"✓"}</span>
                  <span style={{fontSize:13,color:C.text,lineHeight:1.5}}>{rule}</span>
                </div>
              ))}
              <div style={{background:C.blueBg,border:`1px solid ${C.blueBorder}`,borderRadius:10,padding:"12px 14px",marginTop:4,fontSize:12,color:C.blue,lineHeight:1.7}}>
                <strong>Liveness Detection:</strong> To prevent AI-generated document fraud, Veriyo requires a selfie photo showing the candidate holding their ID document next to their face, or a thumbs-up selfie confirming live presence. This is checked automatically before document content is read.
              </div>
            </div>
          )}
        </div>
      </div>
      {showRefSMS&&<RefSMSModal check={check} candidate={candidate} onClose={()=>setShowRefSMS(false)}/>}
    </div>
  );
}

// ─── WORKFLOW MODAL ───────────────────────────────────────────────
function WorkflowModal({candidate, onClose, onAssign}) {
  const facility = FACILITIES.find(f=>f.id===candidate.facilityId);
  const sectorChecks = ALL_CHECKS.filter(c=>c.sectors.includes(candidate.sector));
  const getDefault = check => {
    if(check.category==="mandatory") return true;
    if(check.category==="conditional") { if(check.condition==="ndisRequired") return facility?.ndisRequired||false; if(check.condition==="isHealthProfessional") return candidate.isHealthProfessional; if(check.condition==="seniorRole") return candidate.isSeniorRole; if(check.condition==="alwaysTrue") return true; }
    return false;
  };
  const [selected, setSelected] = useState(Object.fromEntries(sectorChecks.map(c=>[c.id,getDefault(c)])));
  const mandatory = sectorChecks.filter(c=>c.category==="mandatory");
  const conditional = sectorChecks.filter(c=>c.category==="conditional");
  const optional = sectorChecks.filter(c=>c.category==="optional");
  const count = Object.values(selected).filter(Boolean).length;

  const catBadge = (label,color,bg,border) => <div style={{fontSize:10,fontWeight:700,color,background:bg,border:`1px solid ${border}`,borderRadius:5,padding:"2px 8px",display:"inline-block",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>{label}</div>;

  const row = check => {
    const isMand = check.category==="mandatory";
    const sel = selected[check.id];
    const tc = CHECK_TYPE_CFG[check.type]||{};
    return(
      <div key={check.id} onClick={()=>!isMand&&setSelected(p=>({...p,[check.id]:!p[check.id]}))} style={{display:"flex",gap:10,padding:"10px 12px",borderRadius:9,marginBottom:5,border:`1.5px solid ${sel?C.primaryBorder:C.border}`,background:sel?C.primaryXLight:C.bg,cursor:isMand?"default":"pointer",alignItems:"flex-start"}}>
        <div style={{width:17,height:17,borderRadius:4,background:sel?C.primary:C.white,border:`2px solid ${sel?C.primary:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>{sel&&<span style={{color:C.white,fontSize:10,fontWeight:700}}>✓</span>}</div>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:13}}>{check.icon}</span><span style={{fontSize:13,fontWeight:600,color:C.text}}>{check.name}</span>{isMand&&<span style={{fontSize:9,color:C.red,background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:3,padding:"1px 5px",fontWeight:700}}>REQUIRED</span>}</div>
          {check.conditionLabel&&<div style={{fontSize:11,color:C.textMuted,marginTop:1}}>{check.conditionLabel}</div>}
          {check.optionalNote&&<div style={{fontSize:11,color:C.amber,marginTop:1}}>⚠️ {check.optionalNote}</div>}
        </div>
      </div>
    );
  };

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:500}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:18,width:500,maxHeight:"88vh",display:"flex",flexDirection:"column",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
        <div style={{padding:"20px 22px 14px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:15,fontWeight:800,color:C.text}}>Assign Compliance Checks</div>
          <div style={{fontSize:12,color:C.textMuted,marginTop:3}}>{candidate.name} · {facilityName(candidate.facilityId)}</div>
          <div style={{marginTop:10,background:C.blueBg,border:`1px solid ${C.blueBorder}`,borderRadius:8,padding:"8px 12px",fontSize:12,color:C.blue}}>💡 Mandatory checks are locked. Conditional checks are pre-selected based on this facility. Deselect anything that doesn't apply.</div>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"16px 22px"}}>
          <div style={{marginBottom:16}}>{catBadge("Mandatory — Always Required",C.red,C.redBg,C.redBorder)}{mandatory.map(row)}</div>
          <div style={{marginBottom:16}}>{catBadge("Conditional — Role & Facility",C.blue,C.blueBg,C.blueBorder)}{conditional.map(row)}</div>
          <div>{catBadge("Optional — Recommended Only",C.amber,C.amberBg,C.amberBorder)}{optional.map(row)}</div>
        </div>
        <div style={{padding:"14px 22px",borderTop:`1px solid ${C.border}`,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:12,color:C.textMuted,flex:1}}>{count} checks selected</span>
          <button onClick={onClose} style={{padding:"9px 16px",background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:8,color:C.textMid,fontSize:13,fontWeight:600,cursor:"pointer"}}>Cancel</button>
          <button onClick={()=>onAssign(candidate.id,Object.entries(selected).filter(([,v])=>v).map(([k])=>k))} style={{padding:"9px 18px",background:C.primary,border:"none",borderRadius:8,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Assign & Trigger Checks</button>
        </div>
      </div>
    </div>
  );
}

// ─── CANDIDATE DETAIL ─────────────────────────────────────────────
function CandidateDetail({candidate, onClose, onAssignWorkflow, isHiringManager, onUpdateCheck, onOpenDoc}) {
  const prog = progressOf(candidate.checks);
  const s1 = s1Done(candidate.checks);
  const stage1 = candidate.checks.filter(c=>c.stage===1);
  const stage2 = candidate.checks.filter(c=>c.stage===2);
  const sc = candidate.sector==="agedCare"?C.primary:C.teal;

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:400}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.white,borderRadius:18,width:560,maxHeight:"90vh",overflow:"auto",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}}>
        <div style={{padding:"20px 22px 0",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <Avatar name={candidate.name} color={sc} size={42}/>
            <div>
              <div style={{fontSize:17,fontWeight:800,color:C.text}}>{candidate.name}</div>
              <div style={{fontSize:12,color:C.textMuted}}>{candidate.role} · {facilityName(candidate.facilityId)}</div>
            </div>
          </div>
          <button onClick={onClose} style={{background:C.bg,border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:18,color:C.textMuted}}>×</button>
        </div>

        <div style={{padding:"14px 22px",display:"flex",gap:16,flexWrap:"wrap",borderBottom:`1px solid ${C.border}`,marginTop:14}}>
          {[{l:"Recruiter",v:candidate.recruiter},{l:"Days in Pipeline",v:`${candidate.daysInPipeline}d`},{l:"Triggered",v:candidate.triggeredAt}].map(({l,v})=>(
            <div key={l}><div style={{fontSize:10,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>{l}</div><div style={{fontSize:13,color:C.text,fontWeight:500}}>{v}</div></div>
          ))}
          <div><div style={{fontSize:10,color:C.textMuted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:3}}>Status</div><Pill status={candidate.overallStatus} cfg={OVERALL_CFG} small/></div>
        </div>

        {isHiringManager&&(
          <div style={{padding:"12px 22px",borderBottom:`1px solid ${C.border}`,background:C.primaryXLight}}>
            <div style={{fontSize:11,fontWeight:700,color:C.primary,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6}}>Candidate Contact</div>
            <div style={{display:"flex",gap:20}}>
              <div><div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>📧 Email</div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{candidate.email}</div></div>
              <div><div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>📱 Phone</div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{candidate.phone}</div></div>
            </div>
            <div style={{marginTop:8,fontSize:11,color:C.textMid,background:C.white,border:`1px solid ${C.primaryBorder}`,borderRadius:7,padding:"6px 10px"}}>💬 You can contact the candidate directly if checks are delayed.</div>
          </div>
        )}

        <div style={{padding:"18px 22px"}}>
          {candidate.alert&&(
            <div style={{display:"flex",gap:10,background:candidate.alert.type==="error"?C.redBg:C.amberBg,border:`1px solid ${candidate.alert.type==="error"?C.redBorder:C.amberBorder}`,borderRadius:10,padding:"12px 14px",marginBottom:16}}>
              <span>{candidate.alert.type==="error"?"🚨":"⚠️"}</span>
              <div><div style={{fontSize:12,fontWeight:700,color:candidate.alert.type==="error"?C.red:C.amber}}>{candidate.alert.type==="error"?"Action Required":"Attention Needed"}</div><div style={{fontSize:12,color:C.textMid,marginTop:2}}>{candidate.alert.message}</div></div>
            </div>
          )}

          {candidate.checks.length===0&&(
            <div style={{textAlign:"center",padding:"20px 0"}}>
              <div style={{fontSize:32,marginBottom:8}}>📋</div>
              <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:6}}>No checks assigned yet</div>
              {!isHiringManager&&<button onClick={()=>onAssignWorkflow(candidate)} style={{padding:"10px 22px",background:C.primary,border:"none",borderRadius:8,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Assign Checks Now</button>}
              {isHiringManager&&<div style={{fontSize:13,color:C.textMuted}}>Contact your compliance team to assign checks.</div>}
            </div>
          )}

          {candidate.checks.length>0&&(
            <>
              <div style={{marginBottom:16}}><ProgressBar pct={prog} s1={s1}/></div>

              {stage1.length>0&&(
                <div style={{marginBottom:14}}>
                  <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:700,color:C.text,textTransform:"uppercase",letterSpacing:"0.04em"}}>Stage 1 — Pre-Offer</div>
                    {s1&&<span style={{fontSize:10,color:C.green,background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:20,padding:"1px 7px",fontWeight:700}}>Complete ✓</span>}
                  </div>
                  {stage1.map(chk=>{
                    const def=getCheckDef(chk.id); const sc2=CHECK_STATUS_CFG[chk.status]; const tc=CHECK_TYPE_CFG[def.type]||{};
                    return(
                      <div key={chk.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",borderRadius:9,marginBottom:5,background:sc2.bg,border:`1px solid ${sc2.border}`}}>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}><span>{def.icon||"📄"}</span><span style={{fontSize:13,fontWeight:500,color:C.text}}>{def.name}</span></div>
                        <div style={{display:"flex",gap:8,alignItems:"center"}}>
                          {chk.completedAt&&<span style={{fontSize:11,color:C.textMuted}}>{chk.completedAt}</span>}
                          <Pill status={chk.status} cfg={CHECK_STATUS_CFG} small/>
                          {!isHiringManager&&<button onClick={()=>onOpenDoc(chk.id)} style={{fontSize:11,padding:"4px 10px",background:C.white,border:`1px solid ${C.primaryBorder}`,borderRadius:6,color:C.primary,cursor:"pointer",fontWeight:600}}>Review</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {s1&&<div style={{background:C.greenBg,border:`1px solid ${C.greenBorder}`,borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",gap:8,alignItems:"center"}}><span>🎉</span><div style={{fontSize:13,fontWeight:700,color:C.green}}>Stage 1 complete — offer ready to send</div></div>}

              {stage2.length>0&&(
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:11,fontWeight:700,color:C.text,textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:8}}>Stage 2 — Compliance Checks</div>
                  {stage2.map(chk=>{
                    const def=getCheckDef(chk.id); const sc2=CHECK_STATUS_CFG[chk.status]; 
                    const delayR = chk.status==="awaiting-candidate"?"⏳ Awaiting candidate upload":chk.status==="overdue"?"🚨 Overdue":chk.status==="in-progress"?"🔄 System processing":null;
                    return(
                      <div key={chk.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 12px",borderRadius:9,marginBottom:5,background:chk.status==="escalated"?C.redBg:sc2.bg,border:`1px solid ${chk.status==="escalated"?C.redBorder:sc2.border}`}}>
                        <div style={{display:"flex",gap:8,alignItems:"flex-start"}}>
                          <span style={{marginTop:1}}>{def.icon||"📄"}</span>
                          <div><div style={{fontSize:13,fontWeight:500,color:C.text}}>{def.name}</div>{delayR&&<div style={{fontSize:11,color:sc2.color,marginTop:2,fontWeight:600}}>{delayR}</div>}</div>
                        </div>
                        <div style={{display:"flex",gap:8,alignItems:"center",flexShrink:0,marginLeft:8}}>
                          {chk.completedAt&&<span style={{fontSize:11,color:C.textMuted}}>{chk.completedAt}</span>}
                          <Pill status={chk.status} cfg={CHECK_STATUS_CFG} small/>
                          {!isHiringManager&&<button onClick={()=>onOpenDoc(chk.id)} style={{fontSize:11,padding:"4px 10px",background:chk.status==="escalated"?C.red:C.primary,border:"none",borderRadius:6,color:C.white,cursor:"pointer",fontWeight:600}}>{chk.status==="escalated"?"🚨 Review":"Review"}</button>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {prog===100&&<div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:12,padding:"16px 18px",textAlign:"center"}}><div style={{fontSize:26,marginBottom:6}}>✅</div><div style={{fontSize:15,fontWeight:800,color:C.green}}>Fully cleared — ready to start</div><div style={{fontSize:12,color:C.textMid,marginTop:4}}>All checks complete.</div></div>}

              {!isHiringManager&&(
                <div style={{display:"flex",gap:10,marginTop:14}}>
                  <button style={{flex:1,padding:"9px 0",background:C.primaryXLight,border:`1.5px solid ${C.primaryBorder}`,borderRadius:8,color:C.primary,fontSize:13,fontWeight:600,cursor:"pointer"}}>Send Reminder</button>
                  <button style={{flex:1,padding:"9px 0",background:C.primary,border:"none",borderRadius:8,color:C.white,fontSize:13,fontWeight:700,cursor:"pointer"}}>Download Report</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────
export default function VeriyoOnboard() {
  const [candidates, setCandidates] = useState(INIT_CANDIDATES);
  const [role, setRole] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState("");
  const [selected, setSelected] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [docReview, setDocReview] = useState(null);
  const [pipeFilter, setPipeFilter] = useState("pipeline");
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  function updateCheck(candidateId, checkId, field, value) {
    setCandidates(prev=>prev.map(c=>{
      if(c.id!==candidateId) return c;
      return {...c, checks:c.checks.map(ch=>ch.id===checkId?{...ch,[field]:value}:ch)};
    }));
    if(selected?.id===candidateId) setSelected(prev=>({...prev,checks:prev.checks.map(ch=>ch.id===checkId?{...ch,[field]:value}:ch)}));
  }

  function assignChecks(candidateId, checkIds) {
    const newChecks = checkIds.map(id=>{ const def=getCheckDef(id); return {id,stage:["ref","rtw","id"].includes(id)?1:2,status:"not-started",completedAt:null,notes:[],decided:false}; });
    setCandidates(prev=>prev.map(c=>c.id!==candidateId?c:{...c,overallStatus:"on-track",alert:null,checks:newChecks}));
    setAssigning(null); setSelected(null);
  }

  const isHM = role==="hiring";
  const stats = { total:candidates.length, onTrack:candidates.filter(c=>c.overallStatus==="on-track").length, needsAction:candidates.filter(c=>["needs-action","pending-workflow"].includes(c.overallStatus)).length, delayed:candidates.filter(c=>c.overallStatus==="delayed").length, cleared:candidates.filter(c=>c.overallStatus==="cleared").length };

  let visible = [...candidates];
  if(role==="recruiter") visible=visible.filter(c=>["Chris T.","Loula O."].includes(c.recruiter));
  if(isHM&&selectedFacility) visible=visible.filter(c=>c.facilityId===selectedFacility);
  if(pipeFilter==="pipeline") visible=visible.filter(c=>c.overallStatus!=="cleared");
  if(pipeFilter==="cleared") visible=visible.filter(c=>c.overallStatus==="cleared");
  if(statusFilter!=="all") visible=visible.filter(c=>c.overallStatus===statusFilter);
  if(search) visible=visible.filter(c=>c.name.toLowerCase().includes(search.toLowerCase())||c.role.toLowerCase().includes(search.toLowerCase())||facilityName(c.facilityId).toLowerCase().includes(search.toLowerCase()));

  // ── ROLE SELECT ──
  if(!role) return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} @keyframes pulse{0%,100%{opacity:0.4;transform:scale(0.8);}50%{opacity:1;transform:scale(1.2);}}`}</style>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:40}}>
        <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26,122,74,0.3)"}}>
          <svg width="22" height="22" viewBox="0 0 18 18" fill="none"><path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{fontSize:30,fontWeight:800,color:C.text,letterSpacing:"-1px"}}>veriyo<span style={{color:C.primary}}>.</span></span>
      </div>
      <div style={{fontSize:22,fontWeight:800,color:C.text,marginBottom:8,textAlign:"center"}}>Who are you signing in as?</div>
      <div style={{fontSize:14,color:C.textMuted,marginBottom:36,textAlign:"center"}}>Each role sees exactly what's relevant — nothing more.</div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap",justifyContent:"center"}}>
        {[{id:"compliance",label:"Compliance Manager",desc:"Full visibility across all facilities, all candidates, all checks. Manage workflows, review documents, make decisions.",icon:"🛡️"},{id:"recruiter",label:"Recruiter",desc:"Your candidates only. See what needs your attention. Veriyo handles compliance — you focus on people.",icon:"🔍"},{id:"hiring",label:"Hiring Manager",desc:"Your facility's candidates only. See check progress and candidate contact details.",icon:"🏥"}].map(r=>(
          <div key={r.id} onClick={()=>setRole(r.id)} style={{background:C.white,border:`2px solid ${C.border}`,borderRadius:16,padding:"24px 20px",width:200,cursor:"pointer",textAlign:"center",boxShadow:"0 2px 8px rgba(0,0,0,0.06)",transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.transform="translateY(-3px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.transform="translateY(0)";}}>
            <div style={{fontSize:38,marginBottom:12}}>{r.icon}</div>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>{r.label}</div>
            <div style={{fontSize:12,color:C.textMuted,lineHeight:1.5}}>{r.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── FACILITY SELECT ──
  if(isHM&&!selectedFacility) return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'); *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{background:C.white,borderRadius:18,padding:32,width:400,boxShadow:"0 8px 32px rgba(0,0,0,0.10)"}}>
        <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>Select your facility</div>
        <div style={{fontSize:13,color:C.textMuted,marginBottom:20}}>You'll only see candidates coming to your location.</div>
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {FACILITIES.map(f=>(
            <div key={f.id} onClick={()=>setSelectedFacility(f.id)} style={{padding:"11px 14px",borderRadius:9,cursor:"pointer",border:`1.5px solid ${C.border}`,background:C.bg,transition:"all 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.primary;e.currentTarget.style.background=C.primaryXLight;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.bg;}}>
              <div style={{fontSize:13,fontWeight:600,color:C.text}}>{f.name}</div>
              <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>{f.sector==="agedCare"?"Aged Care":"Early Learning"}{f.ndisRequired?" · NDIS facility":""}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>setRole(null)} style={{marginTop:16,width:"100%",padding:"9px 0",background:"transparent",border:`1.5px solid ${C.border}`,borderRadius:8,color:C.textMid,fontSize:13,cursor:"pointer"}}>← Back</button>
      </div>
    </div>
  );

  // ── MAIN DASHBOARD ──
  return(
    <div style={{fontFamily:"'Inter',system-ui,sans-serif",background:C.bg,minHeight:"100vh",color:C.text}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@500&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} ::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:#c8ddd4;border-radius:99px;} @keyframes pulse{0%,100%{opacity:0.4;}50%{opacity:1;}}`}</style>

      <nav style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:56,boxShadow:"0 1px 0 rgba(0,0,0,0.04)"}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:28,height:28,borderRadius:7,background:`linear-gradient(135deg,${C.primary},${C.accent})`,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 2L15 5.5V12.5L9 16L3 12.5V5.5L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{fontSize:16,fontWeight:800,color:C.text,letterSpacing:"-0.5px"}}>veriyo<span style={{color:C.primary}}>.</span></span>
          <span style={{fontSize:9,fontWeight:700,color:C.primary,background:C.primaryXLight,border:`1px solid ${C.primaryBorder}`,borderRadius:4,padding:"2px 6px",textTransform:"uppercase",letterSpacing:"0.06em"}}>Onboard</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{fontSize:11,fontWeight:600,color:C.textMid,background:C.bg,border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px"}}>
            {role==="compliance"?"🛡️ Compliance Manager":role==="recruiter"?"🔍 Recruiter":`🏥 ${FACILITIES.find(f=>f.id===selectedFacility)?.name.split("—")[0].trim()}`}
          </div>
          {stats.needsAction>0&&role==="compliance"&&<div style={{background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700,color:C.red}}>🚨 {stats.needsAction} need action</div>}
          <button onClick={()=>{setRole(null);setSelectedFacility("");}} style={{fontSize:11,color:C.textMuted,background:"transparent",border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px",cursor:"pointer"}}>Switch Role</button>
        </div>
      </nav>

      <div style={{padding:"22px 28px",maxWidth:1000,margin:"0 auto"}}>
        <div style={{marginBottom:18}}>
          <h1 style={{fontSize:19,fontWeight:800,color:C.text,letterSpacing:"-0.5px"}}>{role==="compliance"?"Pre-Employment Pipeline":role==="recruiter"?"My Candidates":`Incoming Candidates — ${FACILITIES.find(f=>f.id===selectedFacility)?.name}`}</h1>
          <p style={{fontSize:12,color:C.textMuted,marginTop:3}}>{role==="compliance"?"Every candidate across every facility — checks, documents, and decisions in one place.":role==="recruiter"?"Your candidates only. Veriyo handles compliance automatically.":"Read-only view of candidates joining your team. Contact details available for follow-up."}</p>
        </div>

        {role==="compliance"&&(
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
            {[{l:"In Pipeline",v:stats.total,c:C.text,i:"👥"},{l:"On Track",v:stats.onTrack,c:C.green,i:"✅"},{l:"Needs Action",v:stats.needsAction,c:C.red,i:"🚨"},{l:"Delayed",v:stats.delayed,c:C.amber,i:"⏳"},{l:"Cleared",v:stats.cleared,c:C.green,i:"🎉"}].map(s=>(
              <div key={s.l} style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px 16px",flex:1,minWidth:100,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><div style={{fontSize:22,fontWeight:800,color:s.c,fontFamily:"'DM Mono',monospace"}}>{s.v}</div><span style={{fontSize:16}}>{s.i}</span></div>
                <div style={{fontSize:11,fontWeight:600,color:C.text}}>{s.l}</div>
              </div>
            ))}
          </div>
        )}

        {isHM&&<div style={{background:C.primaryXLight,border:`1px solid ${C.primaryBorder}`,borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:12,color:C.primary}}>👁️ Read-only view. Contact your compliance team for any actions required.</div>}

        <div style={{background:C.white,border:`1px solid ${C.border}`,borderRadius:12,padding:"11px 14px",marginBottom:12,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, role, facility..." style={{padding:"7px 11px",border:`1.5px solid ${C.border}`,borderRadius:8,fontSize:12,color:C.text,outline:"none",width:200,fontFamily:"inherit"}}/>
          <div style={{display:"flex",gap:4}}>
            {[{id:"pipeline",l:"📋 In Pipeline"},{id:"cleared",l:"🎉 Cleared"},{id:"all",l:"All"}].map(f=>(
              <button key={f.id} onClick={()=>setPipeFilter(f.id)} style={{padding:"5px 11px",borderRadius:7,border:`1.5px solid ${pipeFilter===f.id?C.primaryBorder:C.border}`,background:pipeFilter===f.id?C.primaryXLight:"transparent",color:pipeFilter===f.id?C.primary:C.textMid,fontSize:11,fontWeight:600,cursor:"pointer"}}>{f.l}</button>
            ))}
          </div>
          {role==="compliance"&&(
            <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
              {[{id:"all",l:"All"},{id:"needs-action",l:"🚨 Action"},{id:"pending-workflow",l:"⚠️ No Workflow"},{id:"delayed",l:"⏳ Delayed"},{id:"on-track",l:"✓ On Track"}].map(f=>(
                <button key={f.id} onClick={()=>setStatusFilter(f.id)} style={{padding:"5px 10px",borderRadius:7,border:`1.5px solid ${statusFilter===f.id?C.primaryBorder:C.border}`,background:statusFilter===f.id?C.primaryXLight:"transparent",color:statusFilter===f.id?C.primary:C.textMid,fontSize:11,fontWeight:600,cursor:"pointer"}}>{f.l}</button>
              ))}
            </div>
          )}
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {visible.length===0&&(
            <div style={{textAlign:"center",padding:"48px 0",color:C.textMuted}}>
              <div style={{fontSize:32,marginBottom:10}}>✅</div>
              <div style={{fontSize:15,fontWeight:700,color:C.text}}>Nothing to show here</div>
              <div style={{fontSize:13,marginTop:4}}>Try changing your filters.</div>
            </div>
          )}
          {visible.map(candidate=>{
            const prog=progressOf(candidate.checks); const s1=s1Done(candidate.checks);
            const hasAlert=!!candidate.alert; const sc=OVERALL_CFG[candidate.overallStatus]||OVERALL_CFG["on-track"];
            const sColor=candidate.sector==="agedCare"?C.primary:C.teal;
            const checkSummary=candidate.checks.reduce((acc,c)=>{acc[c.status]=(acc[c.status]||0)+1;return acc;},{});
            const hasEscalated=candidate.checks.some(c=>c.status==="escalated");
            return(
              <div key={candidate.id} onClick={()=>setSelected(candidate)} style={{background:C.white,borderRadius:14,padding:"15px 18px",cursor:"pointer",border:`1.5px solid ${hasEscalated?C.redBorder:hasAlert?(candidate.alert?.type==="error"?C.redBorder:C.amberBorder):C.border}`,boxShadow:hasAlert||hasEscalated?"0 2px 12px rgba(220,38,38,0.07)":"0 1px 4px rgba(0,0,0,0.04)",transition:"all 0.13s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.primaryBorder} onMouseLeave={e=>e.currentTarget.style.borderColor=hasEscalated?C.redBorder:hasAlert?(candidate.alert?.type==="error"?C.redBorder:C.amberBorder):C.border}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:12}}>
                  <div style={{display:"flex",gap:10,alignItems:"center",flex:1,minWidth:0}}>
                    <Avatar name={candidate.name} color={sColor} size={34}/>
                    <div style={{minWidth:0}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.text}}>{candidate.name}</div>
                      <div style={{fontSize:12,color:C.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{candidate.role} · {facilityName(candidate.facilityId)}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                    <div style={{fontSize:11,color:C.textMuted,textAlign:"right"}}><div>{candidate.daysInPipeline}d</div><div>{candidate.recruiter}</div></div>
                    <Pill status={candidate.overallStatus} cfg={OVERALL_CFG} small/>
                  </div>
                </div>
                {hasAlert&&<div style={{marginTop:10,display:"flex",gap:8,alignItems:"center",background:candidate.alert.type==="error"?C.redBg:C.amberBg,border:`1px solid ${candidate.alert.type==="error"?C.redBorder:C.amberBorder}`,borderRadius:8,padding:"8px 12px"}}><span>{candidate.alert.type==="error"?"🚨":"⚠️"}</span><span style={{fontSize:12,fontWeight:600,color:candidate.alert.type==="error"?C.red:C.amber}}>{candidate.alert.message}</span></div>}
                {hasEscalated&&!hasAlert&&<div style={{marginTop:10,display:"flex",gap:8,alignItems:"center",background:C.redBg,border:`1px solid ${C.redBorder}`,borderRadius:8,padding:"8px 12px"}}><span>🚨</span><span style={{fontSize:12,fontWeight:600,color:C.red}}>Document escalated — review and decision required</span></div>}
                {candidate.checks.length>0&&(
                  <div style={{marginTop:12}}>
                    <ProgressBar pct={prog} s1={s1}/>
                    <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
                      {Object.entries(checkSummary).map(([status,count])=>{ const sc2=CHECK_STATUS_CFG[status]; return <span key={status} style={{fontSize:10,padding:"2px 7px",borderRadius:20,background:sc2.bg,color:sc2.color,border:`1px solid ${sc2.border}`,fontWeight:600}}>{count} {sc2.label}</span>; })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{marginTop:16,display:"flex",justifyContent:"space-between",fontSize:11,color:C.textMuted}}>
          <span>Showing {visible.length} candidate{visible.length!==1?"s":""}</span>
          <span style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:6,height:6,borderRadius:"50%",background:C.accent,display:"inline-block"}}/> Veriyo monitors every check in real time — errors surface instantly</span>
        </div>
      </div>

      {selected&&<CandidateDetail candidate={selected} onClose={()=>setSelected(null)} onAssignWorkflow={c=>{setSelected(null);setAssigning(c);}} isHiringManager={isHM} onUpdateCheck={updateCheck} onOpenDoc={checkId=>{setDocReview({candidateId:selected.id,checkId});}}/>}
      {assigning&&<WorkflowModal candidate={assigning} onClose={()=>setAssigning(null)} onAssign={assignChecks}/>}
      {docReview&&(()=>{ const cand=candidates.find(c=>c.id===docReview.candidateId); return cand?<DocReviewModal checkId={docReview.checkId} candidate={cand} onClose={()=>setDocReview(null)} onUpdateCheck={updateCheck}/>:null; })()}
    </div>
  );
}
