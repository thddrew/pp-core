import { DateRangePicker } from "@/components/DateRangePicker";
import { defaultTodayRange } from "@/lib/defaultDateRanges";

export default async function Offline() {
  return (
    <section className="p-4">
      <DateRangePicker selected={defaultTodayRange} />
    </section>
  );
}
