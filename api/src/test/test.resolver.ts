import { Resolver, Query, Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType()
export class TestItem {
  @Field(() => String)
  name: string;
  
  @Field(() => Float)
  value: number;
}

@Resolver()
export class TestResolver {
  @Query(() => [TestItem])
  async testQuery(): Promise<TestItem[]> {
    return [
      {
        name: "test",
        value: 100,
      }
    ];
  }
}
