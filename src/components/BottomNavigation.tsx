
import { Link, useLocation } from "react-router-dom";
import { Home, Book, User, MessageSquare, Gamepad } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/courses", icon: Book, label: "Courses" },
    { path: "/chatbot", icon: MessageSquare, label: "Chat" },
    { path: "/games", icon: Gamepad, label: "Games" },
    { path: "/profile", icon: User, label: "Profile" }
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around py-2 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomNavigation;
