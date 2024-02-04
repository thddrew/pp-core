import { getTransactions } from "@/lib/plaid/transactions";
import { getCurrentUser, getUserByClerkId } from "@/prisma/queries/users";

export const Transactions = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return <div>User not found</div>;
    }

    if (!user.plaidAccountId) {
      return <div>No account linked</div>;
    }

    const { transactions } = await getTransactions(user.plaidAccountId);

    return (
      <div>
        <h2 className="text-xl font-bold">Transactions</h2>
        <div className="h-8" />
        <section className="flex flex-col gap-3">
          {transactions.map((transaction) => (
            <div key={transaction.transaction_id}>{JSON.stringify(transaction)}</div>
          ))}
        </section>
      </div>
    );
  } catch (err) {
    return <div>Error: {err.message}</div>;
  }
};
