import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UniversalResolver } from './universal.resolver';
import { UniversalService } from './universal.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // Fix: Import AuthModule to get JwtService and JwtAuthGuard
  ],
  providers: [UniversalResolver, UniversalService],
  exports: [UniversalService],
})
export class GraphQLUniversalModule {}
