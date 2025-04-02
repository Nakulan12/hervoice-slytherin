
import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
  completedCourses: string[];
  progress: Record<string, number>;
  profileImage?: string;
  isNewUser?: boolean;
  lastLogin?: Date;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, language: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Simulated database of users
const mockUserDatabase: Record<string, User> = {};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("hervoice_user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Update last login time
      const updatedUser = { 
        ...parsedUser, 
        lastLogin: new Date() 
      };
      setUser(updatedUser);
      localStorage.setItem("hervoice_user", JSON.stringify(updatedUser));
      
      // Sync with our mock database
      mockUserDatabase[updatedUser.id] = updatedUser;
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Check if user exists in our mock database by email
      const existingUserID = Object.keys(mockUserDatabase).find(
        id => mockUserDatabase[id].email === email
      );

      let currentUser: User;
      
      if (existingUserID) {
        // User exists, update last login
        currentUser = {
          ...mockUserDatabase[existingUserID],
          lastLogin: new Date()
        };
      } else {
        // Mock login for demo - in a real app, this would validate credentials against a backend
        currentUser = {
          id: `user${Date.now()}`,
          name: email.split('@')[0],
          email: email,
          preferredLanguage: "English",
          completedCourses: [],
          progress: {},
          lastLogin: new Date(),
          isNewUser: true
        };
      }
      
      // Update mock database
      mockUserDatabase[currentUser.id] = currentUser;
      localStorage.setItem("hervoice_user", JSON.stringify(currentUser));
      setUser(currentUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, language: string) => {
    setIsLoading(true);
    try {
      // Check if email already exists
      const emailExists = Object.values(mockUserDatabase).some(u => u.email === email);
      if (emailExists) {
        throw new Error("Email already in use");
      }

      // Create new user
      const newUser: User = {
        id: `user${Date.now()}`,
        name,
        email,
        preferredLanguage: language,
        completedCourses: [],
        progress: {},
        lastLogin: new Date(),
        isNewUser: true
      };
      
      // Update mock database
      mockUserDatabase[newUser.id] = newUser;
      localStorage.setItem("hervoice_user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("hervoice_user");
    setUser(null);
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    
    // Remove the isNewUser flag if it exists
    if (updatedUser.isNewUser) {
      updatedUser.isNewUser = false;
    }
    
    // Update mock database
    mockUserDatabase[updatedUser.id] = updatedUser;
    localStorage.setItem("hervoice_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    if (!user) return;
    
    const updatedProgress = { ...user.progress, [courseId]: progress };
    
    // Update user with new progress
    const updatedUser = { 
      ...user, 
      progress: updatedProgress,
      // Remove isNewUser flag after course progress is made
      isNewUser: false
    };
    
    // Update mock database
    mockUserDatabase[updatedUser.id] = updatedUser;
    localStorage.setItem("hervoice_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserProfile,
        updateCourseProgress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
