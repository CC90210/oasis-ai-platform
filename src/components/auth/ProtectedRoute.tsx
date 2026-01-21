import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireSubscription?: boolean;
}

/**
 * ProtectedRoute Component
 * Wraps portal routes to ensure user is authenticated
 * Optionally checks for active subscription
 */
const ProtectedRoute = ({ children, requireSubscription = false }: ProtectedRouteProps) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasSubscription, setHasSubscription] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                setIsAuthenticated(true);

                // Check if user has completed onboarding
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('onboarding_completed')
                    .eq('id', session.user.id)
                    .single();

                setIsNewUser(profile?.onboarding_completed === false);

                // Check subscription if required
                if (requireSubscription) {
                    const { data: subData } = await supabase
                        .from('subscriptions')
                        .select('status')
                        .eq('user_id', session.user.id)
                        .in('status', ['active', 'trialing', 'past_due'])
                        .limit(1)
                        .single();

                    setHasSubscription(!!subData);
                }
            } else {
                setIsAuthenticated(false);
            }
        } catch (err) {
            console.error('Auth check error:', err);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-cyan-500 mx-auto mb-4" />
                    <p className="text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/portal/login" state={{ from: location }} replace />;
    }

    // Redirect to welcome page if new user and not already on welcome page
    if (isNewUser && !location.pathname.includes('/portal/welcome')) {
        return <Navigate to="/portal/welcome" replace />;
    }

    // Redirect to billing if subscription required but not found
    if (requireSubscription && !hasSubscription) {
        return <Navigate to="/portal/billing" replace />;
    }

    // Render children if authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
