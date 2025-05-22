import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  const activities = [
    {
      id: "1",
      type: "conversion",
      product: "Điện thoại Galaxy S23",
      amount: "2,450,000đ",
      commission: "245,000đ",
      date: "Hôm nay, 10:23",
      status: "Thành công",
    },
    {
      id: "2",
      type: "click",
      product: "Laptop Dell XPS 13",
      date: "Hôm nay, 09:15",
      status: "Đã click",
    },
    {
      id: "3",
      type: "conversion",
      product: "Tai nghe Sony WH-1000XM5",
      amount: "3,900,000đ",
      commission: "390,000đ",
      date: "Hôm qua, 18:45",
      status: "Thành công",
    },
    {
      id: "4",
      type: "payment",
      amount: "5,670,000đ",
      date: "Hôm qua, 12:30",
      status: "Đã thanh toán",
    },
    {
      id: "5",
      type: "click",
      product: "Apple Watch Series 8",
      date: "Hôm qua, 10:12",
      status: "Đã click",
    },
  ]

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
        <CardDescription>Các hoạt động mới nhất trên tài khoản của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt="Activity" />
                <AvatarFallback>
                  {activity.type === "conversion" ? "CV" : activity.type === "click" ? "CL" : "PM"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.type === "conversion"
                    ? `Chuyển đổi: ${activity.product}`
                    : activity.type === "click"
                      ? `Click: ${activity.product}`
                      : "Thanh toán hoa hồng"}
                </p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {activity.amount && <span className="text-sm font-medium">{activity.amount}</span>}
                {activity.commission && <span className="text-xs text-green-500">+{activity.commission}</span>}
                <Badge variant={activity.type === "conversion" ? "default" : "secondary"} className="text-xs">
                  {activity.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
