
import React, { useState } from 'react';
import { Mic, Heart, Send } from 'lucide-react';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm here to help you. You can ask me about safety tips, find resources, or just chat. How can I support you today?" }
  ]);
  const [inputText, setInputText] = useState('');

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        addMessage('user', 'Find me the nearest help center');
        setTimeout(() => {
          addMessage('ai', "I'd be happy to help you find nearby resources. Based on your location, here are some support centers: Women's Crisis Center (0.5 miles), Community Safety Hub (1.2 miles), and Emergency Support Services (1.8 miles). Would you like directions to any of these?");
        }, 1000);
      }, 3000);
    }
  };

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text }]);
  };

  const handleSendText = () => {
    if (inputText.trim()) {
      addMessage('user', inputText);
      setInputText('');
      
      // Simulate AI responses
      setTimeout(() => {
        const responses = [
          "I understand how you're feeling. Remember, you're strong and capable. Is there something specific I can help you with right now?",
          "That's a great question! Here are some resources that might help...",
          "I'm here to support you. Let me provide some helpful information about that topic.",
          "Your safety is important. Here are some strategies you can use in that situation..."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('ai', randomResponse);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 text-center">
        <Heart className="w-8 h-8 mx-auto mb-2 animate-pulse" />
        <h1 className="text-2xl font-bold">Voice Assistant</h1>
        <p className="text-purple-100">I'm here to listen and help</p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white shadow-md text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Voice Button */}
      <div className="p-6 text-center">
        <button
          onClick={handleVoiceToggle}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-200 ${
            isListening
              ? 'bg-red-500 animate-pulse scale-110'
              : 'bg-gradient-to-r from-pink-400 to-purple-400 hover:scale-105'
          }`}
        >
          <div className="relative">
            <Heart className="w-10 h-10 text-white" />
            <Mic className="w-6 h-6 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
        </button>
        <p className="text-gray-600 mt-2">
          {isListening ? 'Listening...' : 'Tap to speak'}
        </p>
      </div>

      {/* Text Input */}
      <div className="p-4 bg-white shadow-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendText()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={handleSendText}
            className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;
