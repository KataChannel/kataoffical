import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SupportUser {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;
}

@ObjectType()
export class SupportAttachment {
  @Field(() => ID)
  id: string;

  @Field()
  fileName: string;

  @Field()
  fileType: string;

  @Field()
  fileSize: number;

  @Field()
  fileUrl: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class SupportResponse {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => SupportUser)
  user: SupportUser;

  @Field(() => [SupportAttachment])
  attachments: SupportAttachment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class SupportTicket {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field()
  priority: string;

  @Field(() => SupportUser)
  user: SupportUser;

  @Field(() => SupportUser, { nullable: true })
  technician?: SupportUser;

  @Field(() => [SupportResponse])
  responses: SupportResponse[];

  @Field(() => [SupportAttachment])
  attachments: SupportAttachment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}