"use client"

import type React from "react"

import { Suspense, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface LazyChartProps {
  title: string
  description: string
  chartComponent: React.ComponentType<any>
  height?: string
  props?: any
}

export function AnalyticsLazyChart({
  title,
  description,
  chartComponent: ChartComponent,
  height = "350px",
  props = {},
}: LazyChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById(`chart-${title.replace(/\s+/g, "-").toLowerCase()}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [title])

  return (
    <Card id={`chart-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent style={{ height }}>
        {isClient && (
          <Suspense fallback={<ChartSkeleton />}>
            {isVisible ? <ChartComponent {...props} /> : <ChartSkeleton />}
          </Suspense>
        )}
      </CardContent>
    </Card>
  )
}

function ChartSkeleton() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-full h-full flex flex-col gap-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
