import { ObjectType, Field, ID, Int, InputType } from '@nestjs/graphql';
import { PaginationInfo } from './common.types';

@ObjectType()
export class Banggia {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  mabanggia?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  batdau?: Date;

  @Field(() => Date, { nullable: true })
  ketthuc?: Date;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  status?: string;

  @Field()
  isActive: boolean;

  @Field()
  isDefault: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  // Relations - Will be loaded via field resolver
  @Field(() => [String], { nullable: true }) // Using string array to avoid circular dependency
  sanphamIds?: string[];
}

@ObjectType()
export class BanggiaPaginated {
  @Field(() => [Banggia])
  data: Banggia[];

  @Field(() => PaginationInfo)
  pagination: PaginationInfo;
}

// Input Types
@InputType()
export class CreateBanggiaInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  mabanggia?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  batdau?: Date;

  @Field(() => Date, { nullable: true })
  ketthuc?: Date;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field({ defaultValue: false })
  isDefault: boolean;
}

@InputType()
export class UpdateBanggiaInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  mabanggia?: string;

  @Field({ nullable: true })
  type?: string;

  @Field(() => Date, { nullable: true })
  batdau?: Date;

  @Field(() => Date, { nullable: true })
  ketthuc?: Date;

  @Field(() => Int, { nullable: true })
  order?: number;

  @Field({ nullable: true })
  ghichu?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isDefault?: boolean;
}

@InputType()
export class BanggiaFilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  isDefault?: boolean;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  status?: string;
}
