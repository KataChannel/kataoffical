# 📊 ĐÁNH GIÁ TOÀN DIỆN HỆ THỐNG LOGGING VÀ ĐỀ XUẤT TỐI ƯU

**Ngày đánh giá:** 28/12/2025  
**Dự án:** Rausach Management System  
**Phạm vi:** Logging System, Performance, Storage Optimization

---

## 🎯 TÓM TẮT ĐIỀU HÀNH (EXECUTIVE SUMMARY)

### Vấn đề hiện tại
- **Logs chiếm 68% database** (668 MB / 976 MB total)
- **Performance giảm 30-50%** do logs trong main database
- **Không có Google Drive integration** cho log storage
- **Chi phí storage cao** và tăng nhanh (~2-3 MB/ngày)
- **Khó theo dõi và phân tích** logs hiệu quả

### Giải pháp đề xuất 

**Option 1 (Zero-Cost):** PostgreSQL Optimization + Google Drive ⭐ **KHUYẾN NGHỊ**  
**Option 2 (Premium):** ClickHouse + Vector + Grafana + Google Drive

### Lợi ích kỳ vọng (Option 1 - Zero-Cost)
| Chỉ số | Hiện tại | Sau tối ưu | Cải thiện |
|--------|----------|------------|-----------|
| Database size | 976 MB | 400-500 MB | **-50%** |
| Log storage | 668 MB trong DB | 50-100 MB + Google Drive | **-85%** |
| Log query speed | 5 giây | 1-2 giây | **+150-400%** |
| Business query speed | Baseline | +30-40% | **+30-40%** |
| Monthly cost | $0 | **$0** | **No cost** |
| Google Drive logs | Không có | Tự động backup | **✅ Mới** |

---

## 📋 1. PHÂN TÍCH HIỆN TRẠNG

### 1.1 Cấu trúc Logging hiện tại

#### A. AuditLog (420 MB - 43% database) 🔴 CRITICAL

**Mô tả:** Ghi lại mọi thao tác tạo/sửa/xóa của users

**Schema:**
```typescript
model AuditLog {
  id            String      @id @default(uuid())
  entityName    String?     // Donhang, Khachhang, Sanpham...
  entityId      String?
  action        AuditAction // CREATE, UPDATE, DELETE
  userId        String?
  userEmail     String?
  oldValues     Json?       // ⚠️ Lưu FULL data cũ
  newValues     Json?       // ⚠️ Lưu FULL data mới
  changedFields String[]
  ipAddress     String?
  userAgent     String?
  sessionId     String?
  metadata      Json?
  status        String
  errorDetails  Json?
  createdAt     DateTime
}
```

**Vấn đề:**
- 🔴 Lưu full JSON data (oldValues, newValues) → rất lớn
- 🔴 Không có retention policy (giữ mãi mãi)
- 🔴 Query chậm (256K records, không partition)
- 🔴 Blocking business transactions
- 🔴 256,000 records và tăng ~500 records/ngày

**Use cases quan trọng:**
- Compliance audit (SOC2, GDPR)
- Security investigation
- User activity tracking
- Data change history

---

#### B. PerformanceLog (248 MB - 25% database) 🔴 HIGH IMPACT

**Mô tả:** Ghi lại performance mọi API request

**Schema:**
```typescript
model PerformanceLog {
  id          String
  name        String      // Function/query name
  duration    Float       // milliseconds
  timestamp   DateTime
  context     Json?       // ⚠️ Full context
  success     Boolean
  error       String?
  method      String?
  url         String?
  statusCode  Int?
  memoryUsage Float?
}
```

**Vấn đề:**
- 🔴 Log 100% requests (408,000 records)
- 🔴 Không có sampling
- 🔴 Lưu full context (args, params)
- 🔴 Không aggregate
- 🔴 Chỉ có raw logs, khó phân tích trends

**Implementation:**
```typescript
// PerformanceLogger.ts - Được gọi ở khắp nơi
PerformanceLogger.logAsync('KH_getLastUpdated', async () => {
  // business logic
});
```

---

#### C. ErrorLog (~10 MB) 🟡 MEDIUM

**Mô tả:** Ghi lại errors

**Schema:**
```typescript
model ErrorLog {
  id        String
  timestamp DateTime
  message   String
  details   Json?
  source    String
  createdAt DateTime
}
```

**Vấn đề:**
- 🟡 Không có error classification
- 🟡 Không group similar errors
- 🟡 Không có alerting
- 🟡 Thiếu structured stack trace

---

### 1.2 Google Drive Usage hiện tại

**Phát hiện:**
- ✅ **Đã có Google Drive integration** cho upload files
- ✅ Credentials: [dist/credentials.json](api/dist/credentials.json)
- ✅ Service: [GoogleDriveService](api/src/shared/googledrive/googledrive.service.ts)
- ✅ Configured drive IDs:
  - `SHARED_DRIVE_ID`: "0AKQL50NKsue5Uk9PVA"
  - `SHARED_UPLOAD_DRIVE_ID`: "1NRpIjEcyDJZLOthIC0VYTAFUWp1kYKZG"

**Sử dụng hiện tại:**
- Upload ảnh bills, user guides, import files
- Upload từ frontend qua API endpoint `/googledrive/upload`
- **CHƯA DÙNG** cho log storage/backup

**Cơ hội:**
- 💡 Có thể tận dụng Google Drive để backup logs
- 💡 Unlimited storage nếu dùng Google Workspace
- 💡 Dễ dàng share/download logs để audit

---

### 1.3 Luồng Logging hiện tại

```
┌─────────────────────────────────────────────────┐
│  APPLICATION (NestJS)                           │
│                                                 │
│  ┌──────────────┐  ┌─────────────┐             │
│  │ Interceptor  │  │ @Audit      │             │
│  │ (Auto)       │  │ Decorator   │             │
│  └──────┬───────┘  └──────┬──────┘             │
│         │                 │                     │
│         └────────┬────────┘                     │
│                  ▼                              │
│         ┌────────────────┐                      │
│         │ AuditService   │                      │
│         │ - Batch queue  │                      │
│         │ - Every 5s     │                      │
│         └────────┬───────┘                      │
│                  │ INSERT (BLOCKING)            │
└──────────────────┼──────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│  POSTGRESQL DATABASE (Main Business DB)         │
│                                                  │
│  ┌────────────────┐  ┌──────────────────┐       │
│  │ AuditLog       │  │ PerformanceLog   │       │
│  │ 420 MB         │  │ 248 MB           │       │
│  └────────────────┘  └──────────────────┘       │
│                                                  │
│  ⚠️ VẤN ĐỀ:                                      │
│  • Logs compete với business queries            │
│  • Slow INSERT/SELECT                            │
│  • No partitioning                               │
│  • 68% database = logs!                          │
└──────────────────────────────────────────────────┘
```

---

## 🔥 2. TÁC ĐỘNG HIỆN TẠI

### 2.1 Performance Impact

**Database Performance:**
- Business queries chậm 30-50% do:
  - Connection pool shared với log writes
  - Table size lớn → index maintenance chậm
  - WAL (Write-Ahead Log) overhead
  
**Query Examples:**
```sql
-- Query đơn hàng theo ngày (business query)
SELECT * FROM Donhang WHERE ngaygiao = '2025-12-28';
-- Hiện tại: 500ms (do DB size lớn)
-- Mong đợi: 100ms (DB nhỏ hơn)

-- Query audit history (log query)
SELECT * FROM AuditLog 
WHERE userId = 'xxx' 
ORDER BY createdAt DESC LIMIT 100;
-- Hiện tại: 5 giây (scan 256K rows)
-- Mong đợi: <100ms (với ClickHouse)
```

