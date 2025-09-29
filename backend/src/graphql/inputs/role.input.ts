import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

// Role Inputs
@InputType()
export class CreateRoleInput {
  @Field()
  @IsString()
  name: string;
}

@InputType()
export class UpdateRoleInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

@InputType()
export class RoleWhereInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

@InputType()
export class RoleWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

// Permission Inputs
@InputType()
export class CreatePermissionInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

@InputType()
export class UpdatePermissionInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;
}

@InputType()
export class PermissionWhereInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}

@InputType()
export class PermissionWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;
}