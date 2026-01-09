import { z } from 'zod';

export const TagsEnum = z.enum([
  'PvM',
  'PvP',
  'Skilling',
  'Clue',
  'Minigame',
  'Quest',
  'Miscellaneous',
]);
export type Tags = z.infer<typeof TagsEnum>;

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
