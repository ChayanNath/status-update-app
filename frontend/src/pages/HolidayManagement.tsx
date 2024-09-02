import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  downloadHolidayTemplate,
  getHolidays,
} from "@/services/holidayService";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const holidaysData = await getHolidays();
        setHolidays(holidaysData);
        console.log(holidaysData);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
    };

    fetchData();
  }, []);

  const handleDownloadTemplate = async () => {
    try {
      const holidayTemplate = await downloadHolidayTemplate();
      const url = window.URL.createObjectURL(new Blob([holidayTemplate]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "download-status-template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button onClick={handleDownloadTemplate}>
          Download Holiday Template
        </Button>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input id="picture" type="file" />
        </div>
        <Button onClick={handleDownloadTemplate}>Upload Holidays</Button>
      </div>
      <section className="h-[calc(100vh-100px)] w-full">
        <FullCalendar
          plugins={[multiMonthPlugin]}
          initialView="multiMonthYear"
          weekends={false}
          height="100%"
          events={holidays}
        />
      </section>
    </div>
  );
};

export default HolidayManagement;
