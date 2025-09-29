import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/user.resolver';
import { RoleResolver, PermissionResolver } from './resolvers/role.resolver';
import { AffiliateLinkResolver } from './resolvers/affiliate-link.resolver';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    UserResolver,
    RoleResolver,
    PermissionResolver,
    AffiliateLinkResolver,
  ],
})
export class GraphQLResolversModule {}