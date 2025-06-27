// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { CacheService } from '../cache/cache.service';
// import { Product, Prisma } from '@prisma/client';

// @Injectable()
// export class ProductService {
//   private readonly cachePrefix = 'product';
//   private readonly cacheTTL = 300; // 5 minutes

//   constructor(
//     private prisma: PrismaService,
//     private cacheService: CacheService,
//   ) {}

//   async findAll(params?: {
//     skip?: number;
//     take?: number;
//     cursor?: Prisma.ProductWhereUniqueInput;
//     where?: Prisma.ProductWhereInput;
//     orderBy?: Prisma.ProductOrderByWithRelationInput;
//     include?: Prisma.ProductInclude;
//   }): Promise<Product[]> {
//     return this.cacheService.getOrSet(this.cachePrefix,{ action: 'findAll', ...params },async () => 
//       {return this.prisma.product.findMany(params);},
//       { ttl: this.cacheTTL }
//     );
//   }

//   async findOne(id: number, include?: Prisma.ProductInclude): Promise<Product | null> {
//     return this.cacheService.getOrSet(
//       this.cachePrefix,
//       { action: 'findOne', id, include },
//       async () => {
//         return this.prisma.product.findUnique({
//           where: { id },
//           include,
//         });
//       },
//       { ttl: this.cacheTTL }
//     );
//   }

//   async findByCategory(categoryId: number): Promise<Product[]> {
//     return this.cacheService.getOrSet(
//       this.cachePrefix,
//       { action: 'findByCategory', categoryId },
//       async () => {
//         return this.prisma.product.findMany({
//           where: { categoryId },
//           include: { category: true },
//         });
//       },
//       { ttl: this.cacheTTL }
//     );
//   }

//   async create(data: Prisma.ProductCreateInput): Promise<Product> {
//     const product = await this.prisma.product.create({ data });
    
//     // Clear related caches
//     await this.clearProductCaches();
    
//     return product;
//   }

//   async update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
//     const product = await this.prisma.product.update({
//       where: { id },
//       data,
//     });

//     // Clear related caches
//     await this.clearProductCaches();
//     await this.cacheService.delByPattern(`${this.cachePrefix}:*${id}*`);

//     return product;
//   }

//   async delete(id: number): Promise<Product> {
//     const product = await this.prisma.product.delete({
//       where: { id },
//     });

//     // Clear related caches
//     await this.clearProductCaches();
//     await this.cacheService.delByPattern(`${this.cachePrefix}:*${id}*`);

//     return product;
//   }

//   async search(query: string, filters?: any): Promise<Product[]> {
//     return this.cacheService.getOrSet(
//       this.cachePrefix,
//       { action: 'search', query, filters },
//       async () => {
//         return this.prisma.product.findMany({
//           where: {
//             OR: [
//               { name: { contains: query, mode: 'insensitive' } },
//               { description: { contains: query, mode: 'insensitive' } },
//             ],
//             ...filters,
//           },
//           include: { category: true },
//         });
//       },
//       { ttl: this.cacheTTL }
//     );
//   }

//   private async clearProductCaches(): Promise<void> {
//     await this.cacheService.clearByPrefix(this.cachePrefix);
//     // Also clear category caches since they might include product counts
//     await this.cacheService.clearByPrefix('category');
//   }
// }