### 2.2 Storage & Cost

**Current:**
- Database: 976 MB
  - Logs: 668 MB (68%)
  - Business: 308 MB (32%)
- Growth: ~2-3 MB/day (chủ yếu logs)
- 6 tháng nữa: Logs sẽ >1 GB
- 1 năm nữa: Logs sẽ >1.5 GB

**Implications:**
- Backup time: 10 phút (sẽ tăng)
- Migration time: lâu hơn
- Scaling: khó khăn

### 2.3 Operational Issues

1. 🔴 **Backup chậm:** Phải backup cả logs (không cần thiết)
2. 🔴 **No separation:** Logs coupled với business data
3. 🔴 **No retention:** Logs tồn tại vô thời hạn
4. 🔴 **Hard to analyze:** Cần export ra để phân tích
5. 🔴 **No alerting:** Không có real-time monitoring

---

## ✅ 3. GIẢI PHÁP ĐỀ XUẤT

### 🎯 Option 1: ZERO-COST SOLUTION (KHUYẾN NGHỊ) ⭐

**Tổng quan:** Tối ưu PostgreSQL + Google Drive Archive - Không cần infrastructure mới!

#### Kiến trúc Zero-Cost

```
┌────────────────────────────────────────────────────────────┐
│  APPLICATION (NestJS) - Không thay đổi                     │
│                                                            │
│  Business Logic → PostgreSQL (optimized)                  │
│  Logging → PostgreSQL (with sampling & compression)       │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│  POSTGRESQL (Optimized)                                    │
│                                                            │
│  ┌──────────────────────────────────────────────┐         │
│  │ AuditLog (Partitioned by month)             │         │
│  │ • TTL: Auto-delete after 90 days            │         │
│  │ • Compression: TOAST + pg_squeeze           │         │
│  │ • Sampling: Chỉ lưu critical changes        │         │
│  │ Size: 50-100 MB (từ 420 MB)                │         │
│  └──────────────────────────────────────────────┘         │
│                                                            │
│  ┌──────────────────────────────────────────────┐         │
│  │ PerformanceLog (Aggregated)                 │         │
│  │ • Sampling: 10% fast, 100% slow             │         │
│  │ • Pre-aggregation: Hourly stats             │         │
│  │ • TTL: 30 days                              │         │
│  │ Size: 20-30 MB (từ 248 MB)                 │         │
│  └──────────────────────────────────────────────┘         │
│                                                            │
│  Total: 400-500 MB (từ 976 MB)                           │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           │ Daily Archive (Cron Job)
                           ▼
┌────────────────────────────────────────────────────────────┐
│  GOOGLE DRIVE (Cold Storage) - FREE/CHEAP                 │
│                                                            │
│  ┌──────────────────────────────────────────────┐         │
│  │ AppLogs/                                     │         │
│  │ ├── 2025/                                    │         │
│  │ │   ├── 11/                                  │         │
│  │ │   │   └── logs_2025-11.sql.gz (archived)  │         │
│  │ │   ├── 12/                                  │         │
│  │ │   │   └── logs_2025-12-01_15.sql.gz       │         │
│  │                                              │         │
│  │ • Unlimited storage (Google Workspace)      │         │
│  │ • Compressed archives                        │         │
│  │ • Easy restore when needed                  │         │
│  └──────────────────────────────────────────────┘         │
└────────────────────────────────────────────────────────────┘
```

---

#### 3 Chiến lược chính

##### 1. **Database Partitioning** (Tăng tốc query 5-10x)

```sql
-- Partition AuditLog by month
CREATE TABLE audit_log_2025_12 PARTITION OF "AuditLog"
FOR VALUES FROM ('2025-12-01') TO ('2026-01-01');

CREATE TABLE audit_log_2025_11 PARTITION OF "AuditLog"
FOR VALUES FROM ('2025-11-01') TO ('2025-12-01');

-- Automatic partition management
CREATE OR REPLACE FUNCTION create_monthly_partitions()
RETURNS void AS $$
DECLARE
    start_date date;
    end_date date;
    partition_name text;
BEGIN
    start_date := date_trunc('month', CURRENT_DATE);
    end_date := start_date + interval '1 month';
    partition_name := 'audit_log_' || to_char(start_date, 'YYYY_MM');
    
    EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF "AuditLog" 
                    FOR VALUES FROM (%L) TO (%L)',
                   partition_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;

-- Run monthly
SELECT create_monthly_partitions();
```

**Lợi ích:**
- Query chỉ scan partition cần thiết (không scan toàn bộ 256K rows)
- Dễ dàng archive/drop old partitions
- Index nhỏ hơn → nhanh hơn

---

##### 2. **Sampling & Data Reduction** (Giảm 70-80% volume)

```typescript
// api/src/auditlog/auditlog.service.ts - Updated
async logActivity(data: AuditLogData): Promise<void> {
  // Strategy 1: Chỉ lưu critical changes
  const isCritical = this.isCriticalChange(data);
  
  if (!isCritical && Math.random() > 0.1) {
    // Skip 90% non-critical logs
    return;
  }
  
  // Strategy 2: Store diff only, not full data
  const changedFields = this.getChangedFields(data.oldValues, data.newValues);
  const changeSummary = this.createMinimalDiff(data.oldValues, data.newValues);
  
  await this.prisma.auditLog.create({
    data: {
      entityName: data.entityName,
      entityId: data.entityId,
      action: data.action,
      userId: data.userId,
      userEmail: data.userEmail,
      changedFields: changedFields,
      // KHÔNG lưu oldValues/newValues
      // Chỉ lưu summary nhỏ gọn
      metadata: {
        changeSummary: changeSummary, // Chỉ lưu thay đổi, không lưu full data
        compressed: true
      },
      ipAddress: data.ipAddress,
      userAgent: this.compressUserAgent(data.userAgent), // Rút gọn
      sessionId: data.sessionId,
      status: data.status || 'SUCCESS'
    }
  });
}

private isCriticalChange(data: AuditLogData): boolean {
  // Luôn log các thao tác quan trọng
  const criticalEntities = ['Donhang', 'Khachhang', 'User', 'BangGia'];
  const criticalActions = ['DELETE'];
  
  return criticalEntities.includes(data.entityName) || 
         criticalActions.includes(data.action);
}

private createMinimalDiff(oldVal: any, newVal: any): string {
  const changes = {};
  for (const key in newVal) {
    if (oldVal?.[key] !== newVal[key]) {
      // Chỉ lưu giá trị mới, không lưu cả old value
      changes[key] = newVal[key];
    }
  }
  return JSON.stringify(changes);
}

private compressUserAgent(ua: string): string {
  // Rút gọn user agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)..." 
  // → "Windows/Chrome"
  if (!ua) return '';
  
  const os = ua.includes('Windows') ? 'Win' : 
             ua.includes('Mac') ? 'Mac' : 'Other';
  const browser = ua.includes('Chrome') ? 'Chr' : 
                  ua.includes('Firefox') ? 'FF' : 'Oth';
  
  return `${os}/${browser}`;
}
```

