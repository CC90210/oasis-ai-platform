import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/authStore';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/portal/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
