import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BulkOperationResult {
  @Field(() => Int)
  count: number;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}