
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Award, BookOpen, Clock, ArrowLeft, Edit, Save, X, Heart, Shield, Smartphone } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditForm(parsedUser);
    }
  }, [navigate]);

  const handleSave = () => {
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  const stats = [
    { icon: BookOpen, label: 'Courses Completed', value: '3', color: 'text-blue-500' },
    { icon: Award, label: 'Certificates Earned', value: '2', color: 'text-yellow-500' },
    { icon: Clock, label: 'Learning Hours', value: '24', color: 'text-green-500' },
  ];

  const achievements = [
    { name: 'Digital Pioneer', icon: '🌟', description: 'Completed your first course', earned: true },
    { name: 'Security Expert', icon: '🛡️', description: 'Mastered digital privacy', earned: true },
    { name: 'Social Connector', icon: '💬', description: 'Built social media confidence', earned: false },
    { name: 'Tech Savvy', icon: '📱', description: 'Smartphone mastery achieved', earned: true },
    { name: 'Digital Citizen', icon: '🌐', description: 'Online communication pro', earned: false },
    { name: 'Wellness Advocate', icon: '🧘', description: 'Digital wellness champion', earned: false },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-pink-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600">Manage your learning journey</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-xl hover:shadow-lg transition-shadow"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-3">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-100">
              <div className="text-center mb-8">
                <div className="w-28 h-28 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <User className="w-14 h-14 text-white" />
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="text-2xl font-bold text-gray-800 bg-pink-50 border border-pink-200 rounded-xl px-4 py-3 text-center w-full mb-3"
                    placeholder="Enter your name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{user.name}</h2>
                )}
                <div className="flex items-center justify-center text-gray-600 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="bg-pink-50 border border-pink-200 rounded-lg px-3 py-2 text-sm"
                    />
                  ) : (
                    <span className="text-sm">{user.email}</span>
                  )}
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Member since December 2024</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 mb-4">Learning Progress</h3>
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className="text-gray-700 font-medium">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-800 text-lg">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements & Goals */}
          <div className="lg:col-span-2 space-y-8">
            {/* Achievements */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-yellow-500" />
                Digital Achievements
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl text-center transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 transform hover:scale-105 shadow-md'
                        : 'bg-gray-50 border-2 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <div className={`font-semibold mb-2 ${achievement.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                      {achievement.name}
                    </div>
                    <div className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                      {achievement.description}
                    </div>
                    {achievement.earned && (
                      <div className="text-xs text-yellow-600 mt-2 font-medium">✓ Achieved</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="w-6 h-6 mr-3 text-pink-500" />
                Current Learning Goals
              </h3>
              <div className="space-y-6">
                <div className="p-6 border-2 border-pink-100 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800">Master Digital Security</span>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">3/5 courses</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-pink-400 to-purple-400 h-3 rounded-full shadow-sm" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div className="p-6 border-2 border-green-100 rounded-xl bg-gradient-to-r from-green-50 to-teal-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800">Build Social Media Confidence</span>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">2/3 modules</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-green-400 to-teal-400 h-3 rounded-full shadow-sm" style={{ width: '67%' }}></div>
                  </div>
                </div>
                
                <div className="p-6 border-2 border-blue-100 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800">Complete 25 Learning Hours</span>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">24/25 hours</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 shadow-inner">
                    <div className="bg-gradient-to-r from-blue-400 to-indigo-400 h-3 rounded-full shadow-sm" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
