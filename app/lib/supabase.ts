import { createClient, type Session } from "@supabase/supabase-js";
import { type Database } from "./supabase.d";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SUPABASE_URL: string;
      SUPABASE_SERVICE_KEY: string;
      SUPABASE_ANON_KEY: string;
    }
  }
}

if (!process.env.SUPABASE_URL) throw new Error("SUPABASE_URL must be set.");
if (!process.env.SUPABASE_SERVICE_KEY) throw new Error("SUPABASE_SERVICE_KEY must be set.");
if (!process.env.SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY must be set.");

export const serviceClient = () => createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    global: {
      fetch,
      headers: { 
        "x-application-name": "litea",
        apikey: process.env.SUPABASE_SERVICE_KEY, }
    }
  }
);

export const anonClient = (token?: string | null) => createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    global: {
      fetch,
      headers: { 
        "x-application-name": "litea",
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${token ?? process.env.SUPABASE_ANON_KEY}`, }
    }
  }
);

export { Session };