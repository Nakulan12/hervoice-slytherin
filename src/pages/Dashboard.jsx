
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Mic, AlertTriangle, User, Trophy, Target, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BottomNavigation from '@/components/BottomNavigation';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const stats = [
    { title: "Courses Completed", value: "3", icon: BookOpen, color: "text-blue-500" },
    { title: "Hours Learned", value: "12", icon: Trophy, color: "text-yellow-500" },
    { title: "Skills Unlocked", value: "8", icon: Target, color: "text-green-500" },
    { title: "Days Active", value: "15", icon: Calendar, color: "text-purple-500" }
  ];

  const quickActions = [
    { 
      title: "Continue Learning", 
      description: "Pick up where you left off", 
      icon: BookOpen, 
      action: () => navigate('/courses'),
      gradient: "from-blue-400 to-blue-600"
    },
    { 
      title: "Voice Assistant", 
      description: "Get personalized guidance", 
      icon: Mic, 
      action: () => navigate('/voice'),
      gradient: "from-purple-400 to-purple-600"
    },
    { 
      title: "Emergency Help", 
      description: "Quick access to support", 
      icon: AlertTriangle, 
      action: () => navigate('/sos'),
      gradient: "from-red-400 to-red-600"
    },
    { 
      title: "My Profile", 
      description: "View your progress", 
      icon: User, 
      action: () => navigate('/profile'),
      gradient: "from-pink-400 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}! 💜</h1>
            <p className="text-pink-100 mt-1">Ready to continue your digital empowerment journey?</p>
          </div>
          <Heart className="w-12 h-12 text-pink-200 animate-pulse" />
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Course Progress */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              Current Course
            </CardTitle>
            <CardDescription>Digital Privacy & Security Basics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>3 of 8 lessons</span>
              </div>
              <Progress value={37.5} className="h-2" />
              <p className="text-sm text-gray-600 mt-2">
                Great progress! You're learning how to protect your digital identity.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                onClick={action.action}
                className={`h-24 bg-gradient-to-r ${action.gradient} hover:scale-105 transform transition-all duration-200 shadow-lg border-0`}
              >
                <div className="text-center">
                  <action.icon className="w-6 h-6 mx-auto mb-1" />
                  <div className="font-medium text-sm">{action.title}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Daily Motivation */}
        <Card className="bg-gradient-to-r from-pink-400 to-purple-500 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 animate-pulse" />
              <div>
                <h3 className="font-bold text-lg">Daily Inspiration</h3>
                <p className="text-pink-100">
                  "You are capable of amazing things. Every step forward is a victory worth celebrating!"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
