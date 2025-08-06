import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pageSize: number;

  @Field(() => Int)
  totalPages: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;
}

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 1 })
  page: number;

  @Field(() => Int, { defaultValue: 10 })
  pageSize: number;
}

@InputType()
export class SortInput {
  @Field()
  field: string;

  @Field({ defaultValue: 'desc' })
  direction: 'asc' | 'desc';
}

@InputType()
export class FilterInput {
  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field({ nullable: true })
  isActive?: boolean;
}
