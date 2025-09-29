import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { Gender } from '../types/gender.enum';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  SDT?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  zaloId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  facebookId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  googleId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  provider?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  providerId?: string;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isCTV?: boolean;

  @Field({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  registrationSource?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  inviteCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  affiliateCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  referrerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  avatar?: string;

  @Field(() => Gender, { nullable: true })
  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  SDT?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  zaloId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  facebookId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  googleId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  provider?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  providerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isSuperAdmin?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isCTV?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  registrationSource?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  inviteCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  affiliateCode?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  referrerId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  ghichu?: string;
}

@InputType()
export class UserWhereInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isCTV?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

@InputType()
export class UserWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  inviteCode?: string;
}