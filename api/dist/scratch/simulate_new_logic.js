"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const chotkho_service_1 = require("../src/chotkho/chotkho.service");
const prisma = new client_1.PrismaClient();
const mockNotification = { sendNotificationToUser: async () => { } };
const service = new chotkho_service_1.ChotkhoService(prisma, mockNotification);
async function simulate() {
    const masps = ['I100164', 'I100207', 'I100479'];
    const khoId = '4cc01811-61f5-4bdc-83de-a493764e9258';
    const endTime = new Date('2026-04-11T15:39:09Z');
    console.log('=== SIMULATING GLOBAL SNAPSHOT (NEW LOGIC) ===');
    for (const masp of masps) {
        const p = await prisma.sanpham.findUnique({ where: { masp } });
        if (!p)
            continue;
        const analysis = await service.calculateStockFromLogs(p.id, khoId, endTime);
        console.log(`Product: ${masp} (${p.title})`);
        console.log(`  Last Closing Reality: ${analysis.initialQty}`);
        console.log(`  Calculated Snapshot (Global): ${analysis.currentCalc}`);
        const stored = await prisma.chotkhodetail.findFirst({
            where: { sanphamId: p.id, chotkhoId: '8e2ef290-689d-45f1-8cf2-4b052985f148' }
        });
        console.log(`  Previously Stored (Local): ${stored?.sltonhethong}`);
        console.log(`  Difference: ${analysis.currentCalc - Number(stored?.sltonhethong || 0)}`);
    }
}
simulate()
    .finally(() => prisma.$disconnect());
//# sourceMappingURL=simulate_new_logic.js.map