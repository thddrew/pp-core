import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { LoaderIcon } from "lucide-react";

export const LastSyncedDate = ({ instId }: { instId?: string | null } = {}) => {
  const { data: institution, isLoading } = useQuery({
    queryKey: ["institution", instId],
    queryFn: () => (instId ? getInstitutionByInstId(instId) : null),
  });

  if (isLoading)
    return (
      <div className="min-w-[298px]">
        <div className="text-xs text-muted-foreground">
          Last synced: <LoaderIcon className="inline-block animate-spin" size={12} />
        </div>
      </div>
    );

  return institution?.last_sync ? (
    <div className="text-xs text-muted-foreground">
      Last synced: {format(institution.last_sync, "PPPP pp")}
    </div>
  ) : null;
};
