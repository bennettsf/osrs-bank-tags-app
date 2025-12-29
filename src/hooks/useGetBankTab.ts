import { useQuery } from '@tanstack/react-query';
import { getBankTab } from '@/api/getBankTab';

export function useGetBankTab(tabId: string) {
  return useQuery({
    queryFn: () => getBankTab(tabId),
    queryKey: ['bankTab', tabId],
    enabled: !!tabId,
  });
}
