export function indexToRowColumn(itemIndex: number, importString: string) {
  const tokens = importString.split('layout,').at(-1)!.split(','); // [positionIndex, itemId, positionIndex, itemId, ...]
  const positionIndex = parseInt(tokens[itemIndex * 2]);

  return { row: Math.floor(positionIndex / 8) + 1, column: (positionIndex % 8) + 1 };
}
