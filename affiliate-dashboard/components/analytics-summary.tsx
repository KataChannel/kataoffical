"use client"

import { ArrowDown, ArrowUp, DollarSign, MousePointerClick, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsSummary() {
  const metrics = [
    {
      title: "Tổng doanh thu",
      value: "145,678,000đ",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "So với kỳ trước",
    },
    {
      title: "Tổng lượt click",
      value: "245,678",
      change: "+18.2%",
      trend: "up",
      icon: MousePointerClick,
      description: "So với kỳ trước",
    },
    {
      title: "Tổng chuyển đổi",
      value: "12,345",
      change: "+5.2%",
      trend: "up",
      icon: ShoppingCart,
      description: "So với kỳ trước",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      value: "5.02%",
      change: "-1.8%",
      trend: "down",
      icon: Users,
      description: "So với kỳ trước",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <div className="flex items-center">
              {metric.trend === "up" ? (
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <CardDescription className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                {metric.change}
              </CardDescription>
              <CardDescription className="ml-1">{metric.description}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
