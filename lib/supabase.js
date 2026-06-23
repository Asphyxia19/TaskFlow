import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://usjxevutfiacvhvbgnlc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzanhldnV0ZmlhY3ZodmJnbmxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMTMyNTAsImV4cCI6MjA5Nzc4OTI1MH0.VFJaesXZXaNpyTx1B01HleHONdYxU9jmbyfTVuYDN7Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
