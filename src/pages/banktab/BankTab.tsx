import './BankTab.css';
import { useParams } from 'react-router-dom';
import { useGetBankTab } from '@/hooks/useGetBankTab';
import { generateItemIds } from '@/util/checkBankTagString';

function BankTab() {
  const { tabId } = useParams<{ tabId: string }>();
  const { data: tabData, error: error, isPending, isError } = useGetBankTab(tabId!);
  const itemIds = tabData ? generateItemIds(tabData.import_string.split(',')) : [];
  console.log('tabdata:', tabData);
  if (isPending) {
    return <p>Loading bank tab...</p>;
  }

  if (isError || !tabData) {
    console.log('Error fetching bank tab data or data is undefined.', error);

    return <p>Error loading bank tab.</p>;
  }

  return (
    <div className="bank-tab-container">
      <h1 className="bank-tab-title">{tabData.name}</h1>

      <div className="bank-tab-items">
        {itemIds.map((itemId) => (
          <div key={itemId} className="bank-tab-item">
            <img
              src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
              alt={`Item ${itemId}`}
              className="bank-tab-item-image"
              loading="lazy"
            />
            <p className="bank-tab-item-id">{itemId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BankTab;
