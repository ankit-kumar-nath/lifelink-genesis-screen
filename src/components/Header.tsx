
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
      <div className="container mx-auto px-4">
        {/* Top Row - All Menu Items */}
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

          {/* All Navigation Items in Top Row */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Main Navigation */}
            <nav className="flex items-center space-x-6">
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

            {/* Separator */}
            <div className="w-px h-6 bg-border"></div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50">
            <nav className="py-4 space-y-3">
              <Link to="/" className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                Home
              </Link>
              <Link to="/donate" className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                Donate Blood
              </Link>
              <Link to="/request" className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                Request Blood
              </Link>
              <Link to="/inventory" className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                Inventory
              </Link>
              <Link to="/about" className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                About
              </Link>
              {user && userRole && getDashboardLink() && (
                <Link to={getDashboardLink()!} className="block text-foreground/80 hover:text-primary transition-colors py-2 px-1 font-medium">
                  {getDashboardLabel()}
                </Link>
              )}
              <div className="pt-4 border-t border-gray-200/50 space-y-3">
                {user ? (
                  <>
                    <span className="block text-sm text-muted-foreground px-1 font-medium">Welcome, {user.email}</span>
                    <Button onClick={handleSignOut} variant="outline" className="w-full">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild variant="ghost" className="w-full">
                      <Link to="/signin">Sign In</Link>
                    </Button>
                    <Button asChild variant="gradient" className="w-full">
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
