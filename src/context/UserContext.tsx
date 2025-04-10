
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  preferredLanguage: string;
  profileImage?: string;
  isNewUser?: boolean;
  lastLogin?: Date;
}

interface UserContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, language: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserData>) => Promise<void>;
  updateCourseProgress: (courseId: string, progress: number) => Promise<void>;
  getUserProgressForCourse: (courseId: string) => Promise<number>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);

  // Check for session on initial load
  useEffect(() => {
    // First set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (event === "SIGNED_IN" && session?.user) {
          setSupabaseUser(session.user);
          // Use setTimeout to prevent auth deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else if (event === "SIGNED_OUT") {
          console.log("User signed out");
          setSupabaseUser(null);
          setUser(null);
        }
      }
    );

    // Then check for existing session
    const checkSession = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          console.log("Found existing session:", session.user.id);
          setSupabaseUser(session.user);
          await fetchUserProfile(session.user.id);
        } else {
          console.log("No existing session found");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoading(false);
      }
    };

    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile from database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        // Update user's last login
        await supabase
          .from("users")
          .update({ last_login: new Date().toISOString() })
          .eq("id", userId);
          
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          preferredLanguage: data.preferred_language || "English",
          profileImage: data.profile_image,
          isNewUser: data.is_new_user,
          lastLogin: data.last_login ? new Date(data.last_login) : new Date(),
        });
      } else {
        // If the user exists in auth but not in the users table
        // We'll still consider them authenticated but with minimal info
        if (supabaseUser) {
          console.log("User exists in auth but not in users table. Setting minimal user info.");
          setUser({
            id: userId,
            name: supabaseUser.email?.split("@")[0] || "User",
            email: supabaseUser.email || "",
            preferredLanguage: "English"
          });
        }
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Even if profile fetch fails, set basic user info from auth
      if (supabaseUser) {
        setUser({
          id: userId,
          name: supabaseUser.email?.split("@")[0] || "User",
          email: supabaseUser.email || "",
          preferredLanguage: "English"
        });
      }
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        throw error;
      }
      
      console.log("Login successful:", data.user?.id);
      // User will be set by the auth state change listener
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
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile in database
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          name,
          email,
          preferred_language: language,
          is_new_user: true,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        });

        if (profileError) throw profileError;
        
        // User will be set by the auth state change listener
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      // User will be cleared by the auth state change listener
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateUserProfile = async (updates: Partial<UserData>) => {
    if (!user || !supabaseUser) return;
    
    try {
      const updateData: any = {};
      
      if (updates.name) updateData.name = updates.name;
      if (updates.preferredLanguage) updateData.preferred_language = updates.preferredLanguage;
      if (updates.profileImage) updateData.profile_image = updates.profileImage;
      if (updates.isNewUser !== undefined) updateData.is_new_user = updates.isNewUser;
      
      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id);
        
      if (error) throw error;
      
      // Update local state
      setUser({ ...user, ...updates });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    }
  };

  const updateCourseProgress = async (courseId: string, progress: number) => {
    if (!user || !supabaseUser) return;
    
    try {
      console.log(`Updating progress for course ${courseId} to ${progress}%`);
      
      // Check if user is already enrolled in this course
      const { data: existingProgress, error: fetchError } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();
        
      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 means no rows returned, which is fine
        throw fetchError;
      }
      
      const completed = progress === 100;
      const now = new Date().toISOString();
      
      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from("user_progress")
          .update({ 
            progress, 
            completed,
            completed_at: completed ? now : existingProgress.completed_at
          })
          .eq("id", existingProgress.id);
          
        if (error) throw error;
      } else {
        // Create new progress entry
        const { error } = await supabase
          .from("user_progress")
          .insert({
            user_id: user.id,
            course_id: courseId,
            progress,
            completed,
            enrolled_at: now,
            completed_at: completed ? now : null
          });
          
        if (error) throw error;
      }
      
      // If this is the user's first course interaction, update isNewUser flag
      if (user.isNewUser) {
        await updateUserProfile({ isNewUser: false });
      }
      
    } catch (error) {
      console.error("Error updating course progress:", error);
      toast({
        title: "Error",
        description: "Failed to update course progress",
        variant: "destructive"
      });
    }
  };

  const getUserProgressForCourse = async (courseId: string): Promise<number> => {
    if (!user || !supabaseUser) return 0;
    
    try {
      const { data, error } = await supabase
        .from("user_progress")
        .select("progress")
        .eq("user_id", user.id)
        .eq("course_id", courseId)
        .single();
        
      if (error && error.code !== "PGRST116") {
        // PGRST116 means no rows returned
        throw error;
      }
      
      return data?.progress ?? 0;
    } catch (error) {
      console.error("Error fetching course progress:", error);
      return 0;
    }
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
