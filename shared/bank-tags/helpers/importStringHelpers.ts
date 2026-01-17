export function bankTagStringToArray(tag: string): string[] {
  return tag.split(',');
}

export function is32BitSignedInteger(num: number): boolean {
  if (!Number.isInteger(num)) {
    return false;
  }

  return (num | 0) === num;
}
