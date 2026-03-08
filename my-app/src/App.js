import { useState } from "react";

const API = "http://localhost:8000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Epilogue:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f5f0e8;
    --card: #ffffff;
    --text: #1a1a1a;
    --muted: #888;
    --accent: #e8420a;
    --border: #e0d9ce;
    --input-bg: #f5f0e8;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Epilogue', sans-serif;
    min-height: 100vh;
  }

  .page {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
  }

  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 52px 44px;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 4px 40px rgba(0,0,0,0.06);
    animation: slideUp 0.4s ease;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .logo-dot { 
    width: 8px; height: 8px; 
    background: var(--accent); 
    border-radius: 50%; 
    display: inline-block; 
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 2.2rem;
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
  }

  .subtitle { color: var(--muted); font-size: 0.9rem; margin-bottom: 36px; }

  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .field { margin-bottom: 18px; }
  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 7px;
  }

  input {
    width: 100%;
    background: var(--input-bg);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    padding: 12px 14px;
    color: var(--text);
    font-family: 'Epilogue', sans-serif;
    font-size: 0.95rem;
    outline: none;
    transition: border-color 0.2s;
  }
  input:focus { border-color: var(--accent); }

  .btn {
    width: 100%;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    margin-top: 6px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .btn:hover { opacity: 0.88; }
  .btn:active { transform: scale(0.98); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1.5px solid var(--border);
    margin-top: 10px;
  }
  .btn-ghost:hover { background: var(--input-bg); opacity: 1; }

  .alert {
    padding: 12px 14px;
    border-radius: 10px;
    font-size: 0.85rem;
    margin-top: 16px;
    animation: slideUp 0.3s ease;
  }
  .alert-error   { background: #fff0ee; color: #c0392b; border: 1px solid #fad4ce; }
  .alert-success { background: #eefaf3; color: #1a7a45; border: 1px solid #c3ebd5; }

  .toggle {
    text-align: center;
    margin-top: 24px;
    color: var(--muted);
    font-size: 0.85rem;
  }
  .toggle button {
    background: none;
    border: none;
    color: var(--accent);
    font-family: 'Epilogue', sans-serif;
    font-weight: 500;
    cursor: pointer;
    font-size: 0.85rem;
    text-decoration: underline;
  }

  /* Dashboard */
  .dashboard {
    min-height: 100vh;
    padding: 40px;
    max-width: 800px;
    margin: 0 auto;
    animation: slideUp 0.4s ease;
  }

  .dash-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  }

  .profile-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 40px;
  }

  .avatar {
    width: 64px; height: 64px;
    background: var(--accent);
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.4rem;
    color: white;
    margin-bottom: 20px;
  }

  .profile-name {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.8rem;
    letter-spacing: -0.03em;
    margin-bottom: 4px;
  }

  .profile-email { color: var(--muted); margin-bottom: 28px; }

  .tag {
    display: inline-block;
    background: var(--input-bg);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 0.8rem;
    color: var(--muted);
  }
`;

export default function App() {
  const [view, setView]           = useState("login"); // login | register | dashboard
  const [loading, setLoading]     = useState(false);
  const [message, setMessage]     = useState(null);    // { text, type }
  const [token, setToken]         = useState(null);
  const [profile, setProfile]     = useState(null);

  // Form state
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");

  const showMsg = (text, type = "error") => setMessage({ text, type });
  const clearMsg = () => setMessage(null);

  async function handleLogin() {
    if (!email || !password) return showMsg("Please fill in all fields.");
    setLoading(true); clearMsg();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      setToken(data.access_token);
      setProfile(data.profile);
      setView("dashboard");
    } catch (e) {
      showMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!email || !password || !firstName || !lastName)
      return showMsg("Please fill in all fields.");
    setLoading(true); clearMsg();
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, first_name: firstName, last_name: lastName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail);
      showMsg("Registered! Please check your email to verify your account.", "success");
      setTimeout(() => setView("login"), 2500);
    } catch (e) {
      showMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: token }),
      });
    } finally {
      setToken(null); setProfile(null);
      setEmail(""); setPassword("");
      setView("login");
    }
  }

  const initials = profile
    ? `${profile.FirstName?.[0] ?? ""}${profile.LastName?.[0] ?? ""}`.toUpperCase()
    : "?";

  return (
    <>
      <style>{styles}</style>

      {/* ── DASHBOARD ── */}
      {view === "dashboard" && (
        <div className="dashboard">
          <div className="dash-header">
            <div className="logo"><span className="logo-dot" /> MyApp</div>
            <button className="btn btn-ghost" style={{width:"auto",padding:"10px 20px"}} onClick={handleLogout}>
              Sign out
            </button>
          </div>
          <div className="profile-card">
            <div className="avatar">{initials}</div>
            <div className="profile-name">
              {profile?.FirstName} {profile?.LastName}
            </div>
            <div className="profile-email">{profile?.Email?.[0]?.Value ?? email}</div>
            <span className="tag">✓ Authenticated</span>
          </div>
        </div>
      )}

      {/* ── LOGIN ── */}
      {view === "login" && (
        <div className="page">
          <div className="card">
            <div className="logo"><span className="logo-dot" /> MyApp</div>
            <h1>Sign in.</h1>
            <p className="subtitle">Welcome back — enter your details below.</p>

            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLogin()} />
            </div>

            <button className="btn" onClick={handleLogin} disabled={loading}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>

            {message && (
              <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}

            <div className="toggle">
              Don't have an account?{" "}
              <button onClick={() => { setView("register"); clearMsg(); }}>
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER ── */}
      {view === "register" && (
        <div className="page">
          <div className="card">
            <div className="logo"><span className="logo-dot" /> MyApp</div>
            <h1>Create account.</h1>
            <p className="subtitle">Get started — it only takes a moment.</p>

            <div className="row">
              <div className="field">
                <label>First name</label>
                <input placeholder="Jane" value={firstName}
                  onChange={e => setFirstName(e.target.value)} />
              </div>
              <div className="field">
                <label>Last name</label>
                <input placeholder="Doe" value={lastName}
                  onChange={e => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <button className="btn" onClick={handleRegister} disabled={loading}>
              {loading ? "Creating account…" : "Create Account →"}
            </button>

            {message && (
              <div className={`alert alert-${message.type}`}>{message.text}</div>
            )}

            <div className="toggle">
              Already have an account?{" "}
              <button onClick={() => { setView("login"); clearMsg(); }}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}