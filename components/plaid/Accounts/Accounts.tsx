import { getLinkedAccountsForUser } from "@/lib/plaid/accounts";

export const Accounts = async () => {
  const { accounts } = await getLinkedAccountsForUser();

  console.log(accounts);

  return (
    <div>
      <h1>Accounts</h1>
      {accounts.map((account) => (
        <div key={account.account_id}>
          <h2>{account.name}</h2>
          <p>{account.official_name}</p>
          <p>{account.type}</p>
        </div>
      ))}
    </div>
  );
};
