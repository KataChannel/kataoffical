import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { TopPerformers } from "@/components/top-performers"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Xem tổng quan về hiệu suất tiếp thị liên kết của bạn." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="lg:col-span-4" />
        <TopPerformers className="lg:col-span-3" />
      </div>
      <RecentActivity />
    </DashboardShell>
  )
}
