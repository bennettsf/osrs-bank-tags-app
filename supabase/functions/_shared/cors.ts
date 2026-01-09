// supabase/functions/_shared/cors.ts

export function getCorsHeaders(req: Request) {
  const requestedHeaders = req.headers.get('Access-Control-Request-Headers');

  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      requestedHeaders ?? 'Content-Type, Authorization, X-Client-Info, apikey',
  };
}

export function corsResponse(req: Request, body: BodyInit | null = null, status = 200) {
  return new Response(body, {
    status,
    headers: {
      ...getCorsHeaders(req),
      'Content-Type': 'application/json',
    },
  });
}
