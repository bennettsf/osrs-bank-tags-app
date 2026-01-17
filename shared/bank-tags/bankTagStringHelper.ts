import { generateItemIds } from './helpers/generateItemIds';
import { bankTagStringToArray, is32BitSignedInteger } from './helpers/importStringHelpers';
import type { BankTagParseResult } from './types';

export function parseBankTagString(tag: string): BankTagParseResult {
  // default layout to false, we'll check for it later
  let layout = false;
  // convert the tag string into an array
  const tagStringArr = bankTagStringToArray(tag);
  // check if the first 2 items are correct and if the length is at least 4
  // the 4th item is required as the tab icon
  if (
    tagStringArr[0] !== 'banktags' ||
    !Number.isInteger(Number(tagStringArr[1])) ||
    tagStringArr.length < 4
  ) {
    return {
      ok: false,
      message:
        'Invalid header or length. Must start with "banktags,<version>", and have at least 4 items.',
    };
  }

  // iterate through the rest of the items and check if they are valid
  for (let i = 3; i < tagStringArr.length; i++) {
    const item = tagStringArr[i];
    if (item === 'layout') {
      layout = true;
      continue;
    }
    const num = Number(item);
    // check if the item is a valid number or if it is not a 32-bit signed integer
    if (!Number.isFinite(num) || !is32BitSignedInteger(num)) {
      return {
        ok: false,
        message: `Invalid item id or layout found: "${item}". Item ids must be 32-bit signed integers.`,
      };
    }
  }

  const itemIds = generateItemIds(tagStringArr);

  return {
    ok: true,
    message: 'Bank tag string is valid!',
    layout,
    icon: tagStringArr[3],
    name: tagStringArr[2],
    itemIds,
  };
}
