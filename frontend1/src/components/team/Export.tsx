import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DateRangePicker } from "../ui/date-range-picker";
import { useState } from "react";
import { DateRange } from "@/types/user";
import { exportStatuses } from "@/services/teamService";

interface ExportProps {
  teamId: string;
}

export function Export({ teamId }: ExportProps) {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const handleExport = async () => {
    if (!dateRange?.from || !dateRange.to) return;

    try {
      const { from, to } = dateRange;
      const startDate = from.toISOString();
      const endDate = to?.toISOString() || new Date().toISOString();

      const data = await exportStatuses(startDate, endDate, teamId);

      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "status-updates.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to export statuses:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Export</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Export Updates</DialogTitle>
          <DialogDescription>Export updates of your team.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DateRangePicker
            align="start"
            showCompare={false}
            onUpdate={(values) => {
              setDateRange(values.range);
            }}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleExport}>
            Export Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
