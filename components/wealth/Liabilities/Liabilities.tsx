import { getLiabilities } from "@/lib/plaid/liabilities";
import { PLAID_LIABILITIES_KEY } from "@/lib/plaid/utils";
import { getCurrentUser } from "@/lib/prisma/queries/users";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

import { LiabilitiesTable } from "./LiabilitiesTable";

const Liabilities = async () => {
  const user = await getCurrentUser();
  const client = new QueryClient();

  if (!user) {
    return <div className="text-gray-400">User not found</div>;
  }

  return null;

  // if (!user.plaidAccountId) {
  //   return <div className="text-gray-400">No account linked</div>;
  // }

  // await client.prefetchQuery({
  //   queryKey: [PLAID_LIABILITIES_KEY, user.plaidAccountId],
  //   queryFn: async () => getLiabilities(user.plaidAccountId as number),
  // });

  // return (
  //   <section className="flex flex-col gap-3">
  //     <HydrationBoundary state={dehydrate(client)}>
  //       <LiabilitiesTable plaidAccountId={user.plaidAccountId} />
  //     </HydrationBoundary>
  //   </section>
  // );
};

type LiabilitiesWrapperProps = {
  header?: string;
};

export const LiabilitiesWrapper = async ({ header = "Liabilities" }: LiabilitiesWrapperProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold">{header}</h2>
      <div className="h-8" />
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Liabilities />
      </Suspense>
    </div>
  );
};
