
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import SosButton from "./SosButton";
import VoiceNavigation from "./VoiceNavigation";
import { useTheme } from "@/context/ThemeContext";

const MainLayout: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      <div className="text-center text-xs text-muted-foreground py-2 fixed bottom-20 w-full">
        Powered by Slytherin
      </div>
      <SosButton />
      <VoiceNavigation />
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
