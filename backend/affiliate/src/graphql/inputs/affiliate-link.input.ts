import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

@InputType()
export class CreateAffiliateLinkInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  landingPageId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  campaignName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmSource?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmMedium?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmCampaign?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmContent?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Field(() => Int, { defaultValue: 1 })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field({ defaultValue: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  createdById?: string;
}

@InputType()
export class UpdateAffiliateLinkInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  landingPageId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  campaignName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmSource?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmMedium?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmCampaign?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  utmContent?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  url?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  order?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  createdById?: string;
}

@InputType()
export class AffiliateLinkWhereInput {
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
  campaignName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  createdById?: string;
}

@InputType()
export class AffiliateLinkWhereUniqueInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  id?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  codeId?: string;
}