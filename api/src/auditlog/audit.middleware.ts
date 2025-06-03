import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuditMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  
  async use(req: Request & { auditOldValues?: any }, res: Response, next: NextFunction) {  
    // Lưu trữ giá trị cũ cho UPDATE operations
    // console.log('=== AUDIT MIDDLEWARE DEBUG ===');
    // console.log('Method:', req.method);
    // console.log('URL:', req.url);
    // console.log('Original URL:', req.originalUrl);
    // console.log('Base URL:', req.baseUrl);
    // console.log('Path:', req.path);
    // console.log('Params:', req.params);
    // console.log('Query:', req.query);
    // console.log('===============================');
    if (req.method === 'PUT' || req.method === 'PATCH') {
      try {
        console.log(`Processing ${req.method} request for URL: ${req.originalUrl}`);
        
        // Extract ID from params.path array or params.id
        const entityId = req.params?.id || (Array.isArray(req.params?.path) ? req.params.path[1] : null);
        
        if (entityId) {
          // Use originalUrl instead of url for route matching
          const oldData = await this.getOldData(req.originalUrl, entityId);
          req.auditOldValues = oldData;
        }
      } catch (error) {
        console.error('Failed to fetch old values for audit:', error);
      }
    }
    
    next();
  }

  private async getOldData(url: string, id: string): Promise<any> {
    console.log(`Fetching old data for URL: ${url} with ID: ${id}`);
    
    if (url.includes('/users/')) {
      return await this.prisma.user.findUnique({ where: { id } });
    }
    if (url.includes('/sanpham/')) {
      return await this.prisma.sanpham.findUnique({ where: { id } });
    }
    return null;
  }
}