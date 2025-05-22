"use client"
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react"

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
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CreateLinkForm } from "@/components/create-link-form"

export function LinksTable() {
  const links = [
    {
      id: "1",
      name: "Điện thoại Galaxy S23",
      url: "https://example.com/ref/galaxys23",
      campaign: "Samsung Summer",
      clicks: 1245,
      conversions: 245,
      rate: "19.7%",
      earnings: "24,500,000đ",
      status: "Hoạt động",
    },
    {
      id: "2",
      name: "Laptop Dell XPS 13",
      url: "https://example.com/ref/dellxps13",
      campaign: "Back to School",
      clicks: 987,
      conversions: 189,
      rate: "19.1%",
      earnings: "56,700,000đ",
      status: "Hoạt động",
    },
    {
      id: "3",
      name: "Tai nghe Sony WH-1000XM5",
      url: "https://example.com/ref/sonywh1000xm5",
      campaign: "Audio Deals",
      clicks: 756,
      conversions: 156,
      rate: "20.6%",
      earnings: "15,600,000đ",
      status: "Hoạt động",
    },
    {
      id: "4",
      name: "Máy ảnh Canon EOS R6",
      url: "https://example.com/ref/canoneosr6",
      campaign: "Photography Pro",
      clicks: 543,
      conversions: 132,
      rate: "24.3%",
      earnings: "39,600,000đ",
      status: "Hoạt động",
    },
    {
      id: "5",
      name: "Apple Watch Series 8",
      url: "https://example.com/ref/applewatch8",
      campaign: "Apple Products",
      clicks: 876,
      conversions: 124,
      rate: "14.2%",
      earnings: "12,400,000đ",
      status: "Hoạt động",
    },
    {
      id: "6",
      name: "iPad Pro 12.9",
      url: "https://example.com/ref/ipadpro129",
      campaign: "Apple Products",
      clicks: 432,
      conversions: 98,
      rate: "22.7%",
      earnings: "29,400,000đ",
      status: "Tạm dừng",
    },
    {
      id: "7",
      name: "Máy hút bụi Dyson V12",
      url: "https://example.com/ref/dysonv12",
      campaign: "Home Appliances",
      clicks: 321,
      conversions: 87,
      rate: "27.1%",
      earnings: "13,050,000đ",
      status: "Hoạt động",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Liên kết tiếp thị</CardTitle>
          <CreateLinkForm />
        </div>
        <CardDescription>Quản lý tất cả các liên kết tiếp thị của bạn.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <Input placeholder="Tìm kiếm liên kết..." className="max-w-sm" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead className="hidden md:table-cell">Chiến dịch</TableHead>
              <TableHead className="hidden md:table-cell">Lượt click</TableHead>
              <TableHead className="hidden md:table-cell">Chuyển đổi</TableHead>
              <TableHead className="hidden lg:table-cell">Tỷ lệ</TableHead>
              <TableHead>Doanh thu</TableHead>
              <TableHead className="hidden lg:table-cell">Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <TableRow key={link.id}>
                <TableCell className="font-medium">{link.name}</TableCell>
                <TableCell className="hidden md:table-cell">{link.campaign}</TableCell>
                <TableCell className="hidden md:table-cell">{link.clicks.toLocaleString()}</TableCell>
                <TableCell className="hidden md:table-cell">{link.conversions.toLocaleString()}</TableCell>
                <TableCell className="hidden lg:table-cell">{link.rate}</TableCell>
                <TableCell>{link.earnings}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant={link.status === "Hoạt động" ? "default" : "secondary"}>{link.status}</Badge>
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
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(link.url)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Sao chép liên kết
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Pencil className="mr-2 h-4 w-4" />
                        Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Xóa
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
        <p className="text-sm text-muted-foreground">Hiển thị 7 trên tổng số 7 liên kết</p>
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
