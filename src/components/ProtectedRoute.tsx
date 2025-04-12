
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  
  // Add a small delay before showing loading to prevent flicker
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(isLoading);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isLoading]);

  // Mark when initial auth check is complete
  useEffect(() => {
    if (!isLoading) {
      setInitialCheckDone(true);
    }
  }, [isLoading]);

  // This handles the actual navigation when authentication state changes
  useEffect(() => {
    if (initialCheckDone && !isLoading && !isAuthenticated) {
      console.log("Not authenticated, redirecting to login from:", location.pathname);
      // Use direct window location to break out of any React Router issues
      window.location.href = "/login";
    }
  }, [isAuthenticated, isLoading, initialCheckDone, location]);

  // Additional debugging logs
  useEffect(() => {
    console.log("ProtectedRoute - Auth state:", { 
      isAuthenticated, 
      isLoading,
      initialCheckDone,
      path: location.pathname,
      timestamp: new Date().toISOString()
    });
  }, [isAuthenticated, isLoading, initialCheckDone, location]);
  
  // Don't render anything until we've checked authentication
  if (isLoading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading authentication state...</div>
      </div>
    );
  }

  // If authentication check is done and user is not authenticated, don't render children
  if (!isAuthenticated && initialCheckDone) {
    console.log("Not authenticated, not rendering protected content");
    return null; // The effect above will handle the redirect
  }

  // User is authenticated, render the protected content
  console.log("Authenticated, rendering protected content:", location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;
