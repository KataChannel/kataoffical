import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { LinksTable } from "@/components/links-table"

export default function LinksPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Liên kết tiếp thị"
        text="Quản lý và theo dõi tất cả các liên kết tiếp thị của bạn."
      ></DashboardHeader>
      <LinksTable />
    </DashboardShell>
  )
}
