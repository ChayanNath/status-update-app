import FullCalendar from "@fullcalendar/react";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  downloadHolidayTemplate,
  getHolidays,
  uploadHolidays,
} from "@/services/holidayService";

interface Holiday {
  _id: string;
  date: string;
  event: string;
}

type CalendarEvent = {
  title: string;
  start: string;
  allDay: boolean;
};

const mapHolidaysToEvents = (holidays: Holiday[]): CalendarEvent[] => {
  return holidays.map((holiday) => ({
    title: holiday.event,
    start: holiday.date,
    allDay: true,
  }));
};

const HolidayManagement = () => {
  const [holidays, setHolidays] = useState<CalendarEvent[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const holidaysData: Holiday[] = await getHolidays();
        const events = mapHolidaysToEvents(holidaysData);
        setHolidays(events);
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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        await uploadHolidays(file);
        const holidaysData: Holiday[] = await getHolidays();
        const events = mapHolidaysToEvents(holidaysData);
        setHolidays(events);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex gap-4">
        <Button onClick={handleDownloadTemplate}>
          Download Holiday Template
        </Button>
        <Button onClick={handleUploadClick}>Upload Holidays</Button>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
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
