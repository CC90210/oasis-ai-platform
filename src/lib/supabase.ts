import { createClient } from '@supabase/supabase-js';

// Hardcode the values for now to ensure it works
// These are public keys (anon key is safe to expose)
const supabaseUrl = 'https://skgrbweyscysyetubemg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNrZ3Jid2V5c2N5c2N5c3lldHViZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNTI0MTcsImV4cCI6MjA1MTcyODQxN30.VawWeg_UCTPutIosfOaVyF8IgVT4iSIiXArhX2XxZn0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Also export for components that need direct access
export { supabaseUrl, supabaseAnonKey };
