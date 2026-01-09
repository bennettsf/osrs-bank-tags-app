import { z } from 'zod';

export const BankTabPayloadSchema = z.object({
  name: z.string(),
  icon: z.string(),
  import_string: z.string(),
  layout: z.boolean(),
  tags: z.array(z.string()),
  edit_passkey: z.string().nullable(),
});

export type BankTabPayload = z.infer<typeof BankTabPayloadSchema>;
