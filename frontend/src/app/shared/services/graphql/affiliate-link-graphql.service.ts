import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BulkOperationResult } from './user-graphql.service';

// GraphQL queries and mutations
const GET_ALL_AFFILIATE_LINKS = gql`
  query FindAllAffiliateLinks($where: AffiliateLinkWhereInput, $orderBy: String, $skip: Int, $take: Int) {
    findAllAffiliateLinks(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      codeId
      landingPageId
      campaignName
      description
      utmSource
      utmMedium
      utmCampaign
      utmTerm
      utmContent
      url
      order
      isActive
      createdAt
      updatedAt
      createdById
    }
  }
`;

const GET_ONE_AFFILIATE_LINK = gql`
  query FindOneAffiliateLink($where: AffiliateLinkWhereUniqueInput!) {
    findOneAffiliateLink(where: $where) {
      id
      codeId
      landingPageId
      campaignName
      description
      utmSource
      utmMedium
      utmCampaign
      utmTerm
      utmContent
      url
      order
      isActive
      createdAt
      updatedAt
      createdById
    }
  }
`;

const COUNT_AFFILIATE_LINKS = gql`
  query CountAffiliateLinks($where: AffiliateLinkWhereInput) {
    countAffiliateLinks(where: $where)
  }
`;

const CREATE_AFFILIATE_LINK = gql`
  mutation CreateOneAffiliateLink($data: CreateAffiliateLinkInput!) {
    createOneAffiliateLink(data: $data) {
      id
      codeId
      landingPageId
      campaignName
      description
      utmSource
      utmMedium
      utmCampaign
      utmTerm
      utmContent
      url
      order
      isActive
      createdAt
      updatedAt
      createdById
    }
  }
`;

const CREATE_BULK_AFFILIATE_LINKS = gql`
  mutation CreateBulkAffiliateLinks($data: [CreateAffiliateLinkInput!]!) {
    createBulkAffiliateLinks(data: $data) {
      count
      success
      message
    }
  }
`;

const UPDATE_AFFILIATE_LINK = gql`
  mutation UpdateOneAffiliateLink($where: AffiliateLinkWhereUniqueInput!, $data: UpdateAffiliateLinkInput!) {
    updateOneAffiliateLink(where: $where, data: $data) {
      id
      codeId
      landingPageId
      campaignName
      description
      utmSource
      utmMedium
      utmCampaign
      utmTerm
      utmContent
      url
      order
      isActive
      createdAt
      updatedAt
      createdById
    }
  }
`;

const UPDATE_BULK_AFFILIATE_LINKS = gql`
  mutation UpdateBulkAffiliateLinks($where: AffiliateLinkWhereInput, $data: UpdateAffiliateLinkInput!) {
    updateBulkAffiliateLinks(where: $where, data: $data) {
      count
      success
      message
    }
  }
`;

const DELETE_AFFILIATE_LINK = gql`
  mutation DeleteOneAffiliateLink($where: AffiliateLinkWhereUniqueInput!) {
    deleteOneAffiliateLink(where: $where) {
      id
      campaignName
      url
    }
  }
`;

const DELETE_BULK_AFFILIATE_LINKS = gql`
  mutation DeleteBulkAffiliateLinks($where: AffiliateLinkWhereInput) {
    deleteBulkAffiliateLinks(where: $where) {
      count
      success
      message
    }
  }
`;

// TypeScript interfaces
export interface AffiliateLink {
  id: string;
  codeId?: string;
  landingPageId?: string;
  campaignName?: string;
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  url?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdById?: string;
}

export interface CreateAffiliateLinkInput {
  codeId?: string;
  landingPageId?: string;
  campaignName?: string;
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  url?: string;
  order?: number;
  isActive?: boolean;
  createdById?: string;
}

export interface UpdateAffiliateLinkInput {
  codeId?: string;
  landingPageId?: string;
  campaignName?: string;
  description?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  url?: string;
  order?: number;
  isActive?: boolean;
  createdById?: string;
}

