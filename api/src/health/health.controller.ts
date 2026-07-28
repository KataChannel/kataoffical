import { Controller, Get } from '@nestjs/common';
import { ServerStabilityService } from '../common/server-stability.service';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(
    private readonly serverStability: ServerStabilityService,
    private readonly prisma: PrismaService
  ) {}

  @Get()
  async getHealth() {
    return this.serverStability.getHealthStatus();
  }

  @Get('detailed')
  async getDetailedHealth() {
    const basicHealth = await this.serverStability.getHealthStatus();
    
    // Additional detailed checks
    const dbConnectionsCount = await this.getDatabaseConnectionsCount();
    const processStats = this.getProcessStats();
    
    return {
      ...basicHealth,
      detailed: {
        database: {
          ...basicHealth.database,
          connectionsCount: dbConnectionsCount,
        },
        process: processStats,
        environment: {
          nodeVersion: process.version,
          platform: process.platform,
          arch: process.arch,
        }
      }
    };
  }

  @Get('readiness')
  async getReadiness() {
    try {
      // Check database connectivity
      await this.prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'ready',
        timestamp: new Date().toISOString(),
        checks: {
          database: 'ok'
        }
      };
    } catch (error) {
      return {
        status: 'not ready',
        timestamp: new Date().toISOString(),
        checks: {
          database: 'failed'
        },
        error: error.message
      };
    }
  }

  @Get('liveness')
  async getLiveness() {
    const memUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
    
    // Consider unhealthy if memory usage is extremely high
    const isHealthy = heapUsedMB < 2048; // 2GB threshold
    
    return {
      status: isHealthy ? 'alive' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      memoryUsage: heapUsedMB
    };
  }

  private async getDatabaseConnectionsCount(): Promise<number> {
    try {
      // For PostgreSQL, get active connection count
      const result = await this.prisma.$queryRaw<{count: bigint}[]>`
        SELECT count(*) as count 
        FROM pg_stat_activity 
        WHERE state = 'active'
      `;
      return Number(result[0]?.count || 0);
    } catch (error) {
      return -1; // Indicate error
    }
  }

  private getProcessStats() {
    const cpuUsage = process.cpuUsage();
    const memUsage = process.memoryUsage();
    
    return {
      pid: process.pid,
      uptime: Math.floor(process.uptime()),
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system
      },
      memory: {
        rss: Math.round(memUsage.rss / 1024 / 1024),
        heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
        heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
        external: Math.round(memUsage.external / 1024 / 1024)
      }
    };
  }
}
