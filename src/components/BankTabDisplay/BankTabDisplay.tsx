import { Text } from '@chakra-ui/react';

export function BankTabDisplay({ itemIds }: { itemIds: string[] }) {
  return (
    <div className="grid-box" style={{ gridArea: 'box-bank-tab' }}>
      <Text className="details-text" style={{ width: '100%', borderBottom: '1px solid #fff' }}>
        Bank Tab Preview:
      </Text>
      <div className="items-box hide-scrollbar">
        {/* Item icons will render here starting top-left */}
        {itemIds.map((itemId) => (
          <img
            key={itemId}
            src={`https://static.runelite.net/cache/item/icon/${itemId}.png`}
            alt={`https://static.runelite.net/cache/item/icon/952.png`}
          />
        ))}
      </div>
    </div>
  );
}
