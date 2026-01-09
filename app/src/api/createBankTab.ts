import supabase from '@/supabase';
import type { CreateBankTagPayload } from '@/types';

export async function createBankTab(
  payload: CreateBankTagPayload
): Promise<{ id: number }> {
  const { data, error } = await supabase
    .from('bank_tabs')
    .insert([
      {
        ...payload,
        likes: 0,
      },
    ])
    .select('id')
    .single();
  if (error) {
    throw error;
  }
  return data;
}
