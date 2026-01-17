export type BankTagParseSuccess = {
  ok: true;
  message: string;
  name: string;
  icon: string;
  layout: boolean;
  itemIds: string[];
};

export type BankTagParseError = {
  ok: false;
  message: string;
};

export type BankTagParseResult = BankTagParseSuccess | BankTagParseError;
