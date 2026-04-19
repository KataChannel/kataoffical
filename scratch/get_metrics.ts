import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const yesterday = new Date('2026-04-17')
  const today = new Date('2026-04-18')

  // 1. Đơn Hàng (Sales Orders) for yesterday
  const donhangs = await prisma.donhang.findMany({
    where: {
      ngaygiao: {
        gte: yesterday,
        lt: today
      }
    },
    include: {
      sanpham: true
    }
  })

  // 2. Đặt Hàng (Purchasing Orders) for yesterday
  const dathangs = await prisma.dathang.findMany({
    where: {
      ngaynhan: {
        gte: yesterday,
        lt: today
      }
    },
    include: {
      sanpham: true
    }
  })

  // 3. Tồn Kho (Current Inventory Summary)
  const tonkhos = await prisma.tonKho.findMany({
    include: {
      sanpham: {
        select: {
          title: true,
          masp: true
        }
      }
    }
  })

  // Summarize Donhang
  const totalDonhang = donhangs.length
  const totalSalesWeight = donhangs.reduce((sum, dh) => 
    sum + dh.sanpham.reduce((s, sp) => s + Number(sp.slgiao || sp.sldat), 0), 0)
  const totalSalesValue = donhangs.reduce((sum, dh) => sum + Number(dh.tongtien), 0)

  // Summarize Dathang
  const totalDathang = dathangs.length
  const totalPurchaseWeight = dathangs.reduce((sum, dh) => 
    sum + dh.sanpham.reduce((s, sp) => s + Number(sp.slnhan || sp.sldat), 0), 0)

  // Summarize Tonkho
  const totalInventoryTypes = tonkhos.length
  const totalInventoryWeight = tonkhos.reduce((sum, tk) => sum + Number(tk.slton), 0)
  
  // Top 5 items with high inventory
  const topInventory = [...tonkhos]
    .sort((a, b) => Number(b.slton) - Number(a.slton))
    .slice(0, 5)

  console.log(JSON.stringify({
    date: '2026-04-17',
    donhang: {
      count: totalDonhang,
      weight: totalSalesWeight,
      value: totalSalesValue
    },
    dathang: {
      count: totalDathang,
      weight: totalPurchaseWeight
    },
    inventory: {
      types: totalInventoryTypes,
      totalWeight: totalInventoryWeight,
      top: topInventory.map(tk => ({
        name: tk.sanpham.title,
        masp: tk.sanpham.masp,
        qty: tk.slton
      }))
    }
  }, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
