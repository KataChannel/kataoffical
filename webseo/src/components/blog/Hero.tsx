'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Chào mừng đến với Blog của chúng tôi
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Khám phá những bài viết chất lượng về công nghệ, lập trình, 
          và nhiều chủ đề thú vị khác từ cộng đồng của chúng tôi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/blog">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Khám phá Blog
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Tìm hiểu thêm
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}