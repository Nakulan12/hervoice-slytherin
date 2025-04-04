
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-purple-800">
              HerFuture Empower
            </h1>
            <p className="text-xl text-gray-700">
              Your pathway to personal growth, education, and empowerment.
            </p>
            <div className="space-y-4">
              <p className="text-gray-600">
                Access custom learning paths, interactive courses, and supportive resources
                designed specifically for women's empowerment and skill development.
              </p>
              <div className="flex flex-wrap gap-4">
                {user ? (
                  <Button 
                    size="lg"
                    onClick={() => navigate("/courses")}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Explore Courses
                  </Button>
                ) : (
                  <>
                    <Button 
                      size="lg"
                      onClick={() => navigate("/login")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Log In
                    </Button>
                    <Button 
                      size="lg"
                      onClick={() => navigate("/register")}
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-100"
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/placeholder.svg" 
              alt="Women's empowerment illustration" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Learn at Your Pace</h3>
            <p className="text-gray-600">
              Flexible courses designed to fit into your busy schedule, with mobile-friendly content accessible anytime.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M3 9h18"></path>
                <path d="M3 15h18"></path>
                <path d="M9 9v12"></path>
                <path d="M15 9v12"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Practical Skills</h3>
            <p className="text-gray-600">
              Gain real-world skills and knowledge that can be immediately applied to your personal and professional life.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
            <p className="text-gray-600">
              Connect with peers, mentors, and experts who can provide guidance and support throughout your learning journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