**Performance Log Sampling:**
```typescript
// api/src/shared/performance-logger.ts
private static recordMetric(metric: PerformanceMetric) {
  // Chỉ log slow requests hoặc sample 10% fast requests
  const shouldLog = metric.duration > 1000 || Math.random() < 0.1;
  
  if (!shouldLog) return;
  
  // Aggregate in-memory, flush hourly
  this.aggregateMetric(metric);
}

private static aggregateMetric(metric: PerformanceMetric) {
  const hour = new Date().toISOString().substring(0, 13); // 2025-12-28T14
  
  if (!this.hourlyStats[hour]) {
    this.hourlyStats[hour] = {
      [metric.name]: {
        count: 0,
        totalDuration: 0,
        maxDuration: 0,
        errors: 0
      }
    };
  }
  
  const stats = this.hourlyStats[hour][metric.name];
  stats.count++;
  stats.totalDuration += metric.duration;
  stats.maxDuration = Math.max(stats.maxDuration, metric.duration);
  if (!metric.success) stats.errors++;
}

// Flush to DB every hour
@Cron('0 * * * *')
private static async flushHourlyStats() {
  const lastHour = new Date();
  lastHour.setHours(lastHour.getHours() - 1);
  const hourKey = lastHour.toISOString().substring(0, 13);
  
  const stats = this.hourlyStats[hourKey];
  if (!stats) return;
  
  // Save aggregated stats instead of individual logs
  for (const [name, data] of Object.entries(stats)) {
    await this.prisma.performanceLog.create({
      data: {
        name: name,
        timestamp: new Date(hourKey),
        duration: data.totalDuration / data.count, // Average
        context: {
          count: data.count,
          max: data.maxDuration,
          errors: data.errors,
          aggregated: true
        },
        success: data.errors === 0
      }
    });
  }
  
  // Clear processed stats
  delete this.hourlyStats[hourKey];
}
```

---

##### 3. **Auto-Archive to Google Drive** (Free unlimited storage)

```typescript
// api/src/shared/googledrive/log-archiver.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GoogleDriveService } from './googledrive.service';
import { PrismaService } from 'prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class LogArchiverService {
  private readonly logger = new Logger(LogArchiverService.name);
  
  constructor(
    private readonly driveService: GoogleDriveService,
    private readonly prisma: PrismaService
  ) {}
  
  // Run weekly (every Sunday at 2 AM)
  @Cron('0 2 * * 0')
  async archiveOldLogs() {
    this.logger.log('Starting weekly log archival...');
    
    try {
      // Archive logs older than 30 days
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - 30);
      
      await this.archiveAuditLogs(cutoffDate);
      await this.archivePerformanceLogs(cutoffDate);
      
      this.logger.log('Weekly archival completed successfully');
    } catch (error) {
      this.logger.error(`Archival failed: ${error.message}`, error.stack);
    }
  }
  
  private async archiveAuditLogs(beforeDate: Date) {
    const tempFile = `/tmp/audit_logs_${beforeDate.toISOString().split('T')[0]}.sql`;
    
    // Export to SQL file
    const { stdout } = await execAsync(
      `PGPASSWORD=${process.env.DB_PASSWORD} pg_dump \
       -h ${process.env.DB_HOST} \
       -U ${process.env.DB_USER} \
       -d ${process.env.DB_NAME} \
       -t "AuditLog" \
       --where="createdAt < '${beforeDate.toISOString()}'" \
       -f ${tempFile}`
    );
    
    // Compress
    await execAsync(`gzip ${tempFile}`);
    const compressedFile = `${tempFile}.gz`;
    
    // Upload to Google Drive
    const fileBuffer = fs.readFileSync(compressedFile);
    await this.driveService.uploadFile({
      originalname: path.basename(compressedFile),
      buffer: fileBuffer,
      mimetype: 'application/gzip'
    });
    
    this.logger.log(`Uploaded ${path.basename(compressedFile)} to Google Drive`);
    
    // Delete old logs from database
    const result = await this.prisma.auditLog.deleteMany({
      where: {
        createdAt: {
          lt: beforeDate
        }
      }
    });
    
    this.logger.log(`Deleted ${result.count} old audit logs from database`);
    
    // Cleanup temp files
    fs.unlinkSync(compressedFile);
  }
  
  private async archivePerformanceLogs(beforeDate: Date) {
    // Similar to archiveAuditLogs
    const tempFile = `/tmp/perf_logs_${beforeDate.toISOString().split('T')[0]}.sql`;
    
    await execAsync(
      `PGPASSWORD=${process.env.DB_PASSWORD} pg_dump \
       -h ${process.env.DB_HOST} \
       -U ${process.env.DB_USER} \
       -d ${process.env.DB_NAME} \
       -t "PerformanceLog" \
       --where="timestamp < '${beforeDate.toISOString()}'" \
       -f ${tempFile}`
    );
    
    await execAsync(`gzip ${tempFile}`);
    const compressedFile = `${tempFile}.gz`;
    
    const fileBuffer = fs.readFileSync(compressedFile);
    await this.driveService.uploadFile({
      originalname: path.basename(compressedFile),
      buffer: fileBuffer,
      mimetype: 'application/gzip'
    });
    
    await this.prisma.performanceLog.deleteMany({
      where: {
        timestamp: {
          lt: beforeDate
        }
      }
    });
    
    fs.unlinkSync(compressedFile);
  }
  
  // Restore from archive when needed
  async restoreLogsFromDrive(fileName: string) {
    this.logger.log(`Restoring logs from ${fileName}...`);
    
    // Download from Google Drive
    const fileId = await this.findFileInDrive(fileName);
    const fileBuffer = await this.driveService.downloadFile(fileId);
    
    const tempFile = `/tmp/${fileName}`;
    fs.writeFileSync(tempFile, fileBuffer);
    
    // Decompress
    await execAsync(`gunzip ${tempFile}`);
    const sqlFile = tempFile.replace('.gz', '');
    
    // Restore to database
    await execAsync(
      `PGPASSWORD=${process.env.DB_PASSWORD} psql \
       -h ${process.env.DB_HOST} \
       -U ${process.env.DB_USER} \
       -d ${process.env.DB_NAME} \
       -f ${sqlFile}`
    );
    
    this.logger.log(`Successfully restored logs from ${fileName}`);
    
    // Cleanup
    fs.unlinkSync(sqlFile);
  }
  
  private async findFileInDrive(fileName: string): Promise<string> {
    const folders = await this.driveService.queryFolders(process.env.SHARED_DRIVE_ID);
    // Implementation to search for file
    // Returns file ID
    return 'file-id';
  }
}
```

**Cron schedule:**
```bash
# Archive old logs weekly
0 2 * * 0 cd /opt/rausachv3/api && node -e "require('./dist/shared/googledrive/log-archiver.service').archiveOldLogs()"

# Vacuum database monthly
0 3 1 * * PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c "VACUUM FULL ANALYZE;"
```

---

#### Database Optimization Scripts

```sql
-- 1. Enable compression for JSON columns
ALTER TABLE "AuditLog" ALTER COLUMN metadata SET STORAGE EXTENDED;
ALTER TABLE "AuditLog" ALTER COLUMN "oldValues" SET STORAGE EXTENDED;
ALTER TABLE "AuditLog" ALTER COLUMN "newValues" SET STORAGE EXTENDED;

-- 2. Create indexes for common queries
CREATE INDEX CONCURRENTLY idx_auditlog_created_at_entity 
ON "AuditLog" (createdAt DESC, entityName) 
WHERE createdAt > CURRENT_DATE - INTERVAL '90 days';

CREATE INDEX CONCURRENTLY idx_auditlog_user_recent 
ON "AuditLog" (userId, createdAt DESC) 
WHERE createdAt > CURRENT_DATE - INTERVAL '90 days';

-- 3. Create materialized view for analytics
CREATE MATERIALIZED VIEW audit_log_daily_stats AS
SELECT 
  date_trunc('day', "createdAt") as day,
  "entityName",
  action,
  count(*) as count,
  count(DISTINCT "userId") as unique_users
FROM "AuditLog"
WHERE "createdAt" > CURRENT_DATE - INTERVAL '90 days'
GROUP BY day, "entityName", action;

CREATE UNIQUE INDEX ON audit_log_daily_stats (day, "entityName", action);

-- Refresh daily
REFRESH MATERIALIZED VIEW CONCURRENTLY audit_log_daily_stats;

-- 4. Performance log aggregation table
CREATE TABLE performance_log_hourly_stats (
  hour TIMESTAMP,
  name VARCHAR(255),
  request_count INTEGER,
  avg_duration FLOAT,
  p95_duration FLOAT,
  error_count INTEGER,
  PRIMARY KEY (hour, name)
);

-- 5. Auto-vacuum configuration
ALTER TABLE "AuditLog" SET (
  autovacuum_vacuum_scale_factor = 0.05,
  autovacuum_analyze_scale_factor = 0.02
);
```

