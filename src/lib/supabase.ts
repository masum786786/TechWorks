import { createClient } from '@supabase/supabase-js';

// Official Supabase standard client initialization
// Reads VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from environment variables (Vite / Vercel)
// with direct fallback support
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://pajlgcdpxctqcoywsfcd.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhamxnY2RweGN0cWNveXdzZmNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MjA2NjksImV4cCI6MjEwNTk5NjY2OX0.4Z7O47vhuJLsslOrg0xc1UFRVMbtRCZVg2ucqGLAITs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
