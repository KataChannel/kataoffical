import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateVAT() {
  try {
    const result = await prisma.donhang.updateMany({
      data: {
        vat: 0.05
      }
    })
    
    console.log(`Đã cập nhật VAT cho ${result.count} đơn hàng`)
  } catch (error) {
    console.error('Lỗi khi cập nhật VAT:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Chạy function
updateVAT()