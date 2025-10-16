# 🧪 Hướng Dẫn Viết Tests - Price History System

**Ngày**: 16/10/2025  
**Ước tính thời gian**: 2-3 ngày  
**Test Coverage Target**: 80%+

---

## 📋 TABLE OF CONTENTS

1. [Unit Tests (Backend)](#unit-tests-backend)
2. [Unit Tests (Frontend)](#unit-tests-frontend)
3. [Integration Tests](#integration-tests)
4. [E2E Tests](#e2e-tests)
5. [Performance Tests](#performance-tests)

---

## 🔧 SETUP

### Install Test Dependencies

#### Backend (NestJS)
```bash
cd /chikiet/kataoffical/rausachfinal/api

# Jest already installed with NestJS
npm install --save-dev @nestjs/testing
npm install --save-dev supertest @types/supertest
```

#### Frontend (Angular)
```bash
cd /chikiet/kataoffical/rausachfinal/frontend

# Jasmine & Karma already installed with Angular
npm install --save-dev @angular/core/testing
npm install --save-dev karma-coverage
```

#### E2E Testing
```bash
# Install Playwright (recommended)
npm install --save-dev @playwright/test

# Or Cypress
npm install --save-dev cypress
```

---

## 🎯 UNIT TESTS (BACKEND)

### Test 1: BanggiaPriceHistoryService

**File**: `/api/src/banggia/banggia-price-history.service.spec.ts`

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { BanggiaPriceHistoryService } from './banggia-price-history.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BanggiaPriceHistoryService', () => {
  let service: BanggiaPriceHistoryService;
  let prisma: PrismaService;

  // Mock PrismaService
  const mockPrismaService = {
    banggiasanpham: {
      findFirst: jest.fn(),
      update: jest.fn()
    },
    auditLog: {
      create: jest.fn(),
      findMany: jest.fn()
    },
    $transaction: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BanggiaPriceHistoryService,
        {
          provide: PrismaService,
          useValue: mockPrismaService
        }
      ],
    }).compile();

    service = module.get<BanggiaPriceHistoryService>(BanggiaPriceHistoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updatePrice', () => {
    it('should update price and create audit log', async () => {
      // Arrange
      const banggiaId = 'bg-123';
      const sanphamId = 'sp-456';
      const oldPrice = 10000;
      const newPrice = 12000;
      const userId = 'user-1';
      const reason = 'Market price increase';

      const mockBgsp = {
        id: 'bgsp-1',
        banggiaId,
        sanphamId,
        giaban: oldPrice,
        banggia: { mabanggia: 'BG001', title: 'Bảng giá 1' },
        sanpham: { masp: 'SP001', title: 'Sản phẩm 1' }
      };

      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(mockBgsp);
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return await callback(mockPrismaService);
      });

      // Act
      const result = await service.updatePrice({
        banggiaId,
        sanphamId,
        newPrice,
        userId,
        reason
      });

      // Assert
      expect(result.action).toBe('UPDATED');
      expect(result.newPrice).toBe(newPrice);
      expect(result.oldPrice).toBe(oldPrice);
      expect(mockPrismaService.banggiasanpham.update).toHaveBeenCalled();
      expect(mockPrismaService.auditLog.create).toHaveBeenCalled();
    });

    it('should throw error when price not found', async () => {
      // Arrange
      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updatePrice({
        banggiaId: 'bg-123',
        sanphamId: 'sp-456',
        newPrice: 12000,
        userId: 'user-1'
      })).rejects.toThrow('Banggiasanpham not found');
    });

    it('should warn on large price change (>50%)', async () => {
      // Arrange
      const oldPrice = 10000;
      const newPrice = 20000; // 100% increase

      const mockBgsp = {
        id: 'bgsp-1',
        giaban: oldPrice,
        banggia: { mabanggia: 'BG001', title: 'Bảng giá 1' },
        sanpham: { masp: 'SP001', title: 'Sản phẩm 1' }
      };

      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(mockBgsp);
      mockPrismaService.$transaction.mockImplementation(async (callback) => {
        return await callback(mockPrismaService);
      });

      const consoleSpy = jest.spyOn(console, 'warn');

      // Act
      await service.updatePrice({
        banggiaId: 'bg-123',
        sanphamId: 'sp-456',
        newPrice,
        userId: 'user-1'
      });

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️ Large price change detected')
      );
    });
  });

  describe('getPriceHistory', () => {
    it('should return price change history', async () => {
      // Arrange
      const mockBgsp = {
        id: 'bgsp-1',
        banggia: { mabanggia: 'BG001', title: 'Bảng giá 1' },
        sanpham: { masp: 'SP001', title: 'Sản phẩm 1' }
      };

      const mockAuditLogs = [
        {
          id: 'audit-1',
          action: 'UPDATE',
          oldValues: { giaban: 10000 },
          newValues: { giaban: 12000 },
          metadata: {
            reason: 'Price increase',
            priceChange: {
              oldPrice: 10000,
              newPrice: 12000,
              difference: 2000,
              percentChange: 20
            }
          },
          createdAt: new Date('2025-01-10'),
          userId: 'user-1',
          user: { id: 'user-1', email: 'admin@test.com', name: 'Admin' }
        }
      ];

      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(mockBgsp);
      mockPrismaService.auditLog.findMany.mockResolvedValue(mockAuditLogs);

      // Act
      const result = await service.getPriceHistory('bg-123', 'sp-456');

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].oldPrice).toBe(10000);
      expect(result[0].newPrice).toBe(12000);
      expect(result[0].reason).toBe('Price increase');
    });

    it('should return empty array when banggiasanpham not found', async () => {
      // Arrange
      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(null);

      // Act
      const result = await service.getPriceHistory('bg-123', 'sp-456');

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('getCurrentPrice', () => {
    it('should return current price', async () => {
      // Arrange
      const mockBgsp = {
        giaban: 12000
      };

      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(mockBgsp);

      // Act
      const result = await service.getCurrentPrice('bg-123', 'sp-456');

      // Assert
      expect(result).toBe(12000);
    });

    it('should return null when not found', async () => {
      // Arrange
      mockPrismaService.banggiasanpham.findFirst.mockResolvedValue(null);

      // Act
      const result = await service.getCurrentPrice('bg-123', 'sp-456');

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('bulkUpdatePrices', () => {
    it('should update multiple prices successfully', async () => {
      // Arrange
      const updates = [
        { banggiaId: 'bg-1', sanphamId: 'sp-1', newPrice: 10000 },
        { banggiaId: 'bg-1', sanphamId: 'sp-2', newPrice: 20000 }
      ];

      const updatePriceSpy = jest.spyOn(service, 'updatePrice')
        .mockResolvedValue({
          action: 'UPDATED',
          data: {},
          oldPrice: 9000,
          newPrice: 10000,
          changePercent: 11.11
        });

      // Act
      const result = await service.bulkUpdatePrices(updates, 'user-1');

      // Assert
      expect(result.successful).toBe(2);
      expect(result.failed).toBe(0);
      expect(updatePriceSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle partial failures', async () => {
      // Arrange
      const updates = [
        { banggiaId: 'bg-1', sanphamId: 'sp-1', newPrice: 10000 },
        { banggiaId: 'bg-1', sanphamId: 'sp-2', newPrice: 20000 }
      ];

      jest.spyOn(service, 'updatePrice')
        .mockResolvedValueOnce({
          action: 'UPDATED',
          data: {},
          oldPrice: 9000,
          newPrice: 10000,
          changePercent: 11.11
        })
        .mockRejectedValueOnce(new Error('Price not found'));

      // Act
      const result = await service.bulkUpdatePrices(updates, 'user-1');

      // Assert
      expect(result.successful).toBe(1);
      expect(result.failed).toBe(1);
      expect(result.errors).toHaveLength(1);
    });
  });
});
```

### Run Backend Tests

```bash
cd api

# Run all tests
npm test

# Run specific test file
npm test -- banggia-price-history.service.spec.ts

# Run with coverage
npm test -- --coverage

# Watch mode
npm test -- --watch
```

---

## 🎨 UNIT TESTS (FRONTEND)

### Test 2: PriceHistoryService

**File**: `/frontend/src/app/admin/banggia/price-history.service.spec.ts`

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PriceHistoryService } from './price-history.service';
import { StorageService } from '../../../shared/storage.service';

describe('PriceHistoryService', () => {
  let service: PriceHistoryService;
  let httpMock: HttpTestingController;
  let storageService: jasmine.SpyObj<StorageService>;

  beforeEach(() => {
    const storageServiceSpy = jasmine.createSpyObj('StorageService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PriceHistoryService,
        { provide: StorageService, useValue: storageServiceSpy }
      ]
    });

    service = TestBed.inject(PriceHistoryService);
    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService) as jasmine.SpyObj<StorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPriceHistory', () => {
    it('should fetch price history successfully', async () => {
      // Arrange
      const banggiaId = 'bg-123';
      const sanphamId = 'sp-456';
      const mockHistory = [
        {
          id: 'audit-1',
          action: 'UPDATE',
          oldPrice: 10000,
          newPrice: 12000,
          reason: 'Price increase',
          changedAt: new Date('2025-01-10')
        }
      ];

      storageService.getToken.and.returnValue('mock-token');

      // Act
      const promise = service.getPriceHistory(banggiaId, sanphamId);

      // Assert
      const req = httpMock.expectOne(
        `http://localhost:3000/banggia/${banggiaId}/sanpham/${sanphamId}/price-history`
      );
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

      req.flush(mockHistory);
      const result = await promise;
      expect(result).toEqual(mockHistory);
    });

    it('should handle error', async () => {
      // Arrange
      storageService.getToken.and.returnValue('mock-token');

      // Act
      const promise = service.getPriceHistory('bg-123', 'sp-456');

      // Assert
      const req = httpMock.expectOne(/price-history/);
      req.error(new ErrorEvent('Network error'), { status: 500 });

      await expectAsync(promise).toBeRejected();
    });
  });

  describe('verifyOrderPrices', () => {
    it('should verify order prices', async () => {
      // Arrange
      const donhangId = 'dh-123';
      const mockResult = {
        donhangId: 'dh-123',
        madonhang: 'TG-AA00001',
        totalItems: 5,
        discrepancies: [],
        hasDiscrepancies: false
      };

      storageService.getToken.and.returnValue('mock-token');

      // Act
      const promise = service.verifyOrderPrices(donhangId);

      // Assert
      const req = httpMock.expectOne(`http://localhost:3000/donhang/verify-prices/${donhangId}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockResult);
      const result = await promise;
      expect(result.hasDiscrepancies).toBe(false);
    });
  });
});
```

### Test 3: PriceHistoryDialogComponent

**File**: `/frontend/src/app/admin/banggia/price-history-dialog/price-history-dialog.component.spec.ts`

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PriceHistoryDialogComponent } from './price-history-dialog.component';
import { PriceHistoryService } from '../price-history.service';
import { of, throwError } from 'rxjs';

describe('PriceHistoryDialogComponent', () => {
  let component: PriceHistoryDialogComponent;
  let fixture: ComponentFixture<PriceHistoryDialogComponent>;
  let priceHistoryService: jasmine.SpyObj<PriceHistoryService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<PriceHistoryDialogComponent>>;

  const mockDialogData = {
    banggiaId: 'bg-123',
    sanphamId: 'sp-456',
    sanphamTitle: 'Rau xanh',
    banggiaTitle: 'Bảng giá bán'
  };

  beforeEach(async () => {
    const priceHistoryServiceSpy = jasmine.createSpyObj('PriceHistoryService', ['getPriceHistory']);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [PriceHistoryDialogComponent],
      providers: [
        { provide: PriceHistoryService, useValue: priceHistoryServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockDialogData }
      ]
    }).compileComponents();

    priceHistoryService = TestBed.inject(PriceHistoryService) as jasmine.SpyObj<PriceHistoryService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<PriceHistoryDialogComponent>>;

    fixture = TestBed.createComponent(PriceHistoryDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load price history on init', async () => {
    // Arrange
    const mockHistory = [
      {
        id: 'audit-1',
        action: 'UPDATE',
        oldPrice: 10000,
        newPrice: 12000,
        difference: 2000,
        percentChange: 20,
        changedAt: new Date('2025-01-10'),
        reason: 'Price increase'
      }
    ];

    priceHistoryService.getPriceHistory.and.returnValue(Promise.resolve(mockHistory));

    // Act
    await component.ngOnInit();

    // Assert
    expect(component.loading()).toBe(false);
    expect(component.priceHistory()).toEqual(mockHistory);
    expect(component.error()).toBeNull();
  });

  it('should handle error when loading fails', async () => {
    // Arrange
    priceHistoryService.getPriceHistory.and.returnValue(
      Promise.reject(new Error('Network error'))
    );

    // Act
    await component.ngOnInit();

    // Assert
    expect(component.loading()).toBe(false);
    expect(component.error()).toBe('Network error');
  });

  it('should format price correctly', () => {
    // Act
    const formatted = component.formatPrice(12000);

    // Assert
    expect(formatted).toContain('12.000');
    expect(formatted).toContain('₫');
  });

  it('should get correct price change class', () => {
    // Assert
    expect(component.getPriceChangeClass({ difference: 2000 } as any)).toBe('price-increase');
    expect(component.getPriceChangeClass({ difference: -2000 } as any)).toBe('price-decrease');
    expect(component.getPriceChangeClass({ difference: 0 } as any)).toBe('price-no-change');
  });

  it('should close dialog when close button clicked', () => {
    // Act
    component.close();

    // Assert
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
```

### Run Frontend Tests

```bash
cd frontend

# Run all tests
ng test

# Run with coverage
ng test --code-coverage

# Run headless
ng test --browsers=ChromeHeadless --watch=false
```

---

## 🔗 INTEGRATION TESTS

### Test 4: End-to-End API Flow

**File**: `/api/test/price-history-e2e.spec.ts`

```typescript
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Price History E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    // Login to get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Price Update Flow', () => {
    it('should update price and create audit log', async () => {
      // 1. Get current price
      const banggia = await prisma.banggia.findFirst();
      const sanpham = await prisma.sanpham.findFirst();

      const currentPriceResponse = await request(app.getHttpServer())
        .get(`/banggia/${banggia.id}/sanpham/${sanpham.id}/current-price`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const oldPrice = currentPriceResponse.body;

      // 2. Update price
      const newPrice = oldPrice + 1000;
      await request(app.getHttpServer())
        .patch(`/banggia/${banggia.id}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          sanpham: [
            {
              sanphamId: sanpham.id,
              giaban: newPrice
            }
          ]
        })
        .expect(200);

      // 3. Verify audit log created
      const auditLog = await prisma.auditLog.findFirst({
        where: {
          entityName: 'Banggiasanpham',
          action: 'UPDATE'
        },
        orderBy: { createdAt: 'desc' }
      });

      expect(auditLog).toBeDefined();
      expect(auditLog.oldValues['giaban']).toBe(oldPrice);
      expect(auditLog.newValues['giaban']).toBe(newPrice);

      // 4. Get price history
      const historyResponse = await request(app.getHttpServer())
        .get(`/banggia/${banggia.id}/sanpham/${sanpham.id}/price-history`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(historyResponse.body.length).toBeGreaterThan(0);
      expect(historyResponse.body[0].newPrice).toBe(newPrice);
    });
  });

  describe('Order Price Verification Flow', () => {
    it('should detect price discrepancies', async () => {
      // 1. Create order with current prices
      // 2. Update prices
      // 3. Verify order prices
      // 4. Check discrepancies
      // ... implementation
    });
  });
});
```

---

## 🎭 E2E TESTS (PLAYWRIGHT)

### Setup Playwright

```bash
cd /chikiet/kataoffical/rausachfinal

# Install Playwright
npm init playwright@latest

# Directory: e2e
# Use TypeScript: yes
# Add GitHub Actions: no (optional)
```

### Test 5: Price History User Flow

**File**: `/e2e/price-history.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Price History Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://rausachtrangia.com/login');
    await page.fill('input[name="email"]', 'admin@test.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/dashboard');
  });

  test('should display price history dialog', async ({ page }) => {
    // Navigate to banggia detail
    await page.goto('https://rausachtrangia.com/admin/banggia/detail/bg-123');

    // Click history button for first product
    await page.click('[data-testid="price-history-btn"]');

    // Verify dialog opened
    await expect(page.locator('mat-dialog-container')).toBeVisible();
    await expect(page.locator('h2:has-text("Lịch Sử Giá")')).toBeVisible();

    // Verify timeline displayed
    await expect(page.locator('.timeline-item')).toHaveCount.greaterThan(0);

    // Check price change details
    const firstChange = page.locator('.timeline-item').first();
    await expect(firstChange.locator('.old-price')).toBeVisible();
    await expect(firstChange.locator('.new-price')).toBeVisible();
  });

  test('should navigate to bulk price update', async ({ page }) => {
    await page.goto('https://rausachtrangia.com/admin/banggia/detail/bg-123');
    await page.click('[data-testid="bulk-upload-btn"]');

    await expect(page).toHaveURL('**/bulk-price-update');
    await expect(page.locator('h1:has-text("Cập Nhật Giá Hàng Loạt")')).toBeVisible();
  });

  test('should verify order prices', async ({ page }) => {
    await page.goto('https://rausachtrangia.com/admin/donhang/detail/dh-123');

    // Click verify button
    await page.click('button:has-text("Kiểm tra giá")');

    // Wait for verification to complete
    await page.waitForSelector('.verification-results');

    // Check status
    const status = await page.locator('.verification-status').textContent();
    expect(status).toContain('Tất cả giá đều chính xác');
  });
});
```

### Run E2E Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test
npx playwright test price-history

# Run in headed mode (see browser)
npx playwright test --headed

# Run in debug mode
npx playwright test --debug

# Generate report
npx playwright show-report
```

---

## ⚡ PERFORMANCE TESTS

### Test 6: Load Testing

**File**: `/api/test/load-test.ts`

```typescript
import autocannon from 'autocannon';

async function runLoadTest() {
  const result = await autocannon({
    url: 'http://localhost:3000/banggia/price-history',
    connections: 10,
    duration: 30,
    headers: {
      'Authorization': 'Bearer your-token-here'
    }
  });

  console.log('Load Test Results:');
  console.log(`Requests: ${result.requests.total}`);
  console.log(`Throughput: ${result.throughput.total}`);
  console.log(`Latency: ${result.latency.mean}ms`);
  console.log(`Errors: ${result.errors}`);
}

runLoadTest();
```

### Database Performance Test

```sql
-- Test query performance
EXPLAIN ANALYZE
SELECT * FROM "AuditLog"
WHERE "entityName" = 'Banggiasanpham'
  AND "entityId" = 'bgsp-123'
ORDER BY "createdAt" DESC
LIMIT 100;

-- Should see:
-- Execution Time: < 50ms
-- Index usage: YES
```

---

## 📊 TEST COVERAGE REPORTS

### Generate Coverage Report

```bash
# Backend
cd api
npm test -- --coverage
open coverage/lcov-report/index.html

# Frontend
cd frontend
ng test --code-coverage --watch=false
open coverage/index.html
```

### Coverage Goals

| Component | Target | Priority |
|-----------|--------|----------|
| BanggiaPriceHistoryService | 90%+ | High |
| DonhangService (price methods) | 80%+ | High |
| PriceHistoryService (frontend) | 80%+ | Medium |
| Components | 70%+ | Medium |
| Integration flows | 80%+ | High |

---

## ✅ TEST EXECUTION CHECKLIST

### Daily (During Development)
- [ ] Run unit tests before commit
- [ ] Fix failing tests immediately
- [ ] Maintain >80% coverage

### Before Deployment
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] E2E tests passing
- [ ] Performance tests acceptable
- [ ] No console errors
- [ ] Coverage report reviewed

### After Deployment
- [ ] Smoke tests on production
- [ ] Monitor error rates
- [ ] Check performance metrics

---

**Prepared by**: AI Assistant  
**Last Updated**: 16/10/2025  
**Total Test Files**: 6 recommended  
**Estimated Time**: 2-3 days
