
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import SosButton from "./SosButton";
import VoiceNavigation from "./VoiceNavigation";

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
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
