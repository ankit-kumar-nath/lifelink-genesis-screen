
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    bloodType: "",
    role: "donor" as "donor" | "patient" | "healthcare",
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const [errors, setErrors] = useState<string[]>([]);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const roles = [
    { value: "donor", label: "Blood Donor", description: "I want to donate blood" },
    { value: "patient", label: "Patient", description: "I need blood transfusion" },
    { value: "healthcare", label: "Healthcare Provider", description: "I work at a medical facility" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.firstName.trim()) newErrors.push("First name is required");
    if (!formData.lastName.trim()) newErrors.push("Last name is required");
    if (!formData.email.trim()) newErrors.push("Email is required");
    if (!formData.phone.trim()) newErrors.push("Phone number is required");
    if (!formData.password) newErrors.push("Password is required");
    if (formData.password.length < 8) newErrors.push("Password must be at least 8 characters");
    if (formData.password !== formData.confirmPassword) newErrors.push("Passwords do not match");
    if (!formData.bloodType) newErrors.push("Blood type is required");
    if (!formData.role) newErrors.push("Role is required");
    if (!formData.agreeToTerms) newErrors.push("You must agree to the terms and conditions");

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // First, create the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (authError) {
        if (authError.message.includes('User already registered')) {
          toast.error("An account with this email already exists. Please sign in instead.");
        } else {
          throw authError;
        }
        return;
      }

      // Then, insert additional user data into the users table
      if (authData.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              first_name: formData.firstName,
              last_name: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              blood_type: formData.bloodType,
              role: formData.role,
              agree_to_marketing: formData.agreeToMarketing,
            }
          ]);

        if (insertError) {
          console.error("Insert error:", insertError);
          // If profile creation fails, we should still allow the user to proceed
          // as the auth user was created successfully
        }

        toast.success("Account created successfully! Please check your email for a confirmation link before signing in.");
        // Don't navigate immediately - user needs to confirm email first
        // Clear the form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          bloodType: "",
          role: "donor",
          agreeToTerms: false,
          agreeToMarketing: false
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="w-full max-w-lg relative z-10">
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
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              Create Account
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Join LifeLink to save lives through blood donation
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
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    disabled={isLoading}
                    className="h-11 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    disabled={isLoading}
                    className="h-11 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                  />
                </div>
              </div>

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
                  className="h-11 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  disabled={isLoading}
                  className="h-11 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">I am a</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-300 hover:border-primary/50 focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Blood Type */}
              <div className="space-y-2">
                <Label htmlFor="bloodType" className="text-sm font-medium">Blood Type</Label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-300 hover:border-primary/50 focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select your blood type</option>
                  {bloodTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
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
                    className="h-11 pr-12 transition-all duration-300 hover:border-primary/50 focus:border-primary"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                    className="h-11 pr-12 transition-all duration-300 hover:border-primary/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms and Marketing */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", !!checked)}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-6 cursor-pointer">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="agreeToMarketing"
                    checked={formData.agreeToMarketing}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeToMarketing", !!checked)}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm leading-6 cursor-pointer">
                    I would like to receive marketing communications about blood donation opportunities
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                variant="gradient"
                size="lg"
                className="w-full h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center pt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary hover:text-primary/80 font-semibold transition-colors duration-200">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center fade-in-up">
          <p className="text-sm text-white/70 drop-shadow">
            By creating an account, you're taking the first step to save lives through blood donation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
