import { useState } from "react";
import Website from "./Website";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import Settings from "./Settings";

export default function App() {
  const [page, setPage]       = useState("home");   // home | login | app
  const [section, setSection] = useState("dashboard"); // dashboard | reports | settings
  const [user, setUser]       = useState(null);

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

  if (page === "app") {
    const props = { user, onSection: setSection, onLogout: handleLogout };
    if (section === "reports")  return <Reports  {...props} />;
    if (section === "settings") return <Settings {...props} />;
    return <Dashboard {...props} />;
  }

  if (page === "login") {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  return <Website onLogin={() => setPage("login")} />;
}
