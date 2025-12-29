import { z } from 'zod';

export type BankTagData = {
  tagId: string;
  tagName: string;
  tagString: string;
  tagTags: string[];
};

export type CreateBankTagPayload = {
  name: string;
  icon: string;
  import_string: string;
  layout: boolean;
  tags: string[];
  likes?: number;
};

export const BankTabResponseSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  name: z.string(),
  icon: z.string(),
  import_string: z.string(),
  layout: z.boolean(),
  tags: z.array(z.string()),
  likes: z.number(),
});

export type BankTabResponse = z.infer<typeof BankTabResponseSchema>;