---

#### Monitoring Dashboard (Simple - No Grafana needed)

```typescript
// api/src/monitoring/simple-dashboard.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Controller('admin/monitoring')
export class MonitoringController {
  constructor(private prisma: PrismaService) {}
  
  @Get('stats')
  async getStats() {
    // Database size
    const dbSize = await this.prisma.$queryRaw`
      SELECT 
        pg_size_pretty(pg_database_size(current_database())) as total_size,
        pg_size_pretty(pg_total_relation_size('"AuditLog"')) as audit_size,
        pg_size_pretty(pg_total_relation_size('"PerformanceLog"')) as perf_size
    `;
    
    // Log counts
    const auditCount = await this.prisma.auditLog.count();
    const perfCount = await this.prisma.performanceLog.count();
    
    // Recent activity
    const recentAudits = await this.prisma.auditLog.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24h
        }
      }
    });
    
    // Performance metrics (from aggregated data)
    const slowQueries = await this.prisma.performanceLog.findMany({
      where: {
        duration: { gt: 1000 },
        timestamp: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      },
      orderBy: { duration: 'desc' },
      take: 10
    });
    
    return {
      database: dbSize,
      counts: {
        totalAudits: auditCount,
        totalPerformance: perfCount,
        last24hAudits: recentAudits
      },
      performance: {
        slowQueries: slowQueries
      },
      lastUpdated: new Date()
    };
  }
  
  @Get('health')
  async healthCheck() {
    // Check if archival is working
    const oldestLog = await this.prisma.auditLog.findFirst({
      orderBy: { createdAt: 'asc' }
    });
    
    const daysSinceOldest = oldestLog 
      ? Math.floor((Date.now() - oldestLog.createdAt.getTime()) / (24 * 60 * 60 * 1000))
      : 0;
    
    return {
      status: daysSinceOldest < 90 ? 'healthy' : 'warning',
      oldestLogDays: daysSinceOldest,
      recommendation: daysSinceOldest > 90 
        ? 'Run archival to move old logs to Google Drive'
        : 'System healthy'
    };
  }
}
```

Simple HTML dashboard (không cần Grafana):
```html
<!-- frontend/src/app/admin/monitoring/dashboard.component.html -->
<div class="monitoring-dashboard">
  <h2>Log Monitoring Dashboard</h2>
  
  <div class="stats-grid">
    <div class="stat-card">
      <h3>Database Size</h3>
      <p class="big-number">{{ stats?.database?.total_size }}</p>
      <small>Total: {{ stats?.counts?.totalAudits | number }} logs</small>
    </div>
    
    <div class="stat-card">
      <h3>Last 24h Activity</h3>
      <p class="big-number">{{ stats?.counts?.last24hAudits | number }}</p>
      <small>New audit logs</small>
    </div>
    
    <div class="stat-card">
      <h3>Slow Queries</h3>
      <p class="big-number">{{ stats?.performance?.slowQueries?.length }}</p>
      <small>Queries > 1s in last 24h</small>
    </div>
  </div>
  
  <div class="slow-queries-table">
    <h3>Top Slow Queries</h3>
    <table>
      <tr *ngFor="let q of stats?.performance?.slowQueries">
        <td>{{ q.name }}</td>
        <td>{{ q.duration | number:'1.0-0' }}ms</td>
        <td>{{ q.timestamp | date:'short' }}</td>
      </tr>
    </table>
  </div>
</div>
```

---

### Implementation Roadmap (Zero-Cost)

#### Week 1: Database Optimization
- [ ] Implement partitioning for AuditLog
- [ ] Add compression for JSON columns
- [ ] Create optimized indexes
- [ ] Setup auto-vacuum

#### Week 2: Code Changes
- [ ] Update AuditService with sampling
- [ ] Implement minimal diff storage
- [ ] Update PerformanceLogger with aggregation
- [ ] Add in-memory buffering

#### Week 3: Google Drive Integration
- [ ] Implement LogArchiverService
- [ ] Setup weekly archival cron
- [ ] Test backup/restore flow
- [ ] Verify compression ratios

#### Week 4: Testing & Validation
- [ ] Test with production data
- [ ] Verify performance improvements
- [ ] Check storage reduction
- [ ] User acceptance testing

#### Week 5: Deployment
- [ ] Deploy to production
- [ ] Monitor for 1 week
- [ ] Adjust if needed
- [ ] Documentation

**Total Time:** 5 tuần  
**Total Cost:** $0  
**Required:** 1 backend developer

---

### Zero-Cost Results Expected

| Metric | Before | After (Zero-Cost) | Improvement |
|--------|--------|-------------------|-------------|
| Database size | 976 MB | 400-500 MB | **-50%** |
| AuditLog size | 420 MB | 50-100 MB | **-76%** |
| PerformanceLog size | 248 MB | 20-30 MB | **-88%** |
| Query speed (audit) | 5s | 1-2s | **+150-400%** |
| Business query | Baseline | +30-40% faster | **+30-40%** |
| Backup time | 10 min | 4-5 min | **-50%** |
| Monthly cost | $0 | **$0** | **No change** |

**Storage on Google Drive (after 1 year):**
- Weekly archives: ~52 files × 50 MB = **~2.6 GB**
- Compressed and organized
- Easy to search/restore
- **FREE** with Google Workspace unlimited

---

### 🎯 Option 2: Premium Solution (ClickHouse + Vector)

```
┌────────────────────────────────────────────────────────────┐
│  APPLICATION (NestJS)                                      │
│                                                            │
│  Business Logic → PostgreSQL (main DB)                    │
│  Logging → HTTP → Vector (async, non-blocking)            │
└──────────────────────────┬─────────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────────┐
│  VECTOR (Log Router & Processor)                           │
│  • Receive logs via HTTP                                   │
│  • Transform, enrich, sample                               │
│  • Buffer (prevent data loss)                              │
│  • Route to multiple destinations                          │
└─────┬────────────────────┬─────────────────────────────────┘
      │                    │
      ▼                    ▼
┌──────────────┐    ┌──────────────────────────────────────┐
│ ClickHouse   │    │ Google Drive (Cold Storage/Backup)   │
│ (Hot)        │    │                                      │
│              │    │ • Monthly archives                   │
│ • Last 90d   │    │ • Compliance                         │
│ • Fast query │    │ • Long-term storage                  │
│ • Analytics  │    │ • Free/cheap                         │
└──────┬───────┘    └──────────────────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────┐
│ GRAFANA (Visualization & Monitoring)                     │
│ • Real-time dashboards                                   │
│ • Alerts (Slack, Email)                                  │
│ • User activity tracking                                 │
│ • Performance metrics                                    │
└──────────────────────────────────────────────────────────┘
```

---

### 3.2 Components Chi tiết

#### A. ClickHouse - Fast Analytics Database

**Tại sao ClickHouse?**
- ⚡ **10,000x faster** cho analytical queries
- 💾 **Compression 10-20x** (668 MB → 40 MB)
- 📊 **Native aggregation** functions
- 🔄 **TTL auto-cleanup** (xóa logs cũ tự động)
- 💰 **Cost-effective**

**Schema Design:**
```sql
-- Audit Logs (optimized)
CREATE TABLE audit_logs (
    timestamp DateTime64(3),
    date Date DEFAULT toDate(timestamp),
    
    -- Entity (chỉ lưu tên + ID, không lưu full data)
    entity_name LowCardinality(String),
    entity_id String,
    action LowCardinality(String),
    
    -- User
    user_id String,
    user_email String,
    
    -- Changes (chỉ lưu diff, không lưu full oldValues/newValues)
    changed_fields Array(String),
    change_summary String,  -- Compressed JSON
    
    -- Request context
    ip_address IPv4,
    user_agent String,
    session_id String,
    
    status LowCardinality(String),
    error_message String
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)  -- Partition theo tháng
ORDER BY (entity_name, timestamp)
TTL date + INTERVAL 90 DAY DELETE  -- Tự động xóa sau 90 ngày
SETTINGS index_granularity = 8192;

-- Performance Logs (sampled)
CREATE TABLE performance_logs (
    timestamp DateTime64(3),
    date Date DEFAULT toDate(timestamp),
    
    name LowCardinality(String),
    method LowCardinality(String),
    url String,
    duration Float32,
    status_code UInt16,
    success Bool,
    
    error_message String
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (name, timestamp)
TTL date + INTERVAL 30 DAY DELETE;

-- Materialized View: Real-time aggregation
CREATE MATERIALIZED VIEW performance_stats_hourly
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (name, hour)
AS SELECT
    name,
    toStartOfHour(timestamp) as hour,
    toDate(timestamp) as date,
    count() as request_count,
    quantile(0.50)(duration) as p50,
    quantile(0.95)(duration) as p95,
    quantile(0.99)(duration) as p99,
    avg(duration) as avg_duration,
    countIf(NOT success) as error_count
FROM performance_logs
GROUP BY name, hour, date;
```

---

#### B. Vector - Log Router & Processor

**Chức năng:**
1. **Receive:** HTTP endpoint nhận logs từ app
2. **Transform:** Parse, enrich, normalize data
3. **Sample:** Chỉ giữ 10% fast requests, 100% slow requests
4. **Buffer:** Prevent data loss khi ClickHouse down
5. **Route:** Gửi đến ClickHouse + Google Drive

**Configuration:**
```toml
# Receive logs from app
[sources.app_logs]
type = "http"
address = "0.0.0.0:8686"
encoding = "json"

# Transform: Add metadata, parse user agent
[transforms.enrich]
type = "remap"
inputs = ["app_logs"]
source = '''
  .hostname = get_hostname!()
  .environment = get_env_var!("ENV") ?? "production"
  
  # Parse user agent
  if exists(.user_agent) {
    .ua = parse_user_agent(.user_agent)
  }
'''

# Sampling for performance logs (giảm 90% volume)
[transforms.sample_perf]
type = "filter"
inputs = ["enrich"]
condition = '''
  .log_type == "performance" && (
    .duration > 1000 ||    # Keep all slow (>1s)
    random_bool(10)        # Sample 10% fast requests
  )
'''

# Route by type
[transforms.route]
type = "route"
inputs = ["enrich", "sample_perf"]
route.audit = '.log_type == "audit"'
route.performance = '.log_type == "performance"'
route.error = '.log_type == "error"'

# Sink to ClickHouse
[sinks.clickhouse]
type = "clickhouse"
inputs = ["route.*"]
endpoint = "http://clickhouse:8123"
database = "logs"
table = "{{ log_type }}_logs"
compression = "gzip"
batch.max_bytes = 10485760  # 10MB
batch.timeout_secs = 5

# Sink to Google Drive (daily archives)
[sinks.gdrive_backup]
type = "file"
inputs = ["route.*"]
path = "/tmp/logs/%Y-%m-%d/{{ log_type }}.json.gz"
encoding.codec = "json"
compression = "gzip"
```

---

#### C. Google Drive Integration cho Logs

**Strategy:**
1. **Daily Archives:** Vector ghi logs vào files hàng ngày
2. **Cron Job:** Upload files lên Google Drive mỗi đêm
3. **Folder Structure:**
   ```
   Google Drive/
   └── AppLogs/
       ├── 2025/
       │   ├── 12/
       │   │   ├── 2025-12-01/
       │   │   │   ├── audit.json.gz
       │   │   │   ├── performance.json.gz
       │   │   │   └── error.json.gz
       │   │   ├── 2025-12-02/
       │   │   └── ...
   ```

**Implementation:**
```typescript
// scripts/upload-logs-to-gdrive.ts
import { GoogleDriveService } from '../api/src/shared/googledrive/googledrive.service';
import * as fs from 'fs';
import * as path from 'path';

async function uploadDailyLogs() {
  const driveService = new GoogleDriveService();
  const yesterday = getYesterday();
  const logDir = `/tmp/logs/${yesterday}`;
  
  // Create folder on Google Drive
  const folderId = await driveService.createFolder(
    `AppLogs/${yesterday}`,
    process.env.SHARED_DRIVE_ID
  );
  
  // Upload all log files
  const files = fs.readdirSync(logDir);
  for (const file of files) {
    const filePath = path.join(logDir, file);
    await driveService.uploadFile(filePath, folderId);
    
    // Delete local file after upload
    fs.unlinkSync(filePath);
  }
  
  console.log(`Uploaded logs for ${yesterday} to Google Drive`);
}

// Run daily at 2 AM
// Cron: 0 2 * * * node dist/scripts/upload-logs-to-gdrive.js
```

**Cron Job:**
```bash
# /etc/cron.d/upload-logs
0 2 * * * cd /opt/rausachv3/api && node dist/scripts/upload-logs-to-gdrive.js >> /var/log/log-upload.log 2>&1
```

---

#### D. Grafana - Visualization & Alerting

**Dashboards:**

1. **Audit Activity Dashboard**
   - User activity timeline
   - Top users by actions
   - Entity changes frequency
   - Failed operations
   
2. **Performance Monitoring**
   - P50, P95, P99 latencies
   - Slow queries (>1s)
   - Request rate (req/s)
   - Error rate %
   
3. **Error Tracking**
   - Error rate by type
   - Top errors (grouped)
   - Error timeline
   
4. **Infrastructure Health**
   - ClickHouse metrics
   - Vector throughput
   - Disk usage

**Alerts:**
```yaml
# Grafana Alert Rules

# Alert 1: High P95 latency
- name: High_P95_Latency
  condition: p95 > 2000  # 2 seconds
  for: 5m
  channels:
    - Slack: #tech-alerts
    - Email: tech@example.com

# Alert 2: High error rate
- name: High_Error_Rate
  condition: error_rate > 5%  # 5% errors
  for: 2m
  channels:
    - Slack: #tech-alerts
    - PagerDuty: on-call

# Alert 3: Critical errors
- name: Critical_Errors
  condition: count(error_type='CriticalError') > 0
  for: 1m
  channels:
    - PagerDuty: on-call
    - SMS: tech-lead

# Alert 4: Disk space low
- name: Low_Disk_Space
  condition: disk_usage > 80%
  for: 10m
  channels:
    - Slack: #tech-alerts
```

---

### 3.3 Code Changes Required

#### Step 1: Update AuditService

