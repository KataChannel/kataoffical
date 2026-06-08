"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const dathang_service_1 = require("./src/dathang/dathang.service");
const prisma_service_1 = require("./prisma/prisma.service");
async function main() {
    console.log('🤖 Bootstrapping NestJS application context...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: false });
    const dathangService = app.get(dathang_service_1.DathangService);
    const prisma = app.get(prisma_service_1.PrismaService);
    const orderId = '75fc2a82-539a-4c9f-a095-fa423c8ebab8';
    const productId = 'b69aaeb6-f337-4df8-a78a-fa0c84f6faa7';
    try {
        console.log('\n--- 1. CURRENT STATE CHECK ---');
        const oldOrder = await prisma.dathang.findUnique({
            where: { id: orderId },
            include: { sanpham: true }
        });
        console.log('Current order status:', oldOrder?.status);
        console.log('Current order products:', oldOrder?.sanpham);
        const oldStock = await prisma.tonKho.findUnique({
            where: { sanphamId: productId }
        });
        console.log('Current stock details for product:', oldStock);
        console.log('\n--- 2. TESTING UPDATE WHILE KEEPING CHOXULY ---');
        console.log('Updating order fields and product sldat from 500 to 600 without changing status...');
        const resUpdate = await dathangService.update(orderId, {
            title: 'Import 20260514_140434 - TEST CHOXULY EDIT',
            ghichu: 'Choxuly note edit',
            sanpham: [
                {
                    id: productId,
                    sldat: 600,
                    ghichu: 'Quantity edit in choxuly'
                }
            ]
        });
        console.log('Updated order status:', resUpdate?.status);
        console.log('Updated order title:', resUpdate?.title);
        console.log('Updated order products:', resUpdate?.sanpham);
        const afterUpdateStock = await prisma.tonKho.findUnique({
            where: { sanphamId: productId }
        });
        console.log('Stock details after update (should NOT have changed):', afterUpdateStock);
        if (afterUpdateStock?.slchonhap.toNumber() === oldStock?.slchonhap.toNumber()) {
            console.log('✅ PASS: slchonhap did not change during update.');
        }
        else {
            console.log('❌ FAIL: slchonhap changed!');
        }
        console.log('\n--- 3. TESTING TRANSITION TO DADAT ---');
        console.log('Transitioning order from choxuly to dadat...');
        const resTransition = await dathangService.update(orderId, {
            status: 'dadat',
            title: 'Import 20260514_140434 - TEST TRANSITION TO DADAT',
            sanpham: [
                {
                    id: productId,
                    sldat: 600,
                    ghichu: 'Transition to dadat'
                }
            ]
        });
        console.log('Transitioned order status:', resTransition?.status);
        console.log('Transitioned order title:', resTransition?.title);
        console.log('Transitioned order products:', resTransition?.sanpham);
        const afterTransitionStock = await prisma.tonKho.findUnique({
            where: { sanphamId: productId }
        });
        console.log('Stock details after transition (slchonhap should have increased by 600):', afterTransitionStock);
        const expectedNewSlchonhap = (afterUpdateStock?.slchonhap.toNumber() || 0) + 600;
        if (afterTransitionStock?.slchonhap.toNumber() === expectedNewSlchonhap) {
            console.log('✅ PASS: slchonhap correctly increased by 600.');
        }
        else {
            console.log(`❌ FAIL: Expected slchonhap to be ${expectedNewSlchonhap}, got ${afterTransitionStock?.slchonhap.toNumber()}`);
        }
        console.log('\n--- 4. CLEANUP (ROLLBACK TO CHOXULY) ---');
        console.log('Rolling back the order status to choxuly...');
        await dathangService.update(orderId, {
            status: 'choxuly',
            title: 'Import 20260514_140434',
            ghichu: 'Đơn đặt hàng chuyển sang choxuly',
            sanpham: [
                {
                    id: productId,
                    sldat: 500,
                    ghichu: 'Chuyển sang choxuly'
                }
            ]
        });
        console.log('Cleanup completed successfully.');
    }
    catch (error) {
        console.error('❌ Error during testing:', error);
    }
    finally {
        await app.close();
    }
}
main();
//# sourceMappingURL=check_choxuly_ip.js.map