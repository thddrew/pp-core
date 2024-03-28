"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getInstitutionByInstId } from "@/lib/prisma/queries/institutions";
import { getScheduledSyncDetails } from "@/lib/qstash/sync";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { useQuery } from "@tanstack/react-query";
import { formatRelative } from "date-fns";
import { LoaderIcon, InfoIcon } from "lucide-react";

export const ScheduledSyncDate = ({ instId, userId }: { instId?: string | null; userId: number }) => {
  const { data: institution, isLoading } = useQuery({
    queryKey: ["institution", userId, instId],
    queryFn: async () => {
      if (!instId) return null;

      return getInstitutionByInstId(instId, userId);
    },
  });

  const { data: scheduleDetails, isLoading: isLoadingScheduleDetails } = useQuery({
    queryKey: ["scheduleDetails", userId, instId],
    queryFn: async () => {
      if (!institution?.scheduled_sync_key) return null;

      return getScheduledSyncDetails(institution.scheduled_sync_key);
    },
    enabled: !!institution?.scheduled_sync_key,
  });

  if (isLoading)
    return (
      <div className="min-w-[298px] text-xs text-muted-foreground">
        <LoaderIcon className="inline-block animate-spin" size={12} />
      </div>
    );

  return (
    <div className="flex items-center gap-1">
      {scheduleDetails ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="size-4" />
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent className="first-letter:capitalize">
              {"nextScheduleTime" in scheduleDetails
                ? // @ts-expect-error - nextScheduleTime is a date in ms
                  formatRelative(scheduleDetails.nextScheduleTime, new Date())
                : null}
            </TooltipContent>
          </TooltipPortal>
        </Tooltip>
      ) : null}
    </div>
  );
};
