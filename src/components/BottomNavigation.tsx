
import { NavLink } from "react-router-dom";
import { Home, BookOpen, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Courses", path: "/courses" },
  { icon: MessageCircle, label: "AI Chat", path: "/chatbot" },
  { icon: User, label: "Profile", path: "/profile" }
];

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg py-2 px-4">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex flex-col items-center p-2 rounded-lg transition-colors",
              "tap-highlight",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon size={24} className={cn(
                  "mb-1",
                  isActive && "animate-pulse-light"
                )} />
                <span className="text-xs font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
