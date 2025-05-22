"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

export function AnalyticsDeviceBreakdown() {
  // Memoize dữ liệu để tránh tạo lại mỗi lần render
  const deviceData = useMemo(
    () => [
      { name: "Di động", value: 65, color: "#8884d8" },
      { name: "Máy tính", value: 25, color: "#82ca9d" },
      { name: "Máy tính bảng", value: 8, color: "#ffc658" },
      { name: "Khác", value: 2, color: "#ff8042" },
    ],
    [],
  )

  const browserData = useMemo(
    () => [
      { name: "Chrome", value: 58, color: "#0088FE" },
      { name: "Safari", value: 22, color: "#00C49F" },
      { name: "Firefox", value: 8, color: "#FFBB28" },
      { name: "Edge", value: 7, color: "#FF8042" },
      { name: "Opera", value: 3, color: "#8884d8" },
      { name: "Khác", value: 2, color: "#82ca9d" },
    ],
    [],
  )

  // Memoize các hàm xử lý để tránh tạo lại mỗi lần render
  const renderCustomizedLabel = ({ name, percent }: { name: string; percent: number }) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`
  }

  const tooltipFormatter = (value: number) => [`${value}%`, ""]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phân tích thiết bị và trình duyệt</CardTitle>
        <CardDescription>Phân bổ lượt truy cập theo thiết bị và trình duyệt</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <div className="grid grid-cols-2 h-full">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-2">Thiết bị</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  isAnimationActive={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={tooltipFormatter} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-medium mb-2">Trình duyệt</h3>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={browserData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={renderCustomizedLabel}
                  isAnimationActive={false}
                >
                  {browserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={tooltipFormatter} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
