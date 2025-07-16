import { Navigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import type { ReactElement } from 'react';

interface PrivateRouteProps {
  children: ReactElement;
  role?: 'user' | 'admin';
}

export function PrivateRoute({ children, role }: PrivateRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/user" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
