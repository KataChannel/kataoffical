import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateOffVAT() {
  try {
    const result = await prisma.khachhang.updateMany({
      data: {
        isshowvat: false
      }
    })
    
    console.log(`Updated ${result.count} records`)
  } catch (error) {
    console.error('Error updating VAT status:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateOffVAT()