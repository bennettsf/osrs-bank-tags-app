export function generateItemIds(importStringArray: string[]): string[] {
  let itemIds: string[] = [];
  let startIdx = 4; // start after icon id
  const endIdx = importStringArray.length - 1;
  const layoutIdx = importStringArray.indexOf('layout', startIdx);
  if (layoutIdx !== -1) {
    startIdx = layoutIdx + 2;
    for (let i = startIdx; i < importStringArray.length; i += 2) {
      itemIds.push(importStringArray[i]);
    }
  } else {
    itemIds = importStringArray.slice(startIdx, endIdx);
  }

  return itemIds;
}
