const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../api/src/app.module');
const { KhachhangService } = require('../api/src/khachhang/khachhang.service');
const { SanphamService } = require('../api/src/sanpham/sanpham.service');

async function test() {
  // Disable logging during test
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  
  try {
    const khachhangService = app.get(KhachhangService);
    const sanphamService = app.get(SanphamService);

    console.log('--- TESTING CUSTOMERS ---');
    // Test 1: Query without bypassLimit
    const resKHDefault = await khachhangService.findby({ pageSize: 99999 });
    console.log(`Without bypassLimit (default cap): returns ${resKHDefault.data.length} customers (expected max 1000)`);

    // Test 2: Query with bypassLimit
    const resKHBypass = await khachhangService.findby({ pageSize: 99999, bypassLimit: true });
    console.log(`With bypassLimit: returns ${resKHBypass.data.length} customers (expected all 1416)`);

    console.log('\n--- TESTING PRODUCTS ---');
    // Test 3: Query products without bypassLimit
    const resSPDefault = await sanphamService.findby({ pageSize: 99999 });
    console.log(`Without bypassLimit (default cap): returns ${resSPDefault.data.length} products (expected max 1000)`);

    // Test 4: Query products with bypassLimit
    const resSPBypass = await sanphamService.findby({ pageSize: 99999, bypassLimit: true });
    console.log(`With bypassLimit: returns ${resSPBypass.data.length} products (expected all 1024)`);

  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await app.close();
  }
}

test();
