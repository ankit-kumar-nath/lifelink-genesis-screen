
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, LogIn } from "lucide-react";
import bloodDonationProcess from "@/assets/blood-donation-process.jpg";
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
    <div className="min-h-screen bg-gradient-medical flex">
      {/* Hero Image Section - 50% */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={bloodDonationProcess} 
            alt="Blood donor donating blood in medical center" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-medical-red/20 via-transparent to-black/60"></div>
        </div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">Join Our Heroes</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Sign in to continue your journey as a blood donor and help save lives in your community.
            </p>
            <div className="flex items-center space-x-2 text-white/80">
              <Heart className="h-5 w-5 fill-current" />
              <span className="text-sm">Every donation makes a difference</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sign In Form Section - 50% */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
        <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-medical-red rounded-full p-3 medical-pulse">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">LifeLink</h1>
              <p className="text-sm text-gray-600">Blood Bank System</p>
            </div>
          </Link>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
              <LogIn className="h-6 w-6 text-medical-red" />
              Sign In
            </CardTitle>
            <CardDescription>
              Welcome back to LifeLink
            </CardDescription>
          </CardHeader>

          <CardContent>
            {errors.length > 0 && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-sm text-medical-red hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-medical-red hover:bg-medical-red-dark"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-medical-red hover:underline font-medium">
                Create one here
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
          Sign in to access your donor profile and help save lives.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
