import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cài đặt"
        text="Quản lý cài đặt tài khoản và thông tin thanh toán của bạn."
      ></DashboardHeader>
      <div className="grid gap-10">
        <SettingsForm />
      </div>
    </DashboardShell>
  )
}
