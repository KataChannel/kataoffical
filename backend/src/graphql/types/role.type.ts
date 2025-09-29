import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations will be added later
  // @Field(() => [RolePermission], { nullable: true })
  // permissions?: RolePermission[];

  // @Field(() => [UserRole], { nullable: true })
  // users?: UserRole[];
}

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Relations will be added later
  // @Field(() => [RolePermission], { nullable: true })
  // roles?: RolePermission[];
}