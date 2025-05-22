import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TopPerformersProps {
  className?: string
}

export function TopPerformers({ className }: TopPerformersProps) {
  const topProducts = [
    {
      name: "Điện thoại Galaxy S23",
      category: "Điện tử",
      conversions: 245,
      revenue: "24,500,000đ",
    },
    {
      name: "Laptop Dell XPS 13",
      category: "Máy tính",
      conversions: 189,
      revenue: "56,700,000đ",
    },
    {
      name: "Tai nghe Sony WH-1000XM5",
      category: "Âm thanh",
      conversions: 156,
      revenue: "15,600,000đ",
    },
    {
      name: "Máy ảnh Canon EOS R6",
      category: "Máy ảnh",
      conversions: 132,
      revenue: "39,600,000đ",
    },
    {
      name: "Apple Watch Series 8",
      category: "Đồng hồ thông minh",
      conversions: 124,
      revenue: "12,400,000đ",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sản phẩm hiệu quả nhất</CardTitle>
        <CardDescription>Top 5 sản phẩm có doanh thu cao nhất tháng này.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{product.name}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <p className="text-xs text-muted-foreground">{product.conversions} chuyển đổi</p>
                </div>
              </div>
              <div className="text-sm font-medium">{product.revenue}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
