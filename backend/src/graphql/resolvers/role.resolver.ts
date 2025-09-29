import { Resolver } from '@nestjs/graphql';
import { createBaseResolver } from '../base/base.resolver';
import { Role, Permission } from '../types/role.type';
import { 
  CreateRoleInput, 
  UpdateRoleInput, 
  RoleWhereInput, 
  RoleWhereUniqueInput,
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionWhereInput,
  PermissionWhereUniqueInput
} from '../inputs/role.input';
import { PrismaService } from '../../../prisma/prisma.service';

// Role Resolver
const BaseRoleResolver = createBaseResolver(
  Role,
  CreateRoleInput,
  UpdateRoleInput,
  RoleWhereInput,
  RoleWhereUniqueInput,
  'Role',
);

@Resolver(() => Role)
export class RoleResolver extends BaseRoleResolver {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}

// Permission Resolver
const BasePermissionResolver = createBaseResolver(
  Permission,
  CreatePermissionInput,
  UpdatePermissionInput,
  PermissionWhereInput,
  PermissionWhereUniqueInput,
  'Permission',
);

@Resolver(() => Permission)
export class PermissionResolver extends BasePermissionResolver {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}