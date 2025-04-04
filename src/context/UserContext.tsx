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
  enrollmentDates?: Record<string, Date>;
  certificates?: string[];
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
  getUserProgressForCourse: (courseId: string) => number;
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

// Load initial data from localStorage
const loadInitialData = () => {
  try {
    const savedUsers = localStorage.getItem("hervoice_users");
    if (savedUsers) {
      const parsedUsers = JSON.parse(savedUsers);
      Object.keys(parsedUsers).forEach(key => {
        // Ensure dates are properly parsed
        const user = parsedUsers[key];
        if (user.lastLogin) user.lastLogin = new Date(user.lastLogin);
        if (user.enrollmentDates) {
          const parsedDates: Record<string, Date> = {};
          Object.keys(user.enrollmentDates).forEach(courseId => {
            parsedDates[courseId] = new Date(user.enrollmentDates[courseId]);
          });
          user.enrollmentDates = parsedDates;
        }
        mockUserDatabase[key] = user;
      });
    }
    console.log("Loaded user database:", mockUserDatabase);
  } catch (error) {
    console.error("Error loading user data:", error);
  }
};

// Save database to localStorage
const saveDatabase = () => {
  try {
    localStorage.setItem("hervoice_users", JSON.stringify(mockUserDatabase));
    console.log("Saved database:", mockUserDatabase);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load initial data
  useEffect(() => {
    loadInitialData();
    
    // Check for stored user on initial load
    const storedUser = localStorage.getItem("hervoice_user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Convert date strings back to Date objects
        if (parsedUser.lastLogin) {
          parsedUser.lastLogin = new Date(parsedUser.lastLogin);
        }
        
        if (parsedUser.enrollmentDates) {
          const parsedDates: Record<string, Date> = {};
          Object.keys(parsedUser.enrollmentDates).forEach(courseId => {
            parsedDates[courseId] = new Date(parsedUser.enrollmentDates[courseId]);
          });
          parsedUser.enrollmentDates = parsedDates;
        }
        
        // Update last login time
        const updatedUser = { 
          ...parsedUser, 
          lastLogin: new Date() 
        };
        
        setUser(updatedUser);
        
        // Update mock database
        mockUserDatabase[updatedUser.id] = updatedUser;
        saveDatabase();
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
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
          isNewUser: true,
          enrollmentDates: {},
          certificates: []
        };
      }
      
      // Update mock database
      mockUserDatabase[currentUser.id] = currentUser;
      saveDatabase();
      
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
        isNewUser: true,
        enrollmentDates: {},
        certificates: []
      };
      
      // Update mock database
      mockUserDatabase[newUser.id] = newUser;
      saveDatabase();
      
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
    saveDatabase();
    
    localStorage.setItem("hervoice_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updateCourseProgress = (courseId: string, progress: number) => {
    if (!user) return;
    
    console.log(`Updating progress for course ${courseId} to ${progress}%`);
    
    // Track enrollment date if this is the first time
    const updatedEnrollmentDates = { ...(user.enrollmentDates || {}) };
    if (!updatedEnrollmentDates[courseId]) {
      updatedEnrollmentDates[courseId] = new Date();
    }
    
    const updatedProgress = { ...user.progress, [courseId]: progress };
    
    // Update completedCourses if not already there and if progress is 100%
    let updatedCompletedCourses = [...(user.completedCourses || [])];
    if (progress === 100 && !updatedCompletedCourses.includes(courseId)) {
      updatedCompletedCourses.push(courseId);
    }
    
    // Update certificates if course is completed
    const updatedCertificates = [...(user.certificates || [])];
    if (progress === 100 && !updatedCertificates.includes(courseId)) {
      updatedCertificates.push(courseId);
    }
    
    // Update user with new progress
    const updatedUser = { 
      ...user, 
      progress: updatedProgress,
      enrollmentDates: updatedEnrollmentDates,
      completedCourses: updatedCompletedCourses,
      certificates: updatedCertificates,
      isNewUser: false  // Remove isNewUser flag after course progress is made
    };
    
    // Update mock database
    mockUserDatabase[updatedUser.id] = updatedUser;
    saveDatabase();
    
    localStorage.setItem("hervoice_user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    console.log("Updated user data:", updatedUser);
  };

  const getUserProgressForCourse = (courseId: string): number => {
    if (!user || !user.progress) return 0;
    return user.progress[courseId] || 0;
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
        updateCourseProgress,
        getUserProgressForCourse
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
