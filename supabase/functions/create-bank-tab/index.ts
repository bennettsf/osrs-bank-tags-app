// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { supabase } from '../_shared/supabaseClient.ts';
import { BankTabPayload } from './models.ts';
import { hashPasskey } from '../_shared/passKeyAuth.ts';
import { getCorsHeaders, corsResponse } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const bankTab: BankTabPayload = await req.json();
    const hashedPassKey = bankTab.edit_passkey ? await hashPasskey(bankTab.edit_passkey) : null;
    console.log('passkey', bankTab.edit_passkey, 'hashed:', hashedPassKey);
    const { data, error } = await supabase
      .from('bank_tabs')
      .insert([
        {
          name: bankTab.name,
          icon: bankTab.icon,
          import_string: bankTab.import_string,
          layout: bankTab.layout,
          tags: bankTab.tags,
          edit_passkey: hashedPassKey,
        },
      ])
      .select('id')
      .single();

    if (error) {
      console.error('Error inserting bank tab:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    return corsResponse(req, JSON.stringify({ id: data.id }), 200);
  } catch (err) {
    console.error('Error parsing request body:', err);
    return corsResponse(req, JSON.stringify({ error: 'Invalid request body' }), 400);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-bank-tab' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
