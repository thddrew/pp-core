import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { format, formatRelative } from "date-fns";
import { LoaderIcon } from "lucide-react";

export const LastSyncedDate = ({ instId }: { instId?: string | null } = {}) => {
  const { data: institution, isLoading } = useQuery({
    queryKey: ["institution", instId],
    queryFn: () => (instId ? getInstitutionByInstId(instId) : null),
  });

  if (isLoading)
    return (
      <div className="min-w-[298px] text-xs text-muted-foreground">
        <LoaderIcon className="inline-block animate-spin" size={12} />
      </div>
    );

  return institution?.last_sync ? (
    <Tooltip>
      <TooltipTrigger>
        <div className="whitespace-nowrap first-letter:capitalize">
          {institution.sync_job_key ? (
            <LoaderIcon className="inline-block animate-spin" size={12} />
          ) : (
            formatRelative(institution.last_sync, new Date())
          )}
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>{format(institution.last_sync, "PPPP pp")}</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  ) : null;
};
