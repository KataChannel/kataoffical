import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#57A345] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Image 
              src="/assets/images/logo-full.png" 
              alt="Rau Sạch Trần Gia"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
            <p className="text-sm text-gray-100">
              Cung cấp rau sạch, thực phẩm hữu cơ chất lượng cao. 
              Cam kết sản phẩm tươi ngon, an toàn cho sức khỏe.
            </p>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên Hệ</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <Link href="tel:0865770009" className="hover:text-[#FAA61A] transition-colors">
                  0865.77.0009
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <Link href="mailto:rausachtrangia@gmail.com" className="hover:text-[#FAA61A] transition-colors">
                  rausachtrangia@gmail.com
                </Link>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span className="text-sm">
                  Địa chỉ: Trần Gia, Việt Nam
                </span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên Kết</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog/gioi-thieu/ve-chung-toi" className="hover:text-[#FAA61A] transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link href="/danh-muc" className="hover:text-[#FAA61A] transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/blog/khuyen-mai" className="hover:text-[#FAA61A] transition-colors">
                  Khuyến Mãi
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-[#FAA61A] transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Theo Dõi</h3>
            <div className="flex space-x-4">
              <Link 
                href="#" 
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Giờ Làm Việc</h4>
              <p className="text-sm text-gray-100">
                Thứ 2 - Chủ Nhật<br />
                6:00 - 22:00
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-100">
            © {currentYear} Rau Sạch Trần Gia. Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}