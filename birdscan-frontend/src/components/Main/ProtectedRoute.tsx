import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;


}