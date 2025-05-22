"use client"

import { useState } from "react"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsDateRange() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  const [preset, setPreset] = useState<string>("custom")

  const handlePresetChange = (value: string) => {
    setPreset(value)

    const today = new Date()
    let from: Date

    switch (value) {
      case "last7days":
        from = new Date()
        from.setDate(today.getDate() - 7)
        setDate({ from, to: today })
        break
      case "last30days":
        from = new Date()
        from.setDate(today.getDate() - 30)
        setDate({ from, to: today })
        break
      case "lastquarter":
        from = new Date()
        from.setMonth(today.getMonth() - 3)
        setDate({ from, to: today })
        break
      case "lastyear":
        from = new Date()
        from.setFullYear(today.getFullYear() - 1)
        setDate({ from, to: today })
        break
      case "ytd":
        from = new Date(today.getFullYear(), 0, 1)
        setDate({ from, to: today })
        break
      case "all":
        from = new Date(2020, 0, 1)
        setDate({ from, to: today })
        break
      default:
        // Keep current custom range
        break
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={preset} onValueChange={handlePresetChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Chọn khoảng thời gian" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last7days">7 ngày qua</SelectItem>
          <SelectItem value="last30days">30 ngày qua</SelectItem>
          <SelectItem value="lastquarter">Quý vừa qua</SelectItem>
          <SelectItem value="lastyear">Năm vừa qua</SelectItem>
          <SelectItem value="ytd">Từ đầu năm</SelectItem>
          <SelectItem value="all">Tất cả thời gian</SelectItem>
          <SelectItem value="custom">Tùy chỉnh</SelectItem>
        </SelectContent>
      </Select>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full sm:w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: vi })} - {format(date.to, "dd/MM/yyyy", { locale: vi })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: vi })
              )
            ) : (
              <span>Chọn khoảng thời gian</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              if (newDate?.from && newDate?.to) {
                setPreset("custom")
              }
            }}
            numberOfMonths={2}
            locale={vi}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
