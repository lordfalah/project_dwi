"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

import React, { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { CardsContext } from "@/utils/context/FormCards";

const Calender = ({ createdAt }) => {
  const [date, setDate] = useState(null);
  const { setData } = useContext(CardsContext);

  useEffect(() => {
    setData((prev) => ({ ...prev, createdAt }));
  }, []);

  return (
    <div className="flex flex-col justify-between">
      <Label htmlFor="date" className="text-black mt-2">
        Tanggal Periksa *
      </Label>
      <Popover id="date">
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
              format(date, "PPP")
            ) : createdAt ? (
              format(createdAt, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setData((prev) => ({ ...prev, createdAt: date }));
            }}
            initialFocus
            showOutsideDays
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Calender;
