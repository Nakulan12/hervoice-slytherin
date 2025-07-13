
import React from 'react';
import { Shield, Smartphone, Globe, Users, Zap, Lock, Eye, Computer } from 'lucide-react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  const courses = [
    {
      title: "Digital Privacy & Security",
      description: "Master password management, secure browsing, and protect your personal information online",
      icon: Shield,
      color: "from-pink-400 to-red-400",
      duration: "25 min"
    },
    {
      title: "Social Media Confidence",
      description: "Build your professional online presence and navigate social platforms safely",
      icon: Users,
      color: "from-purple-400 to-indigo-400",
      duration: "30 min"
    },
    {
      title: "Smartphone Mastery", 
      description: "Unlock the full potential of your smartphone with essential apps and features",
      icon: Smartphone,
      color: "from-blue-400 to-cyan-400",
      duration: "20 min"
    },
    {
      title: "Online Banking & Finance",
      description: "Safely manage your finances online and understand digital payment systems",
      icon: Lock,
      color: "from-green-400 to-teal-400",
      duration: "35 min"
    },
    {
      title: "Digital Communication",
      description: "Professional email etiquette, video calls, and online collaboration tools",
      icon: Globe,
      color: "from-orange-400 to-pink-400",
      duration: "22 min"
    },
    {
      title: "Computer Fundamentals",
      description: "Essential computer skills from file management to software installation",
      icon: Computer,
      color: "from-violet-400 to-purple-400",
      duration: "40 min"
    },
    {
      title: "Digital Wellness",
      description: "Maintain healthy boundaries with technology and avoid digital overwhelm",
      icon: Eye,
      color: "from-rose-400 to-pink-400",
      duration: "18 min"
    },
    {
      title: "Tech Troubleshooting",
      description: "Solve common technical issues independently and build confidence with technology",
      icon: Zap,
      color: "from-yellow-400 to-orange-400",
      duration: "28 min"
    }
  ];

  return (
    <div className="min-h-screen px-6 py-8 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Digital <span className="text-pink-500">Empowerment</span> Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build confidence and skills in the digital world with our carefully crafted courses designed for women at every level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-pink-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Start Your Digital Journey?</h2>
            <p className="text-gray-600 mb-6">Join thousands of women who have transformed their relationship with technology</p>
            <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
