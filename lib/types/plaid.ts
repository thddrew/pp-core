import { AccountBase } from "plaid";

export type AccountBaseWithInst = AccountBase & {
  institution_id?: string | null;
  institution_name?: string | null;
};
