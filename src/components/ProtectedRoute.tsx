
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();
  const [showLoading, setShowLoading] = useState(true);
  
  // Add a small delay before showing loading to prevent flicker
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(isLoading);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isAuthenticated, 
      isLoading, 
      path: location.pathname,
      timestamp: new Date().toISOString()
    });
  }, [isAuthenticated, isLoading, location]);
  
  // Don't render anything until we've checked authentication
  if (isLoading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login from:", location.pathname);
    // Pass the current location in state to potentially redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Authenticated, rendering protected content:", location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;
