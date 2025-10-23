
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      
      if (session?.user) {
        console.log("Header: Fetching role for user:", session.user.email);
        // Fetch user role
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .maybeSingle();
        
        console.log("Header: User role data:", userData, "Error:", error);
        setUserRole(userData?.role ?? null);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Header: Auth state changed:", event);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user role
          const { data: userData, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .maybeSingle();
          
          console.log("Header: Auth change - User role data:", userData, "Error:", error);
          setUserRole(userData?.role ?? null);
        } else {
          setUserRole(null);
        }
      }
    );

    getUser();

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    console.log("Header: Signing out user");
    await supabase.auth.signOut();
    setUserRole(null);
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!userRole) return null;
    return `/dashboard/${userRole}`;
  };

  const getDashboardLabel = () => {
    switch (userRole) {
      case 'donor':
        return 'Donor Dashboard';
      case 'patient':
        return 'Patient Dashboard';
      case 'healthcare':
        return 'Healthcare Dashboard';
      case 'admin':
        return 'Admin Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50 safe-area-top shadow-lg">
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-2 medical-pulse shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Heart className="h-5 w-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                LifeLink
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block font-medium">Blood Bank System</p>
            </div>
          </Link>

          {/* Navigation Menu - Always Visible */}
          <nav className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1">
              Home
            </Link>
            <Link to="/donate" className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1">
              Donate
            </Link>
            <Link to="/request" className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1">
              Request
            </Link>
            <Link to="/inventory" className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1">
              Inventory
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1">
              About
            </Link>
            {user && userRole && getDashboardLink() && (
              <Link to={getDashboardLink()!} className="text-foreground/80 hover:text-primary transition-all duration-300 text-xs sm:text-sm font-medium hover:scale-105 px-2 py-1 bg-accent rounded-lg">
                Dashboard
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium hidden md:block">
                  {user.email}
                </span>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="hover:shadow-lg transition-all duration-300 text-xs px-2 py-1">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium text-xs px-2 py-1">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild variant="gradient" size="sm" className="font-semibold shadow-lg text-xs px-2 py-1">
                  <Link to="/signup">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