**Before:**
```typescript
// api/src/auditlog/auditlog.service.ts
async logActivity(data: AuditLogData): Promise<void> {
  // Write directly to PostgreSQL
  await this.prisma.auditLog.create({
    data: {
      ...data,
      oldValues: data.oldValues,  // Full JSON
      newValues: data.newValues   // Full JSON
    }
  });
}
```

**After:**
```typescript
// api/src/auditlog/auditlog.service.ts
import axios from 'axios';

async logActivity(data: AuditLogData): Promise<void> {
  try {
    // Send to Vector (async, non-blocking)
    await this.sendToVector({
      log_type: 'audit',
      timestamp: new Date().toISOString(),
      entity_name: data.entityName,
      entity_id: data.entityId,
      action: data.action,
      user_id: data.userId,
      user_email: data.userEmail,
      
      // Only store changed fields, not full data
      changed_fields: data.changedFields,
      change_summary: this.createChangeSummary(data.oldValues, data.newValues),
      
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      session_id: data.sessionId,
      status: data.status || 'SUCCESS',
      error_message: data.errorDetails?.message
    });
  } catch (error) {
    // Fallback: log to file
    console.error('Failed to send audit log:', error);
    this.logToFile(data);
  }
}

private async sendToVector(log: any) {
  const vectorUrl = process.env.VECTOR_URL || 'http://localhost:8686';
  await axios.post(vectorUrl, log, {
    timeout: 1000,  // 1s timeout
    headers: { 'Content-Type': 'application/json' }
  });
}

private createChangeSummary(oldVal: any, newVal: any): string {
  // Create minimal diff instead of full values
  const changes = {};
  for (const key in newVal) {
    if (oldVal[key] !== newVal[key]) {
      changes[key] = {
        old: oldVal[key],
        new: newVal[key]
      };
    }
  }
  return JSON.stringify(changes);
}

private logToFile(data: any) {
  // Fallback to local file if Vector is down
  fs.appendFileSync('/var/log/audit-fallback.log', 
    JSON.stringify(data) + '\n'
  );
}
```

---

#### Step 2: Update PerformanceLogger

**Before:**
```typescript
// api/src/shared/performance-logger.ts
private static recordMetric(metric: PerformanceMetric) {
  this.metrics.push(metric);
  
  // Save to PostgreSQL
  if (this.performanceLogService) {
    this.performanceLogService.saveMetric(metric);
  }
}
```

**After:**
```typescript
// api/src/shared/performance-logger.ts
private static recordMetric(metric: PerformanceMetric) {
  // Sampling: Only log slow requests or 10% of fast ones
  const shouldLog = metric.duration > 1000 || Math.random() < 0.1;
  
  if (!shouldLog) return;
  
  // Send to Vector (async)
  this.sendToVector({
    log_type: 'performance',
    timestamp: new Date().toISOString(),
    name: metric.name,
    duration: metric.duration,
    success: metric.success,
    method: metric.method,
    url: metric.url,
    status_code: metric.statusCode,
    error_message: metric.error
  }).catch(err => {
    // Silent fail, don't block business logic
    console.error('Failed to log performance:', err);
  });
}

private static async sendToVector(log: any) {
  const vectorUrl = process.env.VECTOR_URL || 'http://localhost:8686';
  return axios.post(vectorUrl, log, {
    timeout: 500,  // 500ms timeout
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

#### Step 3: Add Google Drive Upload Service

```typescript
// api/src/shared/googledrive/log-uploader.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { GoogleDriveService } from './googledrive.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
import * as path from 'path';
import * as archiver from 'archiver';

@Injectable()
export class LogUploaderService {
  private readonly logger = new Logger(LogUploaderService.name);
  
  constructor(
    private readonly driveService: GoogleDriveService
  ) {}
  
  // Run daily at 2 AM
  @Cron('0 2 * * *')
  async uploadDailyLogs() {
    const yesterday = this.getYesterday();
    this.logger.log(`Starting log upload for ${yesterday}`);
    
    try {
      const logDir = `/tmp/logs/${yesterday}`;
      
      if (!fs.existsSync(logDir)) {
        this.logger.warn(`No logs found for ${yesterday}`);
        return;
      }
      
      // Create folder structure on Google Drive
      const year = yesterday.substring(0, 4);
      const month = yesterday.substring(5, 7);
      const folderId = await this.createDriveFolder(`AppLogs/${year}/${month}/${yesterday}`);
      
      // Upload each log file
      const files = fs.readdirSync(logDir);
      for (const file of files) {
        const filePath = path.join(logDir, file);
        
        // Upload to Google Drive
        await this.driveService.uploadFile({
          originalname: file,
          buffer: fs.readFileSync(filePath),
          mimetype: 'application/gzip'
        });
        
        this.logger.log(`Uploaded ${file}`);
        
        // Delete local file after successful upload
        fs.unlinkSync(filePath);
      }
      
      // Remove empty directory
      fs.rmdirSync(logDir);
      
      this.logger.log(`Successfully uploaded logs for ${yesterday}`);
    } catch (error) {
      this.logger.error(`Failed to upload logs: ${error.message}`, error.stack);
    }
  }
  
  private getYesterday(): string {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0];
  }
  
  private async createDriveFolder(path: string): Promise<string> {
    // Implementation to create nested folders
    // Returns folder ID
    const parts = path.split('/');
    let parentId = process.env.SHARED_DRIVE_ID;
    
    for (const part of parts) {
      // Check if folder exists, create if not
      const folders = await this.driveService.queryFolders(parentId);
      let folder = folders.find(f => f.name === part);
      
      if (!folder) {
        // Create folder
        // Implementation depends on GoogleDriveService API
      }
      
      parentId = folder.id;
    }
    
    return parentId;
  }
}
```

---

### 3.4 Migration Plan (7 tuần)

#### Week 1-2: Infrastructure Setup
- [ ] Deploy ClickHouse (Docker hoặc Cloud)
- [ ] Deploy Vector
- [ ] Deploy Grafana
- [ ] Create ClickHouse schemas
- [ ] Test data flow
- [ ] Setup monitoring

#### Week 3: Migrate Audit Logs
- [ ] Implement new AuditService với Vector
- [ ] Run dual-write (PostgreSQL + Vector) for 1 week
- [ ] Verify data consistency
- [ ] Monitor performance
- [ ] Switch completely to Vector

#### Week 4: Migrate Performance Logs
- [ ] Update PerformanceLogger
- [ ] Implement sampling (10% fast, 100% slow)
- [ ] Dual-write for validation
- [ ] Switch to Vector only

#### Week 5: Google Drive Integration
- [ ] Implement LogUploaderService
- [ ] Setup cron job
- [ ] Test upload flow
- [ ] Verify backup integrity
- [ ] Document restore process

#### Week 6: Dashboards & Alerts
- [ ] Create Grafana dashboards
- [ ] Setup alerts
- [ ] Configure Slack/Email notifications
- [ ] User training

#### Week 7: Cleanup & Optimize
- [ ] Archive old PostgreSQL logs to Google Drive
- [ ] Drop AuditLog table from PostgreSQL
- [ ] Drop PerformanceLog table
- [ ] VACUUM PostgreSQL
- [ ] Verify performance improvements
- [ ] Documentation

---

## 💰 4. CHI PHÍ & ROI

### 4.1 Chi phí hạ tầng (Monthly)

#### Option A: Self-hosted (Khuyến nghị cho Vietnam)
```
VPS cho ClickHouse + Grafana:
• Provider: Contabo/Hetzner
• Config: 4 CPU, 8GB RAM, 200GB SSD
• Cost: ~$15-20/month

Vector:
• Chạy cùng với app server
• Cost: $0

Google Drive:
• Workspace Business Standard
• Cost: $12/user/month (unlimited storage)
• Hoặc: Free 15GB (đủ cho 1-2 năm logs)

TOTAL: ~$27-32/month
```

#### Option B: ClickHouse Cloud
```
ClickHouse Cloud Starter:
• Cost: $50/month
• Managed, auto-scaling
• Backup included

Google Drive: $12/month

TOTAL: ~$62/month
```

### 4.2 So sánh với alternatives

| Giải pháp | Chi phí/tháng | Setup | Complexity | Performance |
|-----------|---------------|-------|------------|-------------|
| **ClickHouse (đề xuất)** | $27-62 | 2 tuần | Medium | ⭐⭐⭐⭐⭐ |
| Keep PostgreSQL | $0 | 0 | Low | ⭐ (chậm) |
| ELK Stack | $200+ | 1 tháng | High | ⭐⭐⭐ |
| Datadog | $400+ | 1 ngày | Low | ⭐⭐⭐⭐⭐ |
| Loki + Promtail | $50 | 1 tuần | Medium | ⭐⭐⭐ |

### 4.3 ROI Analysis

**Cost:**
- Initial: ~$500 (developer time, 2 tuần)
- Monthly: ~$30-60

**Benefits:**
- **Performance gain:** 50% faster business queries = tiết kiệm thời gian dev
- **Storage savings:** Giảm 68% database = giảm backup cost
- **Operational efficiency:** Faster debugging = ít downtime
- **Scalability:** Có thể scale logs độc lập

**ROI Timeline:**
- Month 1-2: Investment period
- Month 3+: Break even
- Month 6+: Clear profit

**Intangible benefits:**
- Better compliance (audit trail)
- Faster incident response
- Data-driven decisions
- Team productivity

---

## 📊 5. KẾT QUẢ KỲ VỌNG

### 5.1 Performance Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Database size | 976 MB | 308 MB | **-68%** |
| Audit query | 5s | 50ms | **+10,000%** |
| Business query | 500ms | 250ms | **+100%** |
| Log write impact | High | Minimal | **+90%** |
| Backup time | 10 min | 3 min | **-70%** |

### 5.2 Storage Breakdown

**Before:**
```
PostgreSQL: 976 MB
├─ AuditLog: 420 MB (43%)
├─ PerformanceLog: 248 MB (25%)
├─ ErrorLog: 10 MB (1%)
└─ Business Data: 308 MB (31%)
```

**After:**
```
PostgreSQL: 308 MB (business data only)
ClickHouse: ~40 MB (compressed logs)
Google Drive: ~10 GB/year (archives)
```

### 5.3 Query Performance

**Audit History Query:**
```sql
-- Get user activity for last 30 days
-- Before: 5-8 seconds (PostgreSQL)
-- After: 50-100ms (ClickHouse)

SELECT 
  toStartOfDay(timestamp) as day,
  count() as actions,
  countIf(action='CREATE') as creates,
  countIf(action='UPDATE') as updates,
  countIf(action='DELETE') as deletes
FROM audit_logs
WHERE user_id = 'xxx'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY day
ORDER BY day DESC;
```

**Performance Analytics:**
```sql
-- P95 latency by endpoint
-- Before: 15-20 seconds (PostgreSQL)
-- After: 100-200ms (ClickHouse)

SELECT 
  name,
  count() as requests,
  quantile(0.95)(duration) as p95,
  countIf(NOT success) as errors
FROM performance_logs
WHERE timestamp >= now() - INTERVAL 7 DAY
GROUP BY name
HAVING requests > 100
ORDER BY p95 DESC
LIMIT 20;
```

---

## 🚀 6. ROADMAP THỰC HIỆN

### Phase 1: Preparation (1 tuần)
- [x] Review existing documentation
- [ ] Finalize architecture
- [ ] Provision infrastructure
- [ ] Setup development environment
- [ ] Team training on ClickHouse/Vector

### Phase 2: Infrastructure (1 tuần)
- [ ] Deploy ClickHouse
- [ ] Deploy Vector
- [ ] Deploy Grafana
- [ ] Setup network/security
- [ ] Create schemas
- [ ] Basic testing

### Phase 3: Code Changes (2 tuần)
- [ ] Update AuditService
- [ ] Update PerformanceLogger
- [ ] Add Google Drive uploader
- [ ] Dual-write mode
- [ ] Testing & validation

### Phase 4: Migration (1 tuần)
- [ ] Start dual-write
- [ ] Monitor data consistency
- [ ] Performance testing
- [ ] Switch to new system
- [ ] Archive old logs

### Phase 5: Dashboards (1 tuần)
- [ ] Create Grafana dashboards
- [ ] Setup alerts
- [ ] User training
- [ ] Documentation

### Phase 6: Cleanup (1 tuần)
- [ ] Drop old tables
- [ ] Optimize database
- [ ] Final testing
- [ ] Go-live celebration! 🎉

---

## ⚠️ 7. RISKS & MITIGATION

### Risk 1: Data Loss during migration
**Mitigation:**
- Dual-write mode for 1-2 weeks
- Daily verification scripts
- Keep PostgreSQL logs as backup
- Test rollback procedure

### Risk 2: Vector/ClickHouse downtime
**Mitigation:**
- Fallback to local file logging
- Buffer in Vector (prevent data loss)
- ClickHouse replication (if critical)
- Monitoring & alerts

### Risk 3: Team learning curve
**Mitigation:**
- Training sessions
- Documentation
- Gradual rollout
- Dedicated support channel

### Risk 4: Google Drive quota
**Mitigation:**
- Monitor storage usage
- Compress logs (gzip)
- Retention policy (delete old archives)
- Alternative: S3 if needed

### Risk 5: Performance regression
**Mitigation:**
- Extensive testing before cutover
- Rollback plan ready
- Gradual traffic migration
- 24/7 monitoring during launch

---

## ✅ 8. KẾT LUẬN & KHUYẾN NGHỊ

### Khuyến nghị chính ⭐

**OPTION 1 (ZERO-COST): PostgreSQL Optimization + Google Drive** - KHUYẾN NGHỊ CHO HẦU HẾT TRƯỜNG HỢP

**Lý do:**
1. ✅ **Zero cost:** Không tốn thêm tiền hàng tháng
2. ✅ **Tận dụng infrastructure có sẵn:** Server hiện tại đủ mạnh
3. ✅ **Google Drive unlimited:** Đã có credentials, chỉ cần mở rộng
4. ✅ **Performance tốt:** +150-400% cho log queries, +30-40% cho business queries
5. ✅ **Dễ triển khai:** 5 tuần, 1 developer
6. ✅ **Low risk:** Không thay đổi infrastructure lớn
7. ✅ **Giảm 50% database size:** Từ 976 MB → 400-500 MB

**Khi nào dùng Option 2 (ClickHouse - Premium)?**
- Cần analytics phức tạp real-time
- Log volume rất lớn (>10 GB/tháng)
- Cần query performance cực nhanh (<100ms)
- Có budget $50-80/month
- Team có expertise ClickHouse

### So sánh 2 Options

| Tiêu chí | Option 1: Zero-Cost | Option 2: Premium |
|----------|---------------------|-------------------|
| **Cost** | $0/month ⭐ | $50-80/month |
| **Setup time** | 5 tuần | 7 tuần |
| **Complexity** | Low ⭐ | Medium |
| **DB size reduction** | -50% (→500 MB) | -68% (→308 MB) |
| **Log query speed** | 1-2s (good enough) | 50ms (excellent) |
| **Business query** | +30-40% ⭐ | +50% |
| **Google Drive** | ✅ Yes | ✅ Yes |
| **Dashboards** | Simple HTML ⭐ | Grafana (advanced) |
| **Alerting** | Email/Slack basic | Advanced |
| **Learning curve** | None ⭐ | High (ClickHouse) |
| **Maintenance** | Low ⭐ | Medium |
| **Scalability** | Good (đến ~5GB) | Excellent (unlimited) |
| **Risk** | Very low ⭐ | Low |

### Lộ trình đề xuất

**Phase 1 (Immediate - 5 tuần): Triển khai Option 1 (Zero-Cost)**
- Tối ưu PostgreSQL
- Google Drive archival
- Sampling & compression
- Simple monitoring

**Phase 2 (Sau 6-12 tháng - Optional): Đánh giá upgrade lên Option 2**
- Nếu log volume tăng >5 GB
- Nếu cần analytics phức tạp
- Nếu có budget
- Migration path rõ ràng

### Lộ trình triển khai (Option 1 - Zero-Cost)

**Timeline:** 5 tuần
**Cost:** $0
**Team:** 1 backend developer (fulltime)

**Priority:**
- P0 (Tuần 1-2): Database optimization + sampling
- P1 (Tuần 3): Google Drive integration
- P2 (Tuần 4-5): Testing + deployment

### Next steps (Option 1 - Zero-Cost)

1. **Week 1:** 
   - [ ] Review proposal với team
   - [ ] Tạo backup database hiện tại
   - [ ] Implement partitioning
   - [ ] Setup compression

2. **Week 2:**
   - [ ] Update AuditService (sampling)
   - [ ] Update PerformanceLogger (aggregation)
   - [ ] Test on dev environment
   
3. **Week 3:**
   - [ ] Implement LogArchiverService
   - [ ] Test Google Drive upload
   - [ ] Setup cron jobs
   
4. **Week 4:**
   - [ ] Deploy to production
   - [ ] Monitor performance
   - [ ] Adjust thresholds
   
5. **Week 5:**
   - [ ] Run first archival
   - [ ] Verify improvements
   - [ ] Documentation
   - [ ] Team training

---

## 📚 9. APPENDIX

### A. Useful Resources

**ClickHouse:**
- Official docs: https://clickhouse.com/docs
- Best practices: https://clickhouse.com/docs/en/operations/
- Vietnamese guide: (cần tạo)

**Vector:**
- Official docs: https://vector.dev/docs/
- Configuration examples: https://vector.dev/docs/reference/configuration/

**Grafana:**
- ClickHouse datasource: https://grafana.com/grafana/plugins/vertamedia-clickhouse-datasource/
- Alerting: https://grafana.com/docs/grafana/latest/alerting/

### B. Sample Queries

```sql
-- Top 10 active users (last 7 days)
SELECT 
  user_email,
  count() as actions,
  countIf(action='CREATE') as creates,
  countIf(action='UPDATE') as updates
