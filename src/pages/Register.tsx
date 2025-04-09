
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context/UserContext";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

const languages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "tamil", label: "Tamil" },
  { value: "telugu", label: "Telugu" },
  { value: "malayalam", label: "Malayalam" },
  { value: "kannada", label: "Kannada" },
];

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("english");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      await register(name, email, password, language);
      toast({
        title: "Registration successful",
        description: "Welcome to HerVoice! Your journey to digital empowerment starts now.",
      });
      navigate("/", { replace: true });
    } catch (error: any) {
      const errorMessage = error?.message || "Please check your information and try again.";
      console.error("Registration error:", error);
      setError(errorMessage);
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
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
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="How should we call you?"
                required
                className="w-full"
              />
            </div>
            
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
                className="w-full"
              />
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
                placeholder="Create a password"
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                What language do you want to study in?
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>For support, contact: 9842887813</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
