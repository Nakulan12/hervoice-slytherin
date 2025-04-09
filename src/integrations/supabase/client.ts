
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../../types/supabase';

const SUPABASE_URL = "https://ysxtdxjwjfslktzhrgvw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzeHRkeGp3amZzbGt0emhyZ3Z3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDMxMTcsImV4cCI6MjA1OTc3OTExN30.Ds7BAkRLs-VzWyB_vgxG-3mxSpjPeJSun0YqOZlqpqM";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    storage: localStorage
  }
});
