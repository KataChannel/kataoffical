import { Resolver } from '@nestjs/graphql';
import { createBaseResolver } from '../base/base.resolver';
import { User } from '../types/user.type';
import { CreateUserInput, UpdateUserInput, UserWhereInput, UserWhereUniqueInput } from '../inputs/user.input';
import { PrismaService } from '../../../prisma/prisma.service';

const BaseUserResolver = createBaseResolver(
  User,
  CreateUserInput,
  UpdateUserInput,
  UserWhereInput,
  UserWhereUniqueInput,
  'User',
);

@Resolver(() => User)
export class UserResolver extends BaseUserResolver {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  // Add custom resolver methods here if needed
  // For example:
  // @Query(() => [User])
  // async activeUsers(): Promise<User[]> {
  //   return this.prisma.user.findMany({ where: { isActive: true } });
  // }
}