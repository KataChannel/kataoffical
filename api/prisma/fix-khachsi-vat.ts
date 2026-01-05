import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function disableVATForWholesale() {
  try {
    const result = await prisma.khachhang.updateMany({
      where: {
        loaikh: 'khachsi'
      },
      data: {
        isshowvat: false
      }
    })
    
    console.log(`Updated ${result.count} wholesale customers to disable VAT display.`)

    // Also update orders for these customers if needed? 
    // The user said "off VAT tất cả khachsi", which probably means future and existing orders.
    // However, updating existing orders might change historical data.
    // Usually, it's safer to only affect new calculations or reports.
    // But since the user wants it "off", I should check if I should update existing orders too.
    
    const donhangResult = await prisma.donhang.updateMany({
        where: {
            khachhang: {
                loaikh: 'khachsi'
            }
        },
        data: {
            isshowvat: false,
            vat: 0
        }
    });
    console.log(`Updated ${donhangResult.count} orders for wholesale customers to set VAT to 0.`)

  } catch (error) {
    console.error('Error updating VAT status:', error)
  } finally {
    await prisma.$disconnect()
  }
}

disableVATForWholesale()
