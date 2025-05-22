"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, Funnel, FunnelChart, LabelList, Tooltip } from "recharts"

export function AnalyticsConversionFunnel() {
  // Memoize dữ liệu để tránh tạo lại mỗi lần render
  const data = useMemo(
    () => [
      {
        name: "Lượt hiển thị",
        value: 100000,
        fill: "#8884d8",
      },
      {
        name: "Lượt click",
        value: 24532,
        fill: "#83a6ed",
      },
      {
        name: "Thêm vào giỏ hàng",
        value: 8765,
        fill: "#8dd1e1",
      },
      {
        name: "Bắt đầu thanh toán",
        value: 3456,
        fill: "#82ca9d",
      },
      {
        name: "Hoàn tất mua hàng",
        value: 1234,
        fill: "#a4de6c",
      },
    ],
    [],
  )

  // Memoize formatter để tránh tạo lại hàm mỗi lần render
  const valueFormatter = (value: number) => [`${value.toLocaleString()}`, ""]
  const labelFormatter = (value: number) => `${value.toLocaleString()}`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Phễu chuyển đổi</CardTitle>
        <CardDescription>Phân tích phễu chuyển đổi từ hiển thị đến mua hàng</CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip formatter={valueFormatter} />
            <Funnel dataKey="value" data={data} isAnimationActive={false}>
              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
              <LabelList
                position="right"
                fill="#000"
                stroke="none"
                dataKey="value"
                formatter={labelFormatter}
                offset={60}
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
