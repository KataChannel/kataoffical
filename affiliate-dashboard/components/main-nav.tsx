import Link from "next/link"
import { BarChart3 } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <BarChart3 className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">AffiliateHub</span>
      </Link>
    </div>
  )
}