export interface AffiliateLinkWhereInput {
  id?: string;
  codeId?: string;
  campaignName?: string;
  isActive?: boolean;
  createdById?: string;
}

export interface AffiliateLinkWhereUniqueInput {
  id?: string;
  codeId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AffiliateLinkGraphQLService {
  constructor(private apollo: Apollo) {}

  // Find all affiliate links with optional filters
  findAll(options?: {
    where?: AffiliateLinkWhereInput;
    orderBy?: string;
    skip?: number;
    take?: number;
  }): Observable<AffiliateLink[]> {
    return this.apollo
      .watchQuery<{ findAllAffiliateLinks: AffiliateLink[] }>({
        query: GET_ALL_AFFILIATE_LINKS,
        variables: options || {},
      })
      .valueChanges.pipe(map(result => result.data.findAllAffiliateLinks));
  }

  // Find one affiliate link by unique identifier
  findOne(where: AffiliateLinkWhereUniqueInput): Observable<AffiliateLink | null> {
    return this.apollo
      .watchQuery<{ findOneAffiliateLink: AffiliateLink | null }>({
        query: GET_ONE_AFFILIATE_LINK,
        variables: { where },
      })
      .valueChanges.pipe(map(result => result.data.findOneAffiliateLink));
  }

  // Count affiliate links with optional filters
  count(where?: AffiliateLinkWhereInput): Observable<number> {
    return this.apollo
      .watchQuery<{ countAffiliateLinks: number }>({
        query: COUNT_AFFILIATE_LINKS,
        variables: { where },
      })
      .valueChanges.pipe(map(result => result.data.countAffiliateLinks));
  }

  // Create a single affiliate link
  createOne(data: CreateAffiliateLinkInput): Observable<AffiliateLink> {
    return this.apollo
      .mutate<{ createOneAffiliateLink: AffiliateLink }>({
        mutation: CREATE_AFFILIATE_LINK,
        variables: { data },
      })
      .pipe(map(result => result.data!.createOneAffiliateLink));
  }

  // Create multiple affiliate links in bulk
  createBulk(data: CreateAffiliateLinkInput[]): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ createBulkAffiliateLinks: BulkOperationResult }>({
        mutation: CREATE_BULK_AFFILIATE_LINKS,
        variables: { data },
      })
      .pipe(map(result => result.data!.createBulkAffiliateLinks));
  }

  // Update a single affiliate link
  updateOne(where: AffiliateLinkWhereUniqueInput, data: UpdateAffiliateLinkInput): Observable<AffiliateLink> {
    return this.apollo
      .mutate<{ updateOneAffiliateLink: AffiliateLink }>({
        mutation: UPDATE_AFFILIATE_LINK,
        variables: { where, data },
      })
      .pipe(map(result => result.data!.updateOneAffiliateLink));
  }

  // Update multiple affiliate links in bulk
  updateBulk(where: AffiliateLinkWhereInput, data: UpdateAffiliateLinkInput): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ updateBulkAffiliateLinks: BulkOperationResult }>({
        mutation: UPDATE_BULK_AFFILIATE_LINKS,
        variables: { where, data },
      })
      .pipe(map(result => result.data!.updateBulkAffiliateLinks));
  }

  // Delete a single affiliate link
  deleteOne(where: AffiliateLinkWhereUniqueInput): Observable<Pick<AffiliateLink, 'id' | 'campaignName' | 'url'>> {
    return this.apollo
      .mutate<{ deleteOneAffiliateLink: Pick<AffiliateLink, 'id' | 'campaignName' | 'url'> }>({
        mutation: DELETE_AFFILIATE_LINK,
        variables: { where },
      })
      .pipe(map(result => result.data!.deleteOneAffiliateLink));
  }

  // Delete multiple affiliate links in bulk
  deleteBulk(where: AffiliateLinkWhereInput): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ deleteBulkAffiliateLinks: BulkOperationResult }>({
        mutation: DELETE_BULK_AFFILIATE_LINKS,
        variables: { where },
      })
      .pipe(map(result => result.data!.deleteBulkAffiliateLinks));
  }
}