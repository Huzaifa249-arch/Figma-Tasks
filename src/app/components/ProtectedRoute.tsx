import { Navigate } from 'react-router';
import { useAuth, UserRole } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to their assigned dashboard
    const dashboardMap = {
      operator: '/dashboard/operator',
      analyst: '/dashboard/analyst',
      admin: '/dashboard/admin',
    };
    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return <>{children}</>;
}
