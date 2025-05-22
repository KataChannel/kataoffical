"use client"
import { DownloadCloud, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function PaymentsTable() {
  const payments = [
    {
      id: "INV-001",
      date: "01/05/2023",
      amount: "5,670,000đ",
      status: "Đã thanh toán",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "INV-002",
      date: "01/04/2023",
      amount: "4,890,000đ",
      status: "Đã thanh toán",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "INV-003",
      date: "01/03/2023",
      amount: "3,450,000đ",
      status: "Đã thanh toán",
      method: "PayPal",
    },
    {
      id: "INV-004",
      date: "01/02/2023",
      amount: "2,980,000đ",
      status: "Đã thanh toán",
      method: "Chuyển khoản ngân hàng",
    },
    {
      id: "INV-005",
      date: "01/01/2023",
      amount: "2,340,000đ",
      status: "Đã thanh toán",
      method: "PayPal",
    },
    {
      id: "INV-006",
      date: "01/06/2023",
      amount: "6,780,000đ",
      status: "Đang xử lý",
      method: "Chuyển khoản ngân hàng",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lịch sử thanh toán</CardTitle>
        <CardDescription>Xem tất cả các khoản thanh toán hoa hồng của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã hóa đơn</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead className="hidden md:table-cell">Phương thức</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell className="hidden md:table-cell">{payment.method}</TableCell>
                <TableCell>
                  <Badge variant={payment.status === "Đã thanh toán" ? "default" : "secondary"}>{payment.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Mở menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <DownloadCloud className="mr-2 h-4 w-4" />
                        Tải xuống hóa đơn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Hiển thị 6 trên tổng số 6 thanh toán</p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Trước
          </Button>
          <Button variant="outline" size="sm" disabled>
            Tiếp
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
