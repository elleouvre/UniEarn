import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <h1 className="brand">UniEarn</h1>
      <p className="tagline">Part-time work that fits your class schedule.</p>

      <form className="card" onSubmit={onSubmit}>
        <h2>Log in</h2>
        {error && <div className="error" role="alert">{error}</div>}

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required
               value={form.email} onChange={onChange} />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required
               value={form.password} onChange={onChange} />

        <button type="submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>

        <p className="muted">
          New to UniEarn? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
