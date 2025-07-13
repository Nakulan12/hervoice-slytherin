
import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const CourseCard = ({ title, description, icon: Icon, color, duration }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden">
      <div className={`h-2 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full bg-gradient-to-r ${color} mr-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        
        <button className={`w-full bg-gradient-to-r ${color} text-white py-3 px-6 rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all duration-200`}>
          <span className="font-medium">Start Course</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
