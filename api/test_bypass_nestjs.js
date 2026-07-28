const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./src/app.module');
const { KhachhangService } = require('./src/khachhang/khachhang.service');
const { SanphamService } = require('./src/sanpham/sanpham.service');

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  
  try {
    const khachhangService = app.get(KhachhangService);
    const sanphamService = app.get(SanphamService);

    console.log('--- TESTING CUSTOMERS ---');
    const resKHDefault = await khachhangService.findby({ pageSize: 99999 });
    console.log(`Without bypassLimit (default cap): returns ${resKHDefault.data.length} customers (expected max 1000)`);

    const resKHBypass = await khachhangService.findby({ pageSize: 99999, bypassLimit: true });
    console.log(`With bypassLimit: returns ${resKHBypass.data.length} customers (expected all 1416)`);

    console.log('\n--- TESTING PRODUCTS ---');
    const resSPDefault = await sanphamService.findby({ pageSize: 99999 });
    console.log(`Without bypassLimit (default cap): returns ${resSPDefault.data.length} products (expected max 1000)`);

    const resSPBypass = await sanphamService.findby({ pageSize: 99999, bypassLimit: true });
    console.log(`With bypassLimit: returns ${resSPBypass.data.length} products (expected all 1024)`);

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await app.close();
  }
}

test();
