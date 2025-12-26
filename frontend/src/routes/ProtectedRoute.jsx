import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection
  if (role && !user.roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
