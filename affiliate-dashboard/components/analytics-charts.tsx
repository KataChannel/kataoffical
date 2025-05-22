"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useResizeObserver } from "@/hooks/use-resize-observer"

// Hàm tổng hợp dữ liệu để giảm số điểm dữ liệu
const aggregateData = (data: any[], maxPoints: number) => {
  if (data.length <= maxPoints) return data

  const result = []
  const step = Math.ceil(data.length / maxPoints)

  for (let i = 0; i < data.length; i += step) {
    const chunk = data.slice(i, Math.min(i + step, data.length))
    const aggregated = chunk.reduce(
      (acc, curr) => {
        return {
          date: curr.date, // Giữ ngày của điểm cuối cùng trong nhóm
          revenue: acc.revenue + curr.revenue / chunk.length,
          clicks: acc.clicks + curr.clicks / chunk.length,
          conversions: acc.conversions + curr.conversions / chunk.length,
        }
      },
      { date: "", revenue: 0, clicks: 0, conversions: 0 },
    )

    // Làm tròn các giá trị
    aggregated.revenue = Math.round(aggregated.revenue)
    aggregated.clicks = Math.round(aggregated.clicks)
    aggregated.conversions = Math.round(aggregated.conversions)

    result.push(aggregated)
  }

  return result
}

