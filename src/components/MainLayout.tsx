
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import SosButton from "./SosButton";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pb-20">
        <Outlet />
      </main>
      <SosButton />
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
