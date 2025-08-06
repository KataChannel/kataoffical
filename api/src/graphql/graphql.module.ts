import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UniversalResolver } from './resolvers/universal.resolver';
import { UniversalGraphQLService } from './services/universal.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // Fix: Import AuthModule to get JwtService and JwtAuthGuard
  ],
  providers: [UniversalResolver, UniversalGraphQLService],
  exports: [UniversalGraphQLService],
})
export class GraphQLUniversalModule {}
