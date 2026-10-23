import { useState } from "react";
import Website from "./Website";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import Settings from "./Settings";
import CandidatePortal from "./CandidatePortal";

export default function App() {
  const [page, setPage]       = useState("home");   // home | login | app | candidate-portal
  const [section, setSection] = useState("dashboard"); // dashboard | reports | settings
  const [user, setUser]       = useState(null);
  const [portalCandidate, setPortalCandidate] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
    setSection("dashboard");
    setPage("app");
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
    setSection("dashboard");
  }

  // Candidate portal — accessible without login (candidates don't have accounts)
  if (page === "candidate-portal") {
    return <CandidatePortal candidate={portalCandidate} onBack={() => setPage("app")} />;
  }

  if (page === "app") {
    const props = { user, onSection: setSection, onLogout: handleLogout, onOpenPortal: (candidate) => { setPortalCandidate(candidate); setPage("candidate-portal"); } };
    if (section === "reports")  return <Reports  {...props} />;
    if (section === "settings") return <Settings {...props} />;
    return <Dashboard {...props} />;
  }

  if (page === "login") {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  return <Website onLogin={() => setPage("login")} />;
}
