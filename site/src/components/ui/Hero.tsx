import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-[#57A345] to-[#4a8f39] flex items-center">
      <div className="container mx-auto px-4 text-white">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-4">
            Rau Sạch Trần Gia
          </h1>
          <p className="text-xl mb-8">
            Cung cấp rau sạch, thực phẩm hữu cơ chất lượng cao. 
            Cam kết tươi ngon, an toàn cho sức khỏe của gia đình bạn.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#FAA61A] hover:bg-[#D89016] text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Mua Ngay
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#57A345] px-8 py-3 rounded-full font-semibold transition-colors">
              Tìm Hiểu Thêm
            </button>
          </div>
        </div>
      </div>
      
      {/* Background pattern or image can be added here */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10">
        <div className="w-full h-full bg-[url('/assets/images/hero-pattern.svg')] bg-no-repeat bg-right bg-contain"></div>
      </div>
    </section>
  )
}