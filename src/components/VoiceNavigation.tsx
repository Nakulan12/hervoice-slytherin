
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleListening = () => {
    if (!isListening) {
      // In a real app, this would start speech recognition
      setIsListening(true);
      
      // Simulate voice recognition for demo purposes
      setTimeout(() => {
        processVoiceCommand();
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const processVoiceCommand = () => {
    // Simulated voice command processing
    const commands = ["home", "courses", "profile", "chat"];
    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
    
    toast({
      title: "Voice Command Detected",
      description: `Navigating to ${randomCommand}`,
    });
    
    setIsListening(false);
    
    switch (randomCommand) {
      case "home":
        navigate("/");
        break;
      case "courses":
        navigate("/courses");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "chat":
        navigate("/chatbot");
        break;
      default:
        break;
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`fixed right-4 top-4 p-3 rounded-full shadow-md z-10 transition-all duration-300 ${
        isListening 
          ? "bg-primary text-primary-foreground animate-pulse" 
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {isListening ? <Mic size={24} /> : <MicOff size={24} />}
    </button>
  );
};

export default VoiceNavigation;
