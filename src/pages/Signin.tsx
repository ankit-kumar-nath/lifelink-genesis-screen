
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("User already logged in, checking role...");
        // Get user role and redirect to appropriate dashboard
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('email', session.user.email)
          .single();
        
        console.log("User role data:", userData, "Error:", error);
        
        if (userData?.role) {
          console.log("Redirecting to dashboard:", userData.role);
          navigate(`/dashboard/${userData.role}`);
        } else {
          console.log("No role found, redirecting to home");
          navigate("/");
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      rememberMe: checked
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.email.trim()) newErrors.push("Email is required");
    if (!formData.email.includes("@")) newErrors.push("Please enter a valid email address");
    if (!formData.password) newErrors.push("Password is required");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      console.log("Attempting to sign in with:", formData.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        console.error("Sign in error:", error);
        if (error.message.includes('Email not confirmed')) {
          toast.error("Please check your email and click the confirmation link before signing in.");
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password. Please check your credentials.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        console.log("Sign in successful, user:", data.user.email);
        toast.success("Successfully signed in!");
        
        // Get user role and redirect to appropriate dashboard
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('email', data.user.email)
          .single();
        
        console.log("Fetched user role:", userData, "Error:", userError);
        
        if (userData?.role) {
          console.log("Redirecting to dashboard for role:", userData.role);
          navigate(`/dashboard/${userData.role}`);
        } else {
          console.log("No role found, redirecting to home");
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 fade-in-up">
          <Link to="/" className="flex items-center justify-center space-x-3 mb-6 group">
            <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-4 medical-pulse shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Heart className="h-8 w-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">LifeLink</h1>
              <p className="text-white/80 font-medium">Blood Bank System</p>
            </div>
          </Link>
        </div>

        <Card className="glass-effect border-white/20 shadow-2xl hover-lift">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-foreground flex items-center justify-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-2.5 shadow-lg">
                <LogIn className="h-6 w-6 text-white" />
              </div>
              Sign In
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Welcome back to LifeLink
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.length > 0 && (
              <Alert variant="destructive" className="border-destructive/20 bg-destructive/5">
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                  className="h-12 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                    className="h-12 pr-12 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="rememberMe" className="text-sm font-medium cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center pt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200">
                Create one here
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center fade-in-up">
          <p className="text-sm text-white/70 drop-shadow">
            Sign in to access your donor profile and help save lives.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
