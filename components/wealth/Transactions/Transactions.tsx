import { TransactionsFilter } from "./TransactionsFilter";
import { TransactionsTable } from "./TransactionsTable";

type TransactionsProps = {
  plaidAccountId: number;
};

export const Transactions = ({ plaidAccountId }: TransactionsProps) => {
  return (
    <>
      <TransactionsFilter />
      <div className="h-8" />
      <TransactionsTable plaidAccountId={plaidAccountId} />
    </>
  );
};
