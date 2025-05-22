"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface OverviewProps {
  className?: string
}

export function Overview({ className }: OverviewProps) {
  const data = [
    {
      name: "T1",
      total: 1200000,
    },
    {
      name: "T2",
      total: 1900000,
    },
    {
      name: "T3",
      total: 2300000,
    },
    {
      name: "T4",
      total: 1800000,
    },
    {
      name: "T5",
      total: 2100000,
    },
    {
      name: "T6",
      total: 2800000,
    },
    {
      name: "T7",
      total: 3200000,
    },
    {
      name: "T8",
      total: 2700000,
    },
    {
      name: "T9",
      total: 3500000,
    },
    {
      name: "T10",
      total: 3800000,
    },
    {
      name: "T11",
      total: 4200000,
    },
    {
      name: "T12",
      total: 4800000,
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tổng quan</CardTitle>
        <CardDescription>Biểu đồ hiển thị doanh thu theo thời gian.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly">
          <TabsList className="mb-4">
            <TabsTrigger value="yearly">Năm</TabsTrigger>
            <TabsTrigger value="monthly">Tháng</TabsTrigger>
            <TabsTrigger value="weekly">Tuần</TabsTrigger>
          </TabsList>
          <TabsContent value="yearly" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000000}tr`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()}đ`, "Doanh thu"]}
                  labelFormatter={(label) => `Tháng ${label}`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly" className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Dữ liệu tháng đang được tải...</p>
            </div>
          </TabsContent>
          <TabsContent value="weekly" className="h-[300px]">
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Dữ liệu tuần đang được tải...</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
