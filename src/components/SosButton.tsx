
import { useState } from "react";
import { Bell, Phone, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

const SosButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmergency = () => {
    // In a real app, this would trigger an emergency call or SMS
    toast({
      title: "Emergency Contact",
      description: "Connecting to emergency helpline: 9842887813",
      variant: "destructive",
    });
  };

  return (
    <div className={cn(
      "fixed transition-all duration-300 z-50 flex items-center gap-2",
      isExpanded ? "bottom-24 right-4" : "bottom-24 right-4"
    )}>
      {isExpanded && (
        <div className="bg-destructive text-destructive-foreground px-4 py-2 rounded-full shadow-lg animate-fade-in flex items-center gap-2">
          <Phone size={20} />
          <button 
            onClick={handleEmergency}
            className="font-bold"
          >
            SOS HELP
          </button>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "rounded-full p-3 shadow-lg flex items-center justify-center",
          isExpanded ? "bg-background text-destructive" : "bg-destructive text-destructive-foreground",
          "transition-all duration-300 hover:scale-105"
        )}
      >
        {isExpanded ? <X size={24} /> : <Bell size={24} />}
      </button>
    </div>
  );
};

export default SosButton;
