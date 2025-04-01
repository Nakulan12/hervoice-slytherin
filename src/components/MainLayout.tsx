
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import SosButton from "./SosButton";
import VoiceNavigation from "./VoiceNavigation";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

const MainLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-secondary/80 backdrop-blur-sm shadow-md"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
      
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      
      <SosButton />
      <VoiceNavigation />
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
