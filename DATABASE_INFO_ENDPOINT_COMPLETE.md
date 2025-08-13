# Endpoint Database Info

## Endpoint đã được tạo thành công: `GET /database-info`

### Response mẫu:

```json
{
  "success": true,
  "database": {
    "type": "PostgreSQL",
    "name": "testdata",
    "host": "116.118.49.243",
    "port": "5432",
    "username": "AWois79wFA1bxMK",
    "version": "PostgreSQL 15.x",
    "current_user": "AWois79wFA1bxMK", 
    "server_address": "116.118.49.243",
    "server_port": 5432,
    "ssl_mode": "prefer",
    "schema": "public",
    "connection_url": "postgresql://AWois79wFA1bxMK:****@116.118.49.243:5432/testdata?schema=public"
  },
  "timestamp": "2025-08-13T15:32:00.000Z"
}
```

### Features:

1. **Database Type**: PostgreSQL
2. **Database Name**: Lấy từ connection string 
3. **Host & Port**: Thông tin server database
4. **Username**: User hiện tại đang kết nối
5. **Version**: Phiên bản PostgreSQL
6. **Security**: Ẩn password trong connection URL
7. **Schema**: Schema đang sử dụng
8. **SSL Mode**: Thông tin kết nối SSL
9. **Timestamp**: Thời gian request

### Cách sử dụng:

```bash
curl -X GET http://localhost:3331/database-info
```

### Code Implementation:

```typescript
async getDatabaseInfo() {
  try {
    // Lấy DATABASE_URL từ environment variables
    const databaseUrl = process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      throw new BadRequestException('DATABASE_URL not found in environment variables');
    }

    // Parse database URL để lấy thông tin
    const url = new URL(databaseUrl);
    
    // Thực hiện query để lấy thông tin database
    const result = await this.prisma.$queryRaw`
      SELECT 
        current_database() as database_name,
        version() as database_version,
        current_user as current_user,
        inet_server_addr() as server_address,
        inet_server_port() as server_port
    `;

    const dbInfo = Array.isArray(result) ? result[0] : result;

    return {
      success: true,
      database: {
        type: 'PostgreSQL',
        name: dbInfo.database_name,
        host: url.hostname,
        port: url.port || '5432',
        username: url.username,
        version: dbInfo.database_version,
        current_user: dbInfo.current_user,
        server_address: dbInfo.server_address,
        server_port: dbInfo.server_port,
        ssl_mode: url.searchParams.get('sslmode') || 'prefer',
        schema: url.searchParams.get('schema') || 'public',
        connection_url: databaseUrl.replace(/:[^:@]*@/, ':****@') // Ẩn password
      },
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error getting database info:', error);
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}
```

## Status: ✅ COMPLETED

Endpoint `/database-info` đã được implement thành công với đầy đủ thông tin:
- Database type và name
- Host, port, username  
- Version và connection details
- Error handling
- Security (ẩn password)
