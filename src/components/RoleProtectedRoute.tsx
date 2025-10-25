
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: "donor" | "patient" | "healthcare" | "admin";
}

const RoleProtectedRoute = ({ children, allowedRole }: RoleProtectedRouteProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserAndRole = async () => {
      console.log("RoleProtectedRoute: Checking user and role for", allowedRole);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        console.log("RoleProtectedRoute: No session found, redirecting to signin");
        navigate("/signin");
        return;
      }

      console.log("RoleProtectedRoute: User found:", session.user.email);
      setUser(session.user);

      // Fetch user role using secure RPC, with fallback to users table
      let role: string | null = null;
      const { data: rpcRole, error: rpcError } = await supabase.rpc('get_user_role', { _user_id: session.user.id });
      console.log('RoleProtectedRoute: RPC get_user_role =>', rpcRole, 'Error:', rpcError);
      if (rpcRole) {
        role = rpcRole as string;
      } else {
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        console.log('RoleProtectedRoute: Fallback users.role =>', userData, 'Error:', error);
        role = userData?.role ?? null;
      }


      if (!role) {
        console.log("RoleProtectedRoute: No role found, redirecting to home");
        navigate("/");
        return;
      }

      setUserRole(role);

      // Check if user has access to this role
      if (role !== allowedRole) {
        console.log(`RoleProtectedRoute: User role ${role} doesn't match required ${allowedRole}, redirecting`);
        // Redirect to their correct dashboard
        navigate(`/dashboard/${role}`);
        return;
      }

      console.log("RoleProtectedRoute: Access granted for role:", role);
      setIsLoading(false);
    };

    checkUserAndRole();
  }, [navigate, allowedRole]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-red"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleProtectedRoute;
