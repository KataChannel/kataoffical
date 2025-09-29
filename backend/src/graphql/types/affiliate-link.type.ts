import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class AffiliateLink {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  codeId?: string;

  @Field({ nullable: true })
  landingPageId?: string;

  @Field({ nullable: true })
  campaignName?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  utmSource?: string;

  @Field({ nullable: true })
  utmMedium?: string;

  @Field({ nullable: true })
  utmCampaign?: string;

  @Field({ nullable: true })
  utmTerm?: string;

  @Field({ nullable: true })
  utmContent?: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => Int, { defaultValue: 1 })
  order: number;

  @Field({ defaultValue: true })
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  createdById?: string;

  // Relations will be added later
  // @Field(() => LandingPage, { nullable: true })
  // landingPage?: LandingPage;

  // @Field(() => User, { nullable: true })
  // createdBy?: User;
}