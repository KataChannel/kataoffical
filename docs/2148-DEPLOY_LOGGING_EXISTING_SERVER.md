# 🎯 DEPLOY LOGGING STACK LÊN SERVER HIỆN TẠI

**Server:** 116.118.49.243  
**Chi phí:** $0 (sử dụng server đã có)  
**Thời gian:** 30 phút

---

## ✅ CHECKLIST TRƯỚC KHI BẮT ĐẦU

```bash
# SSH vào server
ssh root@116.118.49.243

# 1. Check RAM (cần >= 6GB total, >= 2GB free)
free -h

# 2. Check disk (cần >= 20GB free)
df -h /

# 3. Check ports available
netstat -tulpn | grep -E '58123|58686|58300'
# Không có output = ports trống = OK

# 4. Check Docker
docker --version
docker-compose --version
```

**Nếu tất cả OK → Proceed!**

---

## 🚀 AUTOMATED SETUP SCRIPT

### Option 1: One-click install (KHUYẾN NGHỊ)

```bash
# Tạo setup script
cat > /tmp/setup-logging.sh << 'SCRIPT'
#!/bin/bash

set -e

echo "🚀 Setting up Logging Stack on 116.118.49.243..."

# Create directory
mkdir -p /root/logging-stack
cd /root/logging-stack

# Create docker-compose
cat > docker-compose.logging.yml << 'EOF'
version: '3.8'

services:
  clickhouse:
    image: clickhouse/clickhouse-server:23.8-alpine
    container_name: logging-clickhouse
    restart: always
    environment:
      - CLICKHOUSE_DB=logs
      - CLICKHOUSE_USER=admin
      - CLICKHOUSE_PASSWORD=SecureLog123
      - CLICKHOUSE_MAX_MEMORY_USAGE=1073741824
    ports:
      - "58123:8123"
    volumes:
      - ./clickhouse/data:/var/lib/clickhouse
      - ./clickhouse/config.xml:/etc/clickhouse-server/config.d/custom.xml
    mem_limit: 1.5g
    cpus: 1
    networks:
      - logging-network

  vector:
    image: timberio/vector:0.34.0-alpine
    container_name: logging-vector
    restart: always
    ports:
      - "58686:8686"
    volumes:
      - ./vector/config:/etc/vector:ro
    mem_limit: 512m
    cpus: 0.5
    networks:
      - logging-network
    depends_on:
      - clickhouse

  grafana:
    image: grafana/grafana:10.2.0
    container_name: logging-grafana
    restart: always
    environment:
      - GF_SERVER_ROOT_URL=http://116.118.49.243:58300
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=AdminLog123
      - GF_INSTALL_PLUGINS=grafana-clickhouse-datasource
      - GF_SERVER_HTTP_PORT=3000
    ports:
      - "58300:3000"
    volumes:
      - ./grafana/data:/var/lib/grafana
    mem_limit: 512m
    cpus: 0.5
    networks:
      - logging-network
    depends_on:
      - clickhouse

networks:
  logging-network:
    name: logging-network
    driver: bridge
EOF

# Create ClickHouse config
mkdir -p clickhouse
cat > clickhouse/config.xml << 'EOF'
<clickhouse>
    <max_server_memory_usage>1073741824</max_server_memory_usage>
    <max_concurrent_queries>50</max_concurrent_queries>
    <listen_host>0.0.0.0</listen_host>
    <compression>
        <case>
            <min_part_size>10485760</min_part_size>
            <min_part_size_ratio>0.01</min_part_size_ratio>
            <method>lz4</method>
        </case>
    </compression>
    <logger>
        <level>warning</level>
        <log>/var/log/clickhouse-server/clickhouse-server.log</log>
        <size>100M</size>
        <count>3</count>
    </logger>
</clickhouse>
EOF

# Create Vector config
mkdir -p vector/config
cat > vector/config/vector.toml << 'EOF'
[sources.app_logs]
type = "http"
address = "0.0.0.0:8686"
encoding = "json"

[transforms.parse]
type = "remap"
inputs = ["app_logs"]
source = '''
  .received_at = now()
  .log_type = .log_type ?? "unknown"
  
  # Extract fields based on log type
  if .log_type == "audit" {
    .entity_name = string!(.entity_name)
    .action = string!(.action)
  }
  
  if .log_type == "performance" {
    .duration = to_float!(.duration)
  }
'''

# Sample performance logs (keep 100% slow requests + 10% fast)
[transforms.sample_perf]
type = "filter"
inputs = ["parse"]
condition = '''
  .log_type != "performance" || 
  (.duration > 1000.0) || 
  (random_float(0.0, 1.0) < 0.1)
'''

[sinks.clickhouse]
type = "clickhouse"
inputs = ["sample_perf"]
endpoint = "http://clickhouse:8123"
database = "logs"
table = "all_logs"
auth.strategy = "basic"
auth.user = "admin"
auth.password = "SecureLog123"
compression = "gzip"
batch.max_bytes = 5242880
batch.timeout_secs = 10
encoding.timestamp_format = "unix"

[sinks.console]
type = "console"
inputs = ["sample_perf"]
encoding.codec = "json"
EOF

# Create Grafana directory
mkdir -p grafana/data
chmod 777 grafana/data

# Start services
echo "🐳 Starting Docker containers..."
docker-compose -f docker-compose.logging.yml up -d

# Wait for ClickHouse
echo "⏳ Waiting for ClickHouse to start (30s)..."
sleep 30

# Create database schema
echo "📊 Creating ClickHouse schema..."
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --multiquery << 'SQL'

CREATE DATABASE IF NOT EXISTS logs;

USE logs;

CREATE TABLE IF NOT EXISTS all_logs (
    timestamp DateTime64(3) DEFAULT now64(),
    date Date DEFAULT toDate(timestamp),
    
    log_type LowCardinality(String),
    message String,
    
    -- Audit fields
    entity_name LowCardinality(String) DEFAULT '',
    entity_id String DEFAULT '',
    action LowCardinality(String) DEFAULT '',
    user_id String DEFAULT '',
    user_email String DEFAULT '',
    
    -- Performance fields  
    duration Float32 DEFAULT 0,
    status_code UInt16 DEFAULT 0,
    method LowCardinality(String) DEFAULT '',
    url String DEFAULT '',
    
    -- Common
    metadata String DEFAULT '{}',
    ip_address String DEFAULT '',
    
    INDEX idx_type log_type TYPE set(100) GRANULARITY 1,
    INDEX idx_user user_id TYPE bloom_filter GRANULARITY 1,
    INDEX idx_entity entity_name TYPE set(100) GRANULARITY 1
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (log_type, timestamp)
TTL date + INTERVAL 60 DAY DELETE
SETTINGS index_granularity = 8192;

-- Materialized view for performance stats
CREATE MATERIALIZED VIEW IF NOT EXISTS performance_stats_hourly
ENGINE = SummingMergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (method, url, hour)
AS SELECT
    method,
    url,
    toStartOfHour(timestamp) as hour,
    toDate(timestamp) as date,
    count() as request_count,
    quantile(0.50)(duration) as p50,
    quantile(0.95)(duration) as p95,
    quantile(0.99)(duration) as p99,
    avg(duration) as avg_duration,
    countIf(status_code >= 400) as error_count
FROM all_logs
WHERE log_type = 'performance'
GROUP BY method, url, hour, date;

SQL

# Setup firewall
echo "🔥 Configuring firewall..."
ufw allow 58123/tcp comment 'ClickHouse HTTP'
ufw allow 58686/tcp comment 'Vector HTTP'
ufw allow 58300/tcp comment 'Grafana'
ufw reload 2>/dev/null || true

# Create monitoring script
cat > /root/logging-stack/monitor.sh << 'MONITOR'
#!/bin/bash

echo "=== LOGGING STACK HEALTH CHECK ==="
echo ""
echo "📦 Containers:"
docker-compose -f /root/logging-stack/docker-compose.logging.yml ps

echo ""
echo "💾 Memory Usage:"
docker stats --no-stream --format "table {{.Name}}\t{{.MemUsage}}\t{{.CPUPerc}}" \
  logging-clickhouse logging-vector logging-grafana

echo ""
echo "📊 Storage:"
echo "ClickHouse: $(du -sh /root/logging-stack/clickhouse/data | cut -f1)"
echo "Grafana: $(du -sh /root/logging-stack/grafana/data | cut -f1)"

echo ""
echo "📈 Log Statistics (Last 24h):"
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "
  SELECT 
    log_type,
    count() as count,
    formatReadableSize(sum(length(message))) as total_size,
    min(timestamp) as first_log,
    max(timestamp) as last_log
  FROM logs.all_logs
  WHERE timestamp > now() - INTERVAL 24 HOUR
  GROUP BY log_type
  ORDER BY count DESC;
  "
MONITOR

chmod +x /root/logging-stack/monitor.sh

# Test
echo ""
echo "🧪 Testing Vector endpoint..."
curl -X POST http://localhost:58686 \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "test",
    "message": "Setup test log",
    "user_id": "system"
  }' 2>/dev/null && echo " ✅ Vector OK" || echo " ❌ Vector failed"

sleep 3

# Verify log in ClickHouse
echo ""
echo "🔍 Verifying log in ClickHouse..."
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "SELECT * FROM logs.all_logs ORDER BY timestamp DESC LIMIT 1 FORMAT Pretty;"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📍 Access points:"
echo "   Grafana:    http://116.118.49.243:58300"
echo "               User: admin / Pass: AdminLog123"
echo "   ClickHouse: http://116.118.49.243:58123"
echo "   Vector API: http://116.118.49.243:58686"
echo ""
echo "📊 Monitoring:"
echo "   Run: /root/logging-stack/monitor.sh"
echo ""
echo "🔧 Management:"
echo "   cd /root/logging-stack"
echo "   docker-compose -f docker-compose.logging.yml [up|down|logs]"

SCRIPT

# Make executable and run
chmod +x /tmp/setup-logging.sh
/tmp/setup-logging.sh
```

**Chạy command trên và đợi 2-3 phút!**

---

## Option 2: Manual setup (từng bước)

Xem [SELF_HOST_LOGGING_GUIDE.md](SELF_HOST_LOGGING_GUIDE.md) - Section "Triển khai trên server hiện tại"

---

## 🧪 TESTING

### Test 1: Send test logs

```bash
# Test audit log
curl -X POST http://116.118.49.243:58686 \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "audit",
    "entity_name": "Product",
    "entity_id": "P001",
    "action": "UPDATE",
    "user_id": "U123",
    "user_email": "test@example.com",
    "message": "Updated product price"
  }'

# Test performance log
curl -X POST http://116.118.49.243:58686 \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "performance",
    "message": "API request",
    "method": "POST",
    "url": "/api/products",
    "duration": 234.5,
    "status_code": 200
  }'

# Test error log
curl -X POST http://116.118.49.243:58686 \
  -H "Content-Type: application/json" \
  -d '{
    "log_type": "error",
    "message": "Database connection failed",
    "metadata": "{\"error\":\"timeout\"}"
  }'
```

### Test 2: Query ClickHouse

```bash
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 << 'SQL'

-- Count by log type
SELECT log_type, count() 
FROM logs.all_logs 
GROUP BY log_type;

-- Recent logs
SELECT 
  timestamp,
  log_type,
  message,
  user_id
FROM logs.all_logs
ORDER BY timestamp DESC
LIMIT 10;

-- Performance stats
SELECT 
  method,
  url,
  count() as requests,
  round(avg(duration), 2) as avg_ms,
  round(quantile(0.95)(duration), 2) as p95_ms
FROM logs.all_logs
WHERE log_type = 'performance'
GROUP BY method, url
ORDER BY requests DESC
LIMIT 10;

SQL
```

### Test 3: Check Grafana

```bash
# 1. Open browser
open http://116.118.49.243:58300

# 2. Login
# User: admin
# Pass: AdminLog123

# 3. Add ClickHouse datasource
# - Name: ClickHouse
# - URL: http://logging-clickhouse:8123
# - Database: logs
# - Username: admin
# - Password: SecureLog123

# 4. Test connection
```

---

## 📊 INTEGRATION VỚI APP

### Update API code

```typescript
// api/src/logging/vector-logger.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VectorLoggerService {
  private readonly vectorUrl = 'http://116.118.49.243:58686';
  
  private async send(data: any) {
    try {
      await axios.post(this.vectorUrl, data, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 1000, // 1s timeout
      });
    } catch (error) {
      // Fail silently - không crash app
      console.error('[VectorLogger] Failed:', error.message);
    }
  }

  async audit(params: {
    entity_name: string;
    entity_id: string;
    action: string;
    user_id: string;
    user_email?: string;
    message: string;
  }) {
    await this.send({
      log_type: 'audit',
      ...params,
    });
  }

  async performance(params: {
    method: string;
    url: string;
    duration: number;
    status_code: number;
    user_id?: string;
  }) {
    await this.send({
      log_type: 'performance',
      message: `${params.method} ${params.url}`,
      ...params,
    });
  }

  async error(params: {
    message: string;
    stack_trace?: string;
    user_id?: string;
    metadata?: any;
  }) {
    await this.send({
      log_type: 'error',
      ...params,
      metadata: JSON.stringify(params.metadata || {}),
    });
  }
}
```

### Register module

```typescript
// api/src/logging/logging.module.ts
import { Module, Global } from '@nestjs/common';
import { VectorLoggerService } from './vector-logger.service';

@Global()
@Module({
  providers: [VectorLoggerService],
  exports: [VectorLoggerService],
})
export class LoggingModule {}
```

```typescript
// api/src/app.module.ts
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    LoggingModule, // Add this
    // ... other modules
  ],
})
export class AppModule {}
```

### Use in services

```typescript
// api/src/products/products.service.ts
import { VectorLoggerService } from '../logging/vector-logger.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly vectorLogger: VectorLoggerService,
  ) {}

  async updateProduct(id: string, data: any, userId: string) {
    const startTime = Date.now();
    
    try {
      const result = await this.prisma.product.update({
        where: { id },
        data,
      });
      
      // Log audit
      await this.vectorLogger.audit({
        entity_name: 'Product',
        entity_id: id,
        action: 'UPDATE',
        user_id: userId,
        message: `Updated product ${id}`,
      });
      
      // Log performance
      const duration = Date.now() - startTime;
      await this.vectorLogger.performance({
        method: 'UPDATE',
        url: `/products/${id}`,
        duration,
        status_code: 200,
        user_id: userId,
      });
      
      return result;
    } catch (error) {
      // Log error
      await this.vectorLogger.error({
        message: `Failed to update product ${id}`,
        stack_trace: error.stack,
        user_id: userId,
        metadata: { productId: id, error: error.message },
      });
      
      throw error;
    }
  }
}
```

---

## 📈 MONITORING & MAINTENANCE

### Daily monitoring

```bash
# Check health
/root/logging-stack/monitor.sh

# Check logs
docker logs logging-vector --tail 50
docker logs logging-clickhouse --tail 50

# Check disk usage
df -h /root/logging-stack
```

### Weekly cleanup

```bash
# Optimize ClickHouse tables
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "OPTIMIZE TABLE logs.all_logs FINAL;"

# Check old partitions
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "
  SELECT 
    partition,
    formatReadableSize(sum(bytes)) as size,
    min(min_date) as oldest,
    max(max_date) as newest
  FROM system.parts
  WHERE database = 'logs' AND table = 'all_logs' AND active
  GROUP BY partition
  ORDER BY partition;
  "
```

### Backup (monthly)

```bash
# Backup ClickHouse data
cd /root/logging-stack
tar -czf backup-$(date +%Y%m%d).tar.gz clickhouse/data/

# Upload to external storage (optional)
# rclone copy backup-*.tar.gz s3:my-bucket/backups/
```

---

## 🔧 TROUBLESHOOTING

### Problem: Container không start

```bash
# Check logs
docker logs logging-clickhouse
docker logs logging-vector

# Check resources
free -h
df -h

# Restart
cd /root/logging-stack
docker-compose -f docker-compose.logging.yml restart
```

### Problem: Vector không nhận logs

```bash
# Test port
curl http://localhost:58686
# Should return 404 (endpoint OK but wrong method)

# Check firewall
ufw status | grep 58686

# Check Vector logs
docker logs logging-vector -f
```

### Problem: ClickHouse slow

```bash
# Check query performance
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "
  SELECT 
    query,
    query_duration_ms,
    read_rows,
    formatReadableSize(read_bytes) as read_size
  FROM system.query_log
  WHERE type = 'QueryFinish'
  ORDER BY query_duration_ms DESC
  LIMIT 10;
  "

# Reduce TTL if needed
docker exec logging-clickhouse clickhouse-client \
  --user admin \
  --password SecureLog123 \
  --query "ALTER TABLE logs.all_logs MODIFY TTL date + INTERVAL 30 DAY DELETE;"
```

---

## ✅ SUCCESS CHECKLIST

- [ ] All containers running: `docker ps | grep logging`
- [ ] Vector endpoint responding: `curl http://116.118.49.243:58686`
- [ ] ClickHouse accessible: `docker exec logging-clickhouse clickhouse-client --version`
- [ ] Grafana accessible: http://116.118.49.243:58300
- [ ] Test logs received: See query results in ClickHouse
- [ ] Firewall configured: Ports 58123, 58686, 58300 open
- [ ] Monitoring script works: `/root/logging-stack/monitor.sh`
- [ ] App code updated: VectorLoggerService integrated

---

## 💰 COST SUMMARY

| Item | Chi phí |
|------|---------|
| VPS (đã có) | $0 |
| ClickHouse (on-premise) | $0 |
| Vector (on-premise) | $0 |
| Grafana (on-premise) | $0 |
| **TOTAL** | **$0/tháng** |

**Tiết kiệm:** $50-100/tháng so với ClickHouse Cloud!

---

## 📞 SUPPORT

Nếu gặp vấn đề, check:
1. [SELF_HOST_LOGGING_GUIDE.md](SELF_HOST_LOGGING_GUIDE.md) - Full guide
2. [LOGGING_SYSTEM_ANALYSIS.md](LOGGING_SYSTEM_ANALYSIS.md) - Technical details
3. Docker logs: `docker logs <container_name>`
4. ClickHouse docs: https://clickhouse.com/docs
