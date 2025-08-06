import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UniversalResolver } from './resolvers/universal.resolver';
import { UniversalGraphQLService } from './services/universal.service';

@Module({
  imports: [PrismaModule],
  providers: [UniversalResolver, UniversalGraphQLService],
  exports: [UniversalGraphQLService],
})
export class GraphQLUniversalModule {}
