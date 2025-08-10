import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

// Using direct project configuration (Lovable does not support VITE_* env vars)
const url = 'https://decaqqymeejyvnjtfkby.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY2FxcXltZWVqeXZuanRma2J5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMDE4OTQsImV4cCI6MjA2OTY3Nzg5NH0.teOx3uBdwpNgX3Ev87B5Ima_9_42ocELnAph6YvhzEs'

if (!url || !anonKey) {
  throw new Error('Missing Supabase project config.')
}

export const supabase = createClient<Database>(url, anonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    flowType: 'pkce',
  },
})