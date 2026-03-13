import { Navigate } from "react-router";
import { useAuth, UserRole } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const { userRole } = useAuth();

  // If not logged in, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but wrong role, redirect to unauthorized
  if (userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If correct role, show the protected content
  return <>{children}</>;
}
