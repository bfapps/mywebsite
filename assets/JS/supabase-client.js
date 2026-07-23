import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// 🛑 قبل (اشتباه):
// const SUPABASE_URL = 'https://itemjysxspeuadgzfbrg.supabase.co/rest/v1/';

// ✅ بعد (درست):
const SUPABASE_URL = 'https://itemjysxspeuadgzfbrg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0ZW1qeXN4c3BldWFkZ3pmYnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3OTUxNjYsImV4cCI6MjEwMDM3MTE2Nn0.E4bxaGsUEVegmdQxEMv2KoXC_7FEagd96L1qHYHRKWs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);