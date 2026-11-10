import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const empty = {
  name: "", email: "", password: "", confirm: "",
  school: "", course: "", companyName: "", address: "",
};

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("STUDENT");
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 8) return setError("Password must be at least 8 characters");
    if (form.password !== form.confirm) return setError("Passwords do not match");

    const payload = { name: form.name, email: form.email, password: form.password, role };
    if (role === "STUDENT") {
      payload.school = form.school;
      payload.course = form.course;
    } else {
      payload.companyName = form.companyName;
      payload.address = form.address;
    }

    setBusy(true);
    try {
      await register(payload);
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
      <p className="tagline">Create your account</p>

      <form className="card" onSubmit={onSubmit}>
        <div className="role-toggle" role="group" aria-label="Account type">
          <button type="button" className={role === "STUDENT" ? "active" : ""}
                  onClick={() => setRole("STUDENT")}>I'm a student</button>
          <button type="button" className={role === "EMPLOYER" ? "active" : ""}
                  onClick={() => setRole("EMPLOYER")}>I'm an employer</button>
        </div>

        {error && <div className="error" role="alert">{error}</div>}

        <label htmlFor="name">Full name</label>
        <input id="name" name="name" required value={form.name} onChange={onChange} />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required value={form.email} onChange={onChange} />

        {role === "STUDENT" ? (
          <>
            <label htmlFor="school">School</label>
            <input id="school" name="school" required placeholder="Cebu Institute of Technology – University"
                   value={form.school} onChange={onChange} />
            <label htmlFor="course">Course</label>
            <input id="course" name="course" required placeholder="BS Information Technology"
                   value={form.course} onChange={onChange} />
          </>
        ) : (
          <>
            <label htmlFor="companyName">Company or business name</label>
            <input id="companyName" name="companyName" required value={form.companyName} onChange={onChange} />
            <label htmlFor="address">Address (optional)</label>
            <input id="address" name="address" value={form.address} onChange={onChange} />
          </>
        )}

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" required
               minLength={8} value={form.password} onChange={onChange} />

        <label htmlFor="confirm">Confirm password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" required
               value={form.confirm} onChange={onChange} />

        <button type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>

        <p className="muted">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
}
