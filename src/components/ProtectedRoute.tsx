
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { isAuthenticated, isLoading, path: location.pathname });
  }, [isAuthenticated, isLoading, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login from:", location.pathname);
    return <Navigate to="/login" replace />;
  }

  console.log("Authenticated, rendering protected content:", location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;
