import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { hashPasskey } from '../lib/auth';
import { supabase } from '../lib/supabase';

export const bankTabs = new OpenAPIHono();

bankTabs.get('/', (c) => {
  return c.json({ ok: true, message: 'bank-tabs endpoint alive' });
});

const BankTabSchema = z
  .object({
    id: z.number().optional().openapi({ description: 'The ID of the bank tab', example: 1 }),
    created_at: z.string().optional().openapi({
      description: 'The creation date of the bank tab',
      example: '2023-01-01T00:00:00Z',
    }),
    name: z.string().openapi({ description: 'The name of the bank tab', example: 'My Bank Tab' }),
    icon: z.string().openapi({ description: 'The icon of the bank tab', example: '1337' }),
    import_string: z.string().openapi({
      description: 'The import string of the bank tab',
      example: 'banktags,1,aga,31054,layout,0,946,22,1517,41,851,42,851',
    }),
    layout: z.boolean().openapi({ description: 'The layout of the bank tab', example: true }),
    tags: z.array(z.string()).openapi({
      description: 'The tags associated with the bank tab',
      example: ['bossing', 'pvm', 'slayer'],
    }),
    likes: z
      .number()
      .optional()
      .openapi({ description: 'The number of likes for the bank tab', example: 42 }),
    edit_passkey: z
      .string()
      .optional()
      .openapi({ description: 'The passkey for the bank tab', example: 'mysecretpass' }),
  })
  .openapi('BankTabs');

const createBankTab = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: BankTabSchema.omit({ id: true, created_at: true, likes: true }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Bank tab created successfully',
      content: {
        'application/json': {
          schema: z.object({
            id: z.number(),
          }),
        },
      },
    },
    500: {
      description: 'Failed to create bank tab',
      content: {
        'application/json': {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
    },
  },
});

bankTabs.openapi(createBankTab, async (c) => {
  const payload = await c.req.json();

  const hash = payload.edit_passkey ? await hashPasskey(payload.edit_passkey) : null;

  const { data, error } = await supabase
    .from('bank_tabs')
    .insert({
      ...payload,
      edit_passkey: hash,
    })
    .select('id')
    .single();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  if (!data) {
    return c.json({ error: 'No data returned' }, 500);
  }

  return c.json({ id: data.id }, 201);
});

export default bankTabs;
