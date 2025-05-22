import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AnalyticsDateRange } from "@/components/analytics-date-range"
import { AnalyticsSummary } from "@/components/analytics-summary"
import { AnalyticsCharts } from "@/components/analytics-charts"
import { AnalyticsConversionFunnel } from "@/components/analytics-conversion-funnel"
import { AnalyticsPerformanceTable } from "@/components/analytics-performance-table"
import { AnalyticsHeatmap } from "@/components/analytics-heatmap"
import { AnalyticsDeviceBreakdown } from "@/components/analytics-device-breakdown"
import { AnalyticsGeographicMap } from "@/components/analytics-geographic-map"
import { AnalyticsFilters } from "@/components/analytics-filters"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <DashboardHeader
            heading="Phân tích chi tiết"
            text="Xem phân tích chi tiết về hiệu suất tiếp thị liên kết của bạn."
          />
          <AnalyticsDateRange />
        </div>

        <AnalyticsFilters />

        <AnalyticsSummary />

        <AnalyticsCharts />

        <div className="grid gap-4 md:grid-cols-2">
          <AnalyticsConversionFunnel />
          <AnalyticsDeviceBreakdown />
        </div>

        <AnalyticsHeatmap />

        <AnalyticsGeographicMap />

        <AnalyticsPerformanceTable />
      </div>
    </DashboardShell>
  )
}
