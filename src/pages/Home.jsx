
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Mic, AlertTriangle, Compass } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, redirect to dashboard
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8">
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Heart className="absolute top-20 left-10 w-6 h-6 text-pink-200 animate-pulse" />
        <Heart className="absolute top-40 right-16 w-4 h-4 text-purple-200 animate-pulse" style={{ animationDelay: '1s' }} />
        <Heart className="absolute bottom-40 left-20 w-5 h-5 text-rose-200 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main Content */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <Heart className="w-24 h-24 text-pink-400 mx-auto mb-4 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-pink-500">HerVoice</span>
        </h1>
        <p className="text-xl text-gray-600 mb-2">Powered by Love and AI</p>
        <p className="text-gray-500 max-w-md mx-auto">
          Your supportive companion for empowerment, learning, and safety
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <Heart className="w-6 h-6" />
          <span className="text-lg font-medium">🚀 Get Started</span>
        </button>

        <button
          onClick={() => navigate('/courses')}
          className="w-full bg-gradient-to-r from-purple-400 to-indigo-400 text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-lg font-medium">🎓 Browse Courses</span>
        </button>

        <button
          onClick={() => navigate('/voice')}
          className="w-full bg-gradient-to-r from-teal-400 to-cyan-400 text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <Mic className="w-6 h-6" />
          <span className="text-lg font-medium">🎤 AI Assistant</span>
        </button>

        <button
          onClick={() => navigate('/sos')}
          className="w-full bg-gradient-to-r from-red-400 to-pink-400 text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3"
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="text-lg font-medium">🆘 Emergency Help</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
