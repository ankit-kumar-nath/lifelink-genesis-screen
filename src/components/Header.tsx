
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
          .eq('email', session.user.email)
          .single();
        
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
            .eq('email', session.user.email)
            .single();
          
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
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 z-50 safe-area-top shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-3 medical-pulse shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                LifeLink
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block font-medium">Blood Bank System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105">
              Home
            </Link>
            <Link to="/donate" className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105">
              Donate Blood
            </Link>
            <Link to="/request" className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105">
              Request Blood
            </Link>
            <Link to="/inventory" className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105">
              Inventory
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105">
              About
            </Link>
            {user && userRole && getDashboardLink() && (
              <Link to={getDashboardLink()!} className="text-foreground/80 hover:text-primary transition-all duration-300 text-sm font-medium hover:scale-105 px-3 py-2 bg-accent rounded-lg">
                {getDashboardLabel()}
              </Link>
            )}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground font-medium">Welcome, {user.email}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="hover:shadow-lg transition-all duration-300">
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm" className="font-medium">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild variant="gradient" size="sm" className="font-semibold shadow-lg">
                  <Link to="/signup">Register</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link to="/" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Home
              </Link>
              <Link to="/donate" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Donate Blood
              </Link>
              <Link to="/request" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Request Blood
              </Link>
              <Link to="/inventory" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Inventory
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                About
              </Link>
              {user && userRole && getDashboardLink() && (
                <Link to={getDashboardLink()!} className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                  {getDashboardLabel()}
                </Link>
              )}
              <div className="flex flex-col space-y-2 mt-4 pt-3 border-t border-gray-100">
                {user ? (
                  <>
                    <span className="text-sm text-gray-600 px-1">Welcome, {user.email}</span>
                    <Button onClick={handleSignOut} variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white w-full">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white w-full">
                      <Link to="/signin">Sign In</Link>
                    </Button>
                    <Button asChild className="bg-medical-red hover:bg-medical-red-dark w-full">
                      <Link to="/signup">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
