
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: "donor" | "patient" | "healthcare";
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

      // Fetch user role
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('email', session.user.email)
        .single();

      console.log("RoleProtectedRoute: User role data:", userData, "Error:", error);

      if (!userData?.role) {
        console.log("RoleProtectedRoute: No role found, redirecting to home");
        navigate("/");
        return;
      }

      setUserRole(userData.role);

      // Check if user has access to this role
      if (userData.role !== allowedRole) {
        console.log(`RoleProtectedRoute: User role ${userData.role} doesn't match required ${allowedRole}, redirecting`);
        // Redirect to their correct dashboard
        navigate(`/dashboard/${userData.role}`);
        return;
      }

      console.log("RoleProtectedRoute: Access granted for role:", userData.role);
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
