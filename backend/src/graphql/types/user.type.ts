import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender } from './gender.enum';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  codeId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => Gender, { nullable: true })
  gender?: Gender;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  SDT?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  zaloId?: string;

  @Field({ nullable: true })
  facebookId?: string;

  @Field({ nullable: true })
  googleId?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  provider?: string;

  @Field({ nullable: true })
  providerId?: string;

  @Field()
  isSuperAdmin: boolean;

  @Field()
  isCTV: boolean;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  registrationSource?: string;

  @Field({ nullable: true })
  inviteCode?: string;

  @Field({ nullable: true })
  affiliateCode?: string;

  @Field({ nullable: true })
  referrerId?: string;

  @Field({ nullable: true })
  ghichu?: string;

  // Relations will be added later
  // @Field(() => [AuditLog], { nullable: true })
  // audits?: AuditLog[];

  // @Field(() => User, { nullable: true })
  // referrer?: User;

  // @Field(() => [User], { nullable: true })
  // referrals?: User[];
}