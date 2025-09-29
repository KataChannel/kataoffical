import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { RoleResolver, PermissionResolver } from './resolvers/role.resolver';
import { AffiliateLinkResolver } from './resolvers/affiliate-link.resolver';
import { UniversalResolver } from './resolvers/universal.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { registerAllModels } from './dynamic/model-configs';

// Register all models on module initialization
registerAllModels();

@Module({
  imports: [PrismaModule],
  providers: [
    UserResolver,
    RoleResolver,
    PermissionResolver,
    AffiliateLinkResolver,
    UniversalResolver, // Universal resolver for all models
  ],
})
export class GraphQLResolversModule {}