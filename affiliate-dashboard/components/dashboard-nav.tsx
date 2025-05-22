"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Link2, Settings, CreditCard, PieChart } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Tổng quan",
      href: "/dashboard",
      icon: BarChart3,
    },
    {
      title: "Phân tích",
      href: "/analytics",
      icon: PieChart,
    },
    {
      title: "Liên kết",
      href: "/links",
      icon: Link2,
    },
    {
      title: "Thanh toán",
      href: "/payments",
      icon: CreditCard,
    },
    {
      title: "Cài đặt",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <Button
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn("w-full justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.title}
          </Button>
        </Link>
      ))}
    </nav>
  )
}
