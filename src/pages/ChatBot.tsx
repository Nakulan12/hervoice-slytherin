
import { useState, useRef, useEffect } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, MicOff, Send } from "lucide-react";
import VoiceNavigation from "@/components/VoiceNavigation";
import { useUser } from "@/context/UserContext";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    content: "Hello! I'm your HerVoice AI assistant. I can help you with your learning journey, answer questions about courses, or provide guidance on digital skills and job opportunities. How can I assist you today?",
    sender: "bot",
    timestamp: new Date()
  }
];

const ChatBot = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      // Generate AI response based on user input
      let responseContent = "";
      
      if (inputMessage.toLowerCase().includes("course") || inputMessage.toLowerCase().includes("learn")) {
        responseContent = "We have several courses in digital literacy, job skills, financial independence, and entrepreneurship. Would you like me to recommend one based on your interests?";
      } 
      else if (inputMessage.toLowerCase().includes("job") || inputMessage.toLowerCase().includes("work")) {
        responseContent = "Our job skills courses can help you prepare for remote work opportunities. We also have a job board with opportunities for women once you complete certain courses.";
      }
      else if (inputMessage.toLowerCase().includes("money") || inputMessage.toLowerCase().includes("finance")) {
        responseContent = "Our financial independence courses cover digital banking, online payments, and microfinance opportunities. Would you like to start with basic financial literacy?";
      }
      else {
        responseContent = "I'm here to help with your learning journey. You can ask me about courses, job skills, financial literacy, or how to use this app. What would you like to know more about?";
      }
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: responseContent,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording and conversion
      setTimeout(() => {
        setInputMessage("Tell me about digital literacy courses");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="container px-4 pt-6 pb-16 flex flex-col h-[calc(100vh-80px)]">
      <VoiceNavigation />
      
      <div className="mb-4">
        <h1 className="text-2xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">Your 24/7 learning companion</p>
      </div>
      
      <Card className="flex-grow overflow-hidden flex flex-col">
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto p-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className={`flex gap-3 max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}>
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.sender === "user" ? (
                    <Avatar>
                      <div className="w-full h-full bg-primary text-primary-foreground flex items-center justify-center">
                        {user?.name?.[0] || "U"}
                      </div>
                    </Avatar>
                  ) : (
                    <Avatar>
                      <div className="w-full h-full bg-secondary text-secondary-foreground flex items-center justify-center">
                        AI
                      </div>
                    </Avatar>
                  )}
                </div>
                
                {/* Message bubble */}
                <div 
                  className={`py-2 px-4 rounded-2xl ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <div className={`text-xs mt-1 ${
                    message.sender === "user" ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm">AI is typing</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className={isRecording ? "text-primary animate-pulse" : "text-muted-foreground"}
              onClick={toggleRecording}
            >
              {isRecording ? <Mic /> : <MicOff />}
            </Button>
            
            <Input 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            
            <Button 
              type="submit" 
              size="icon" 
              disabled={inputMessage.trim() === "" || isLoading}
            >
              <Send size={18} />
            </Button>
          </form>
          
          {isRecording && (
            <div className="text-center mt-2 text-xs text-muted-foreground">
              Listening... Speak clearly
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChatBot;
