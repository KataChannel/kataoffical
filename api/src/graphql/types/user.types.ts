import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { PaginationInfo } from './common.types';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field(() => ID)
  userId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  bio?: string;
}

@ObjectType()
export class Role {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => [Permission])
  permissions: Permission[];
}

@ObjectType()
export class Permission {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  codeId?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  group?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  order?: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  SDT?: string;

  @Field({ nullable: true })
  provider?: string;

  @Field({ nullable: true })
  providerId?: string;

  @Field()
  isActive: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field(() => [Role])
  roles: Role[];
}

@ObjectType()
export class UserPaginated {
  @Field(() => [User])
  data: User[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  SDT?: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  provider?: string;

  @Field({ nullable: true })
  providerId?: string;

  @Field({ defaultValue: false })
  isActive: boolean;
}

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  SDT?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}

@InputType()
export class UserFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  provider?: string;
}
