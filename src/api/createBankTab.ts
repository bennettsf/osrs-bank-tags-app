import type { CreateBankTagPayload } from '@/types';

export async function createBankTab(payload: CreateBankTagPayload): Promise<{ id: number }> {
  const res = await fetch('/api/bank-tabs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create bank tab');
  }

  const json = await res.json();
  console.log('Create bank tab response status:', res.status, 'body:', json);

  return json; // { id: number }
}
