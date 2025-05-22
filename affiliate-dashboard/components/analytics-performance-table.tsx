"use client"

import type React from "react"

import { useState, useMemo } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Product {
  id: string
  name: string
  category: string
  campaign: string
  clicks: number
  conversions: number
  revenue: number
  conversionRate: number
  averageOrderValue: number
}

export function AnalyticsPerformanceTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [nameFilter, setNameFilter] = useState("")

  // Memoize data để tránh tạo lại mảng dữ liệu mỗi lần render
  const data = useMemo<Product[]>(
    () => [
      {
        id: "1",
        name: "Điện thoại Galaxy S23",
        category: "Điện tử",
        campaign: "Samsung Summer",
        clicks: 12450,
        conversions: 1245,
        revenue: 24500000,
        conversionRate: 10.0,
        averageOrderValue: 1967871,
      },
      {
        id: "2",
        name: "Laptop Dell XPS 13",
        category: "Máy tính",
        campaign: "Back to School",
        clicks: 9870,
        conversions: 987,
        revenue: 56700000,
        conversionRate: 10.0,
        averageOrderValue: 5744680,
      },
      {
        id: "3",
        name: "Tai nghe Sony WH-1000XM5",
        category: "Âm thanh",
        campaign: "Audio Deals",
        clicks: 7560,
        conversions: 756,
        revenue: 15600000,
        conversionRate: 10.0,
        averageOrderValue: 2063492,
      },
      {
        id: "4",
        name: "Máy ảnh Canon EOS R6",
        category: "Máy ảnh",
        campaign: "Photography Pro",
        clicks: 5430,
        conversions: 543,
        revenue: 39600000,
        conversionRate: 10.0,
        averageOrderValue: 7293925,
      },
      {
        id: "5",
        name: "Apple Watch Series 8",
        category: "Đồng hồ thông minh",
        campaign: "Apple Products",
        clicks: 8760,
        conversions: 876,
        revenue: 12400000,
        conversionRate: 10.0,
        averageOrderValue: 1415525,
      },
      {
        id: "6",
        name: "iPad Pro 12.9",
        category: "Máy tính bảng",
        campaign: "Apple Products",
        clicks: 4320,
        conversions: 432,
        revenue: 29400000,
        conversionRate: 10.0,
        averageOrderValue: 6805556,
      },
      {
        id: "7",
        name: "Máy hút bụi Dyson V12",
        category: "Gia dụng",
        campaign: "Home Appliances",
        clicks: 3210,
        conversions: 321,
        revenue: 13050000,
        conversionRate: 10.0,
        averageOrderValue: 4065421,
      },
      {
        id: "8",
        name: "Màn hình Samsung Odyssey G9",
        category: "Màn hình",
        campaign: "Gaming Gear",
        clicks: 2870,
        conversions: 287,
        revenue: 18655000,
        conversionRate: 10.0,
        averageOrderValue: 6500000,
      },
      {
        id: "9",
        name: "Bàn phím cơ Keychron Q1",
        category: "Phụ kiện",
        campaign: "Gaming Gear",
        clicks: 4560,
        conversions: 456,
        revenue: 9120000,
        conversionRate: 10.0,
        averageOrderValue: 2000000,
      },
      {
        id: "10",
        name: "Loa Marshall Stanmore III",
        category: "Âm thanh",
        campaign: "Audio Deals",
        clicks: 3450,
        conversions: 345,
        revenue: 10350000,
        conversionRate: 10.0,
        averageOrderValue: 3000000,
      },
    ],
    [],
  )

  // Memoize columns để tránh tạo lại định nghĩa cột mỗi lần render
  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Sản phẩm",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
      },
      {
        accessorKey: "category",
        header: "Danh mục",
      },
      {
        accessorKey: "campaign",
        header: "Chiến dịch",
      },
      {
        accessorKey: "clicks",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Lượt click
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("clicks").toLocaleString()}</div>,
      },
      {
        accessorKey: "conversions",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Chuyển đổi
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("conversions").toLocaleString()}</div>,
      },
      {
        accessorKey: "conversionRate",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Tỷ lệ
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("conversionRate")}%</div>,
      },
      {
        accessorKey: "revenue",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Doanh thu
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("revenue").toLocaleString()}đ</div>,
      },
      {
        accessorKey: "averageOrderValue",
        header: ({ column }) => {
          return (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
              Giá trị TB
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("averageOrderValue").toLocaleString()}đ</div>,
      },
    ],
    [],
  )

  // Xử lý thay đổi bộ lọc tên sản phẩm
  const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value)
    table.getColumn("name")?.setFilterValue(e.target.value)
  }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    // Thiết lập số lượng hàng mỗi trang để tránh tính toán lại liên tục
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Hiệu suất sản phẩm</CardTitle>
            <CardDescription>Phân tích chi tiết hiệu suất của từng sản phẩm</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={nameFilter}
              onChange={handleNameFilterChange}
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Cột <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id === "name"
                          ? "Sản phẩm"
                          : column.id === "category"
                            ? "Danh mục"
                            : column.id === "campaign"
                              ? "Chiến dịch"
                              : column.id === "clicks"
                                ? "Lượt click"
                                : column.id === "conversions"
                                  ? "Chuyển đổi"
                                  : column.id === "conversionRate"
                                    ? "Tỷ lệ"
                                    : column.id === "revenue"
                                      ? "Doanh thu"
                                      : column.id === "averageOrderValue"
                                        ? "Giá trị TB"
                                        : column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Không tìm thấy kết quả.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Hiển thị {table.getRowModel().rows.length} trên tổng số {data.length} sản phẩm.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trước
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Tiếp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
