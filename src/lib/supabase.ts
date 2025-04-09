
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if credentials are missing (for development)
const createMockClient = () => {
  console.warn('Using mock Supabase client - authentication and database features will not work.');
  
  // Return a mock client with noop functions
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
      signUp: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
          limit: () => ({
            order: () => ({
              lt: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
            }),
          }),
        }),
        limit: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
        order: () => ({
          eq: async () => ({ data: null, error: new Error('Mock client: Missing credentials') }),
        }),
      }),
      insert: async () => ({ error: new Error('Mock client: Missing credentials') }),
      update: async () => ({ error: new Error('Mock client: Missing credentials') }),
    }),
  } as any;
};

let supabase: ReturnType<typeof createClient<Database>>;

// Initialize Supabase client or fallback to mock
if (supabaseUrl && supabaseAnonKey) {
  // Use actual Supabase client with credentials
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  // Use mock client for local development without credentials
  const mockClient = createMockClient();
  supabase = mockClient as ReturnType<typeof createClient<Database>>;
}

export { supabase };