export function AnalyticsCharts() {
  const [timeframe, setTimeframe] = useState("daily")
  const [containerRef, { width }] = useResizeObserver()

  // Tính toán số điểm dữ liệu tối đa dựa trên chiều rộng container
  const maxDataPoints = useMemo(() => {
    // Ước tính khoảng 20px cho mỗi điểm dữ liệu
    return width ? Math.max(Math.floor(width / 20), 20) : 50
  }, [width])

  // Dữ liệu mẫu cho biểu đồ - được memoize để tránh tạo lại
  const rawDailyData = useMemo(() => {
    // Tạo dữ liệu mẫu lớn hơn (90 ngày)
    const data = []
    const startDate = new Date(2023, 4, 1) // 1/5/2023

    for (let i = 0; i < 90; i++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + i)

      // Thêm một số biến động ngẫu nhiên nhưng có xu hướng tăng
      const trend = 1 + i / 180 // Xu hướng tăng nhẹ theo thời gian
      const randomFactor = 0.8 + Math.random() * 0.4 // Biến động ngẫu nhiên từ 0.8 đến 1.2

      const baseRevenue = 1000000 * trend * randomFactor
      const baseClicks = 1000 * trend * randomFactor
      const baseConversions = 100 * trend * randomFactor

      // Thêm biến động theo ngày trong tuần (cuối tuần cao hơn)
      const dayOfWeek = currentDate.getDay()
      const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.3 : 1.0

      data.push({
        date: `${currentDate.getDate().toString().padStart(2, "0")}/${(currentDate.getMonth() + 1).toString().padStart(2, "0")}`,
        revenue: Math.round(baseRevenue * weekendFactor),
        clicks: Math.round(baseClicks * weekendFactor),
        conversions: Math.round(baseConversions * weekendFactor),
      })
    }

    return data
  }, [])

  // Tạo dữ liệu tuần và tháng từ dữ liệu ngày
  const rawWeeklyData = useMemo(() => {
    const data = []
    for (let i = 0; i < 12; i++) {
      const weekRevenue = Math.round(9000000 + i * 800000 + Math.random() * 2000000)
      const weekClicks = Math.round(9000 + i * 800 + Math.random() * 2000)
      const weekConversions = Math.round(900 + i * 80 + Math.random() * 200)

      data.push({
        date: `Tuần ${i + 1}`,
        revenue: weekRevenue,
        clicks: weekClicks,
        conversions: weekConversions,
      })
    }
    return data
  }, [])

  const rawMonthlyData = useMemo(() => {
    const data = []
    for (let i = 0; i < 12; i++) {
      const monthRevenue = Math.round(40000000 + i * 5000000 + Math.random() * 8000000)
      const monthClicks = Math.round(40000 + i * 5000 + Math.random() * 8000)
      const monthConversions = Math.round(4000 + i * 500 + Math.random() * 800)

      data.push({
        date: `T${i + 1}`,
        revenue: monthRevenue,
        clicks: monthClicks,
        conversions: monthConversions,
      })
    }
    return data
  }, [])

  // Dữ liệu cho biểu đồ so sánh chiến dịch
  const campaignData = useMemo(
    () => [
      { name: "Samsung Summer", revenue: 45000000, clicks: 45000, conversions: 4500 },
      { name: "Back to School", value: 38000000, clicks: 38000, conversions: 3800 },
      { name: "Audio Deals", value: 32000000, clicks: 32000, conversions: 3200 },
      { name: "Photography Pro", value: 28000000, clicks: 28000, conversions: 2800 },
      { name: "Apple Products", value: 42000000, clicks: 42000, conversions: 4200 },
      { name: "Home Appliances", value: 25000000, clicks: 25000, conversions: 2500 },
    ],
    [],
  )

  // Tổng hợp dữ liệu dựa trên số điểm tối đa
  const dailyData = useMemo(() => aggregateData(rawDailyData, maxDataPoints), [rawDailyData, maxDataPoints])
  const weeklyData = useMemo(() => aggregateData(rawWeeklyData, maxDataPoints), [rawWeeklyData, maxDataPoints])
  const monthlyData = useMemo(() => aggregateData(rawMonthlyData, maxDataPoints), [rawMonthlyData, maxDataPoints])

  // Chọn dữ liệu dựa trên khung thời gian
  const chartData = useMemo(() => {
    switch (timeframe) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return dailyData
    }
  }, [timeframe, dailyData, weeklyData, monthlyData])

  // Memoize formatter để tránh tạo lại hàm mỗi lần render
  const revenueFormatter = useCallback((value: number) => {
    return [`${value.toLocaleString()}đ`, "Doanh thu"]
  }, [])

  const yAxisTickFormatter = useCallback((value: number) => {
    return value >= 1000000 ? `${(value / 1000000).toFixed(1)}tr` : `${(value / 1000).toFixed(0)}k`
  }, [])

  const handleTimeframeChange = useCallback((value: string) => {
    setTimeframe(value)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2" ref={containerRef}>
      <Card className="col-span-full">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Doanh thu theo thời gian</CardTitle>
              <CardDescription>Biểu đồ hiển thị doanh thu theo thời gian</CardDescription>
            </div>
            <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Ngày</TabsTrigger>
                <TabsTrigger value="weekly">Tuần</TabsTrigger>
                <TabsTrigger value="monthly">Tháng</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" minTickGap={15} />
              <YAxis tickFormatter={yAxisTickFormatter} width={60} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip formatter={revenueFormatter} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                isAnimationActive={false} // Tắt animation để cải thiện hiệu suất
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lượt click và chuyển đổi</CardTitle>
          <CardDescription>So sánh lượt click và chuyển đổi theo thời gian</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} interval="preserveStartEnd" minTickGap={15} />
              <YAxis yAxisId="left" width={40} />
              <YAxis yAxisId="right" orientation="right" width={40} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="clicks"
                stroke="#8884d8"
                dot={false} // Tắt hiển thị điểm để cải thiện hiệu suất
                activeDot={{ r: 6 }}
                name="Lượt click"
                isAnimationActive={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="conversions"
                stroke="#82ca9d"
                dot={false}
                activeDot={{ r: 6 }}
                name="Chuyển đổi"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>So sánh chiến dịch</CardTitle>
          <CardDescription>So sánh hiệu suất giữa các chiến dịch</CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData} layout="vertical" margin={{ top: 10, right: 30, left: 50, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={yAxisTickFormatter} />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip formatter={revenueFormatter} />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" name="Doanh thu" isAnimationActive={false} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
