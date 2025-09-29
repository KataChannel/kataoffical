import { Resolver } from '@nestjs/graphql';
import { createBaseResolver } from '../base/base.resolver';
import { AffiliateLink } from '../types/affiliate-link.type';
import { 
  CreateAffiliateLinkInput, 
  UpdateAffiliateLinkInput, 
  AffiliateLinkWhereInput, 
  AffiliateLinkWhereUniqueInput
} from '../inputs/affiliate-link.input';
import { PrismaService } from '../../../prisma/prisma.service';

const BaseAffiliateLinkResolver = createBaseResolver(
  AffiliateLink,
  CreateAffiliateLinkInput,
  UpdateAffiliateLinkInput,
  AffiliateLinkWhereInput,
  AffiliateLinkWhereUniqueInput,
  'AffiliateLink',
);

@Resolver(() => AffiliateLink)
export class AffiliateLinkResolver extends BaseAffiliateLinkResolver {
  constructor(prisma: PrismaService) {
    super(prisma);
  }
}