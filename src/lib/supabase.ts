import { createClient } from '@supabase/supabase-js';

// Hardcode the values for now to ensure it works
// These are public keys (anon key is safe to expose)
// Use the global constants defined in vite.config.ts for consistency
// @ts-ignore
const supabaseUrl = __SUPABASE_URL__;
// @ts-ignore
const supabaseAnonKey = __SUPABASE_ANON_KEY__;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Also export for components that need direct access
export { supabaseUrl, supabaseAnonKey };
