"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsHeatmap() {
  // Dữ liệu mẫu cho heatmap
  const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]
  const hours = Array.from({ length: 24 }, (_, i) => i)

  // Tạo dữ liệu ngẫu nhiên cho heatmap - memoize để tránh tạo lại mỗi lần render
  const heatmapData = useMemo(() => {
    const data: number[][] = []

    for (let i = 0; i < days.length; i++) {
      const dayData: number[] = []
      for (let j = 0; j < 24; j++) {
        // Tạo mẫu dữ liệu thực tế hơn
        // Giờ cao điểm: 9-11h sáng và 19-22h tối
        let value = Math.random() * 30

        if ((j >= 9 && j <= 11) || (j >= 19 && j <= 22)) {
          value += Math.random() * 70
        }

        // Cuối tuần có lưu lượng cao hơn
        if (i === 0 || i === 6) {
          value *= 1.2
        }

        dayData.push(Math.floor(value))
      }
      data.push(dayData)
    }

    return data
  }, [])

  // Tìm giá trị lớn nhất để tính toán màu sắc - memoize để tránh tính toán lại
  const maxValue = useMemo(() => Math.max(...heatmapData.flat()), [heatmapData])

  // Hàm tính màu dựa trên giá trị - memoize để tránh tạo lại hàm
  const getColor = useMemo(() => {
    return (value: number) => {
      const intensity = Math.min(255, Math.floor((value / maxValue) * 255))
      return `rgb(${255 - intensity}, ${255 - Math.floor(intensity * 0.8)}, ${255})`
    }
  }, [maxValue])

  // Tạo mảng màu cho thang màu - memoize để tránh tạo lại
  const colorScale = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => getColor((maxValue * i) / 4))
  }, [getColor, maxValue])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Heatmap lượt click theo thời gian</CardTitle>
        <CardDescription>Phân tích lượt click theo ngày trong tuần và giờ trong ngày</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="flex mb-1">
              <div className="w-12"></div>
              {hours.map((hour) => (
                <div key={hour} className="flex-1 text-center text-xs">
                  {hour}h
                </div>
              ))}
            </div>

            {days.map((day, dayIndex) => (
              <div key={day} className="flex mb-1">
                <div className="w-12 text-xs font-medium flex items-center">{day}</div>
                {hours.map((hour) => {
                  const value = heatmapData[dayIndex][hour]
                  return (
                    <div
                      key={hour}
                      className="flex-1 h-8 flex items-center justify-center text-xs font-medium rounded-sm mx-[1px]"
                      style={{
                        backgroundColor: getColor(value),
                        color: value > maxValue * 0.7 ? "white" : "black",
                      }}
                      title={`${day} ${hour}h: ${value} lượt click`}
                    >
                      {value > maxValue * 0.5 ? value : ""}
                    </div>
                  )
                })}
              </div>
            ))}

            <div className="flex items-center justify-end mt-4">
              <div className="flex items-center">
                <span className="text-xs mr-2">Ít</span>
                <div className="flex">
                  {colorScale.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-4"
                      style={{
                        backgroundColor: color,
                      }}
                    ></div>
                  ))}
                </div>
                <span className="text-xs ml-2">Nhiều</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
