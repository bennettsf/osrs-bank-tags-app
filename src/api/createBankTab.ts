import type { CreateBankTagPayload } from '@/types';

export async function createBankTab(payload: CreateBankTagPayload): Promise<{ id: string }> {
  const res = await fetch('/api/bankTabs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error('Failed to create bank tab');
  }

  console.log('Create bank tab response status:', res.status);
  console.log('Create bank tab response body:', await res.text());

  return res.json(); // { id }
}
