import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateAllKhachHangActive() {
  try {
    const result = await prisma.khachhang.updateMany({
      data: {
        isActive: true
      }
    })
    console.log(`Updated ${result.count} khachhang records`)
    return result
  } catch (error) {
    throw error
  } finally {
    await prisma.$disconnect()
  }
}
updateAllKhachHangActive()