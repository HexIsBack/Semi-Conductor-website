import { createClient } from "@supabase/supabase-js";

// This app runs entirely on mock data (src/lib/data.ts) out of the box —
// no Supabase project required to demo it.
//
// To connect a real free Supabase project later:
// 1. Create a project at https://supabase.com (free tier)
// 2. Copy .env.example to .env.local and fill in the two values from
//    Project Settings > API
// 3. Replace the mock data calls in your pages/components with calls to
//    `supabase.from('parts').select('*')` etc, after creating matching tables.
//
// This file will not throw even if the env vars are missing — `supabase`
// will just be null, so you can guard usage with `if (supabase) { ... }`.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