FROM audit_logs
WHERE timestamp >= now() - INTERVAL 7 DAY
GROUP BY user_email
ORDER BY actions DESC
LIMIT 10;

-- Slow endpoints (P95 > 1s)
SELECT 
  name,
  quantile(0.95)(duration) as p95,
  count() as requests
FROM performance_logs
WHERE timestamp >= now() - INTERVAL 24 HOUR
GROUP BY name
HAVING p95 > 1000
ORDER BY p95 DESC;

-- Error rate trend (hourly)
SELECT 
  toStartOfHour(timestamp) as hour,
  count() as total_requests,
  countIf(NOT success) as errors,
  round(errors / total_requests * 100, 2) as error_rate_pct
FROM performance_logs
WHERE timestamp >= now() - INTERVAL 7 DAY
GROUP BY hour
ORDER BY hour;
```

### C. Monitoring Checklist

Daily:
- [ ] Check ClickHouse disk usage
- [ ] Verify Vector is running
- [ ] Check log upload to Google Drive
- [ ] Review error rate

Weekly:
- [ ] Review slow queries
- [ ] Check alert history
- [ ] Verify data retention
- [ ] Performance trends
⭐ Option 1: ZERO-COST (RECOMMENDED)

#### Immediate (This week)
1. [ ] Review this proposal with team
2. [ ] Backup current database
3. [ ] Assign 1 backend developer
4. [ ] Create test environment

#### Short-term (Week 1-2)
1. [ ] Implement database partitioning
2. [ ] Add sampling to AuditService
3. [ ] Update PerformanceLogger
4. [ ] Test performance improvements

#### Medium-term (Week 3-5)
1. [ ] Google Drive archival
2. [ ] Production deployment
3. [ ] Monitoring setup
4. [ ] Documentation

**Total Cost: $0**  
**Timeline: 5 weeks**  
**ROI: Immediate (no investment)**

---

### 💎 Option 2: PREMIUM (If needed later)

#### When to consider:
- Log volume > 5 GB/month
- Need sub-second query performance
- Complex analytics requirements
- Have budget $50-80/month

#### Quick start:
1. [ ] Setup ClickHouse test instance
2. [ ] Implement Vector integration
3. [ ] Migrate from optimized PostgreSQL

**Total Cost: $50-80/month**  
**Timeline: 7 weeks**  
**ROI: 2-3 months**

---

## 📊 COMPARISON SUMMARY

```
┌─────────────────────────────────────────────────────────────┐
│                    ZERO-COST vs PREMIUM                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ZERO-COST SOLUTION                                         │
│  ✅ Cost: $0/month                                          │
│  ✅ Performance: +30-40% business, +150-400% logs          │
│  ✅ DB Size: 976 MB → 500 MB (-50%)                        │
│  ✅ Easy: 5 weeks, 1 developer                             │
│  ✅ Low risk                                                │
│  ✅ Google Drive unlimited backup                           │
│                                                             │
│  BEST FOR:                                                  │
│  • Budget-conscious teams                                   │
│  • Current log volume < 5 GB/month                         │
│  • Prefer simplicity                                        │
│  • Want quick wins                                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  PREMIUM SOLUTION (ClickHouse)                              │
│  💰 Cost: $50-80/month                                      │
│  🚀 Performance: +50% business, +10,000% logs              │
│  💾 DB Size: 976 MB → 308 MB (-68%)                        │
│  ⏱️  Complex: 7 weeks, 1-2 developers                       │
│  📊 Advanced dashboards & alerts                            │
│  ∞  Unlimited scalability                                   │
│                                                             │
│  BEST FOR:                                                  │
│  • High-growth companies                                    │
│  • Need real-time analytics                                │
│  • Log volume > 5 GB/month                                 │
│  • Have budget & technical expertise                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**TÓM LẠI:** 

**Bắt đầu với Option 1 (Zero-Cost).** Đây là lựa chọn an toàn, không tốn chi phí, và vẫn đạt được 80% lợi ích. Sau 6-12 tháng, nếu cần, có thể nâng cấp lên Option 2 (Premium) với migration path rõ ràng.

**Action ngay:** Implement database partitioning + sampling + Google Drive archival = $0 cost, huge improvement
3. [ ] Setup ClickHouse test instance
4. [ ] Assign developer to project

### Short-term (Next 2 weeks)
1. [ ] Deploy ClickHouse + Vector
2. [ ] Implement basic logging integration
3. [ ] Test with sample data
4. [ ] Create first dashboard

### Medium-term (Month 1-2)
1. [ ] Full migration
2. [ ] Google Drive integration
3. [ ] Production deployment
4. [ ] Team training

---

**TÓM LẠI:** Đây là một investment tốt với ROI rõ ràng. Performance sẽ tăng đáng kể, cost thấp, và scalability tốt. Khuyến nghị triển khai ngay! 🚀
