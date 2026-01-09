import type { CreateBankTab } from '@/pages/import-tab/models';
import supabase from '@/supabase';

// invoke supabase function to create a bank tab
export async function createBankTab(payload: CreateBankTab): Promise<{ id: string }> {
  const response = await supabase.functions.invoke<{ id: string }>('create-bank-tab', {
    body: JSON.stringify(payload),
  });

  if (response.error) {
    console.error('Error creating bank tab:', response.error);
    throw new Error('Error creating bank tab');
  }

  return response.data as { id: string };
}
