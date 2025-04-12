
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import { Shield } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  const { login, isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, or default to "/"
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    console.log("Login page - Auth state:", { isAuthenticated, isLoading, redirectTarget: from });
    if (isAuthenticated && !isLoading) {
      console.log("User is authenticated, redirecting to:", from);
      // Use navigate with replace for React Router based navigation
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  const validateForm = () => {
    const newErrors: {email?: string, password?: string} = {};
    let isValid = true;
    
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      console.log("Submitting login form");
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to HerVoice!",
      });
      console.log("Login successful, redirecting to:", from);
      
      // Navigate to home page using React Router
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error?.message || "Please check your credentials and try again.";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-her-purple/30 via-background to-her-pink/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold her-gradient-text mb-2">HerVoice</h1>
          <p className="text-muted-foreground">Digital Literacy & Skill Empowerment</p>
        </div>
        
        <div className="bg-card border border-border rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className={`w-full ${errors.email ? "border-destructive" : ""}`}
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={`w-full ${errors.password ? "border-destructive" : ""}`}
              />
              {errors.password && (
                <p className="text-destructive text-sm">{errors.password}</p>
              )}
            </div>
            
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-2 p-3 bg-secondary/50 rounded-lg">
          <Shield size={18} className="text-primary" />
          <div className="text-sm">
            <p className="font-medium">Women's Safety Helpline</p>
            <p className="text-primary font-bold">1800-1090</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
