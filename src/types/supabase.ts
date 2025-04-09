
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          preferred_language: string | null
          profile_image: string | null
          last_login: string | null
          created_at: string
          is_new_user: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          preferred_language?: string | null
          profile_image?: string | null
          last_login?: string | null
          created_at?: string
          is_new_user?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          preferred_language?: string | null
          profile_image?: string | null
          last_login?: string | null
          created_at?: string
          is_new_user?: boolean
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string | null
          duration: string | null
          level: string | null
          image_url: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          category?: string | null
          duration?: string | null
          level?: string | null
          image_url?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          category?: string | null
          duration?: string | null
          level?: string | null
          image_url?: string | null
        }
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          progress: number
          completed: boolean
          enrolled_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          progress?: number
          completed?: boolean
          enrolled_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          progress?: number
          completed?: boolean
          enrolled_at?: string
          completed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
