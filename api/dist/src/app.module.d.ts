import { MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class AppModule {
    private readonly prismaService;
    configure(consumer: MiddlewareConsumer): void;
    constructor(prismaService: PrismaService);
}
