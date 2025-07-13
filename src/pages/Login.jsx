
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    // Store user data in localStorage
    const userData = {
      name: formData.name || 'User',
      email: formData.email
    };
    localStorage.setItem('user', JSON.stringify(userData));

    toast({
      title: isLogin ? "Welcome back!" : "Account created!",
      description: `You have successfully ${isLogin ? 'logged in' : 'registered'}.`
    });

    navigate('/dashboard');
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Floating Hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 w-6 h-6 text-pink-200 animate-pulse" />
        <Heart className="absolute top-40 right-16 w-4 h-4 text-purple-200 animate-pulse" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-40 left-20 w-5 h-5 text-rose-200 animate-pulse" style={{ animationDelay: '2s' }} />
        <Heart className="absolute bottom-20 right-32 w-6 h-6 text-pink-300 animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <div className="mb-4">
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-4 animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back' : 'Join HerVoice'}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your empowerment journey'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="h-12 border-2 border-pink-100 focus:border-pink-400 rounded-xl"
                />
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Heart className="w-5 h-5 mr-2" />
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-pink-600 hover:text-pink-700 font-medium transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
