import { z } from 'zod';

export const CreateBankTabSchema = z.object({
  name: z.string().nonempty({ message: 'Tag name cannot be empty.' }),
  icon: z.string().nonempty({ message: 'You must have an icon.' }),
  import_string: z.string().min(1, { message: 'Import string cannot be empty.' }),
  // true/false value for layout nothing else
  layout: z.boolean(),
  tags: z
    .array(z.string())
    .min(1, { message: 'You must select at least one tag.' })
    .max(20, { message: 'You can select up to twenty tags.' }),
  edit_passkey: z.string().nullable(),
});
export type CreateBankTab = z.infer<typeof CreateBankTabSchema>;
