import { Liabilities } from "@/components/wealth/Liabilities/Liabilities";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function LiabilitiesPage() {
  return (
    <section className="w-full p-4">
      <Suspense fallback={<Loader2Icon className="animate-spin" />}>
        <Liabilities />
      </Suspense>
    </section>
  );
}
