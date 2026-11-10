import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Wrap any page that needs a logged-in user. Optional `roles` limits it to e.g. ["EMPLOYER"]. */
export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <p className="center-note">Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}
