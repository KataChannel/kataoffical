import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  priority?: string;

  @Field(() => [String], { nullable: true })
  attachmentUrls?: string[];
}

@InputType()
export class UpdateTicketInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  priority?: string;
}

@InputType()
export class CreateResponseInput {
  @Field()
  content: string;

  @Field(() => [String], { nullable: true })
  attachmentUrls?: string[];
}