// supabase/functions/_shared/supabaseClient.ts
import { createClient } from 'http://esm.sh/@supabase/supabase-js@2.34.0';

/**
 * Creates a Supabase client using pre-populated environment variables.
 * It automatically handles the URL and Keys injected by the Supabase runtime.
 */
export const supabase = createClient(
  Deno.env.get('_SUPABASE_URL') ?? '',
  Deno.env.get('_SUPABASE_SERVICE_ROLE_KEY') ?? ''
);
