"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function AnalyticsGeographicMap() {
  // Memoize dữ liệu để tránh tạo lại mỗi lần render
  const locationData = useMemo(
    () => [
      { name: "Hồ Chí Minh", value: 35, color: "#8884d8" },
      { name: "Hà Nội", value: 28, color: "#83a6ed" },
      { name: "Đà Nẵng", value: 12, color: "#8dd1e1" },
      { name: "Cần Thơ", value: 8, color: "#82ca9d" },
      { name: "Hải Phòng", value: 6, color: "#a4de6c" },
      { name: "Nha Trang", value: 5, color: "#d0ed57" },
      { name: "Khác", value: 6, color: "#ffc658" },
    ],
    [],
  )

  // Memoize các hàm xử lý để tránh tạo lại mỗi lần render
  const tooltipFormatter = (value: number) => [`${value}%`, "Tỷ lệ"]
  const labelFormatter = (value: number) => `${value}%`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân bố địa lý</CardTitle>
        <CardDescription>Phân tích lượt truy cập theo vị trí địa lý</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={locationData}
            margin={{
              top: 20,
              right: 30,
              left: 60,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={80} />
            <Tooltip formatter={tooltipFormatter} />
            <Bar dataKey="value" label={{ position: "right", formatter: labelFormatter }} isAnimationActive={false}>
              {locationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
