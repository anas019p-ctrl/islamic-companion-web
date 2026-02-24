import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ADMIN_EMAIL = 'anas019p@gmail.com';

export const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setIsAuthorized(false);
            } else {
                if (adminOnly) {
                    // Check if user is the specific admin email
                    if (session.user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
                        setIsAuthorized(true);
                    } else {
                        setIsAuthorized(false);
                    }
                } else {
                    setIsAuthorized(true);
                }
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [adminOnly]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
