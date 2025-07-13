
import React, { useState } from 'react';
import { Heart, Phone, MessageSquare, MapPin } from 'lucide-react';

const SOS = () => {
  const [isActivated, setIsActivated] = useState(false);

  const handleSOSPress = () => {
    setIsActivated(true);
    // Simulate vibration if available
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
    
    setTimeout(() => {
      setIsActivated(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Background Hearts */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className={`absolute w-4 h-4 text-red-100 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Emergency <span className="text-red-500">Support</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Your safety is our priority. Help is just a touch away.
        </p>
      </div>

      {/* Main SOS Button */}
      <div className="mb-12">
        <button
          onClick={handleSOSPress}
          className={`w-48 h-48 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 ${
            isActivated
              ? 'bg-red-600 animate-pulse scale-110'
              : 'bg-gradient-to-br from-red-500 to-pink-500 hover:scale-105 active:scale-95'
          }`}
        >
          <div className="text-center">
            <Heart className="w-16 h-16 text-white mx-auto mb-2" />
            <span className="text-white text-2xl font-bold">SOS</span>
          </div>
        </button>
      </div>

      {isActivated && (
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2 animate-pulse" />
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Help is on the way
            </p>
            <p className="text-gray-600">
              Emergency services have been notified
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="w-full max-w-sm space-y-3">
        <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3">
          <Phone className="w-5 h-5" />
          <span>Call Emergency Services</span>
        </button>

        <button className="w-full bg-green-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3">
          <MessageSquare className="w-5 h-5" />
          <span>Send Alert Message</span>
        </button>

        <button className="w-full bg-purple-500 text-white py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-3">
          <MapPin className="w-5 h-5" />
          <span>Share Location</span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Emergency: 911 | Crisis Hotline: 988
        </p>
      </div>
    </div>
  );
};

export default SOS;
