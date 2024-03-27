"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { format, formatRelative } from "date-fns";
import { LoaderIcon, InfoIcon } from "lucide-react";

export const LastSyncedDate = ({ instId, userId }: { instId?: string | null; userId: number }) => {
  const { data: institution, isLoading } = useQuery({
    queryKey: ["institution", instId, userId],
    queryFn: () => {
      if (!instId) return;

      return getInstitutionByInstId(instId, userId);
    },
  });

  if (isLoading)
    return (
      <div className="min-w-[298px] text-xs text-muted-foreground">
        <LoaderIcon className="inline-block animate-spin" size={12} />
      </div>
    );

  return (
    <div className="flex items-center gap-1">
      {institution?.last_sync ? (
        <Tooltip>
          <TooltipTrigger asChild>
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
      ) : null}
      {institution?.scheduled_sync_key && <InfoIcon className="size-4" />}
    </div>
  );
};
