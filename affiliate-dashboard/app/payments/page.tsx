import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PaymentsTable } from "@/components/payments-table"

export default function PaymentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Thanh toán"
        text="Xem lịch sử thanh toán và các khoản thanh toán sắp tới của bạn."
      ></DashboardHeader>
      <PaymentsTable />
    </DashboardShell>
  )
}
