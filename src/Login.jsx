import { useState } from "react";
import { VeriyoLogo as VeriyoLogoSVG } from "./Nav";

const DEMO_USERS = [
  { email: "david@veriyo.com.au", passwordHash: "a53925f57d15c0fc867a9734cf328f0fd5524f4bce4d33682f9635c61361c24c", name: "David Truong", role: "Admin" },
  { email: "demo@harbourhealth.com.au", passwordHash: "fb95f43451caeb4dac3658290de8f7c6314ca7f2b1c38e82c43865f6380b055b", name: "Harbour Health Demo", role: "HR Manager" },
  { email: "demo@veriyo.com.au", passwordHash: "70a645d717475e9b0890f2ba3cf7a7f1de3011607e08a2a590f486c55efd5cbd", name: "Demo User", role: "Compliance Officer" },
];

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(async () => {
      const hash = await sha256(password.trim().toLowerCase());
      const user = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.passwordHash === hash
      );
      if (user) {
        onLogin(user);
      } else {
        setError("Incorrect email or password. Please try again.");
        setLoading(false);
      }
    }, 800);
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoRow}>
          <VeriyoLogoSVG height={40} darkText={true} />
        </div>

        <h2 style={styles.heading}>Welcome back</h2>
        <p style={styles.sub}>Sign in to your compliance dashboard</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email address</label>
            <input
              type="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organisation.com.au"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <button onClick={onBack} style={styles.back}>
          ← Back to website
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "32px",
    justifyContent: "center",
  },
  logoMark: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #1a7a4a, #166840)",
    color: "#fff",
    fontWeight: "800",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: "-0.5px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 8px",
    textAlign: "center",
  },
  sub: {
    fontSize: "15px",
    color: "#64748b",
    margin: "0 0 32px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    border: "1.5px solid #e2e8f0",
    borderRadius: "10px",
    fontSize: "15px",
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#dc2626",
  },
  btn: {
    background: "linear-gradient(135deg, #1a7a4a, #166840)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    fontFamily: "inherit",
    transition: "opacity 0.2s",
  },
  demoHint: {
    marginTop: "20px",
    padding: "10px 14px",
    background: "#f0f8f4",
    border: "1px solid #b8deca",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#1a7a4a",
    textAlign: "center",
  },
  demoLabel: {
    fontWeight: "600",
  },
  back: {
    display: "block",
    marginTop: "20px",
    background: "none",
    border: "none",
    color: "#64748b",
    fontSize: "14px",
    cursor: "pointer",
    textAlign: "center",
    width: "100%",
    fontFamily: "inherit",
  },
};
