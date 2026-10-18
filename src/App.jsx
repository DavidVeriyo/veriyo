import { useState } from "react";
import Website from "./Website";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [page, setPage] = useState("home"); // home | login | dashboard
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
    setPage("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setPage("home");
  }

  if (page === "dashboard") {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  if (page === "login") {
    return <Login onLogin={handleLogin} onBack={() => setPage("home")} />;
  }

  return <Website onLogin={() => setPage("login")} />;
}
