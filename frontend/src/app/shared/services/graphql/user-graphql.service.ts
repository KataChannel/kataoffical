import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// GraphQL queries and mutations
const GET_ALL_USERS = gql`
  query FindAllUsers($where: UserWhereInput, $orderBy: String, $skip: Int, $take: Int) {
    findAllUsers(where: $where, orderBy: $orderBy, skip: $skip, take: $take) {
      id
      codeId
      name
      avatar
      gender
      email
      SDT
      phone
      zaloId
      facebookId
      googleId
      isSuperAdmin
      isCTV
      isActive
      createdAt
      updatedAt
      registrationSource
      inviteCode
      affiliateCode
      referrerId
      ghichu
    }
  }
`;

const GET_ONE_USER = gql`
  query FindOneUser($where: UserWhereUniqueInput!) {
    findOneUser(where: $where) {
      id
      codeId
      name
      avatar
      gender
      email
      SDT
      phone
      zaloId
      facebookId
      googleId
      isSuperAdmin
      isCTV
      isActive
      createdAt
      updatedAt
      registrationSource
      inviteCode
      affiliateCode
      referrerId
      ghichu
    }
  }
`;

const COUNT_USERS = gql`
  query CountUsers($where: UserWhereInput) {
    countUsers(where: $where)
  }
`;

const CREATE_USER = gql`
  mutation CreateOneUser($data: CreateUserInput!) {
    createOneUser(data: $data) {
      id
      codeId
      name
      avatar
      gender
      email
      SDT
      phone
      zaloId
      facebookId
      googleId
      isSuperAdmin
      isCTV
      isActive
      createdAt
      updatedAt
      registrationSource
      inviteCode
      affiliateCode
      referrerId
      ghichu
    }
  }
`;

const CREATE_BULK_USERS = gql`
  mutation CreateBulkUsers($data: [CreateUserInput!]!) {
    createBulkUsers(data: $data) {
      count
      success
      message
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateOneUser($where: UserWhereUniqueInput!, $data: UpdateUserInput!) {
    updateOneUser(where: $where, data: $data) {
      id
      codeId
      name
      avatar
      gender
      email
      SDT
      phone
      zaloId
      facebookId
      googleId
      isSuperAdmin
      isCTV
      isActive
      createdAt
      updatedAt
      registrationSource
      inviteCode
      affiliateCode
      referrerId
      ghichu
    }
  }
`;

const UPDATE_BULK_USERS = gql`
  mutation UpdateBulkUsers($where: UserWhereInput, $data: UpdateUserInput!) {
    updateBulkUsers(where: $where, data: $data) {
      count
      success
      message
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteOneUser($where: UserWhereUniqueInput!) {
    deleteOneUser(where: $where) {
      id
      name
      email
    }
  }
`;

const DELETE_BULK_USERS = gql`
  mutation DeleteBulkUsers($where: UserWhereInput) {
    deleteBulkUsers(where: $where) {
      count
      success
      message
    }
  }
`;

// TypeScript interfaces matching backend models
export interface User {
  id: string;
  codeId?: string;
  name?: string;
  avatar?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  SDT?: string;
  phone?: string;
  zaloId?: string;
  facebookId?: string;
  googleId?: string;
  isSuperAdmin: boolean;
  isCTV: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  registrationSource?: string;
  inviteCode?: string;
  affiliateCode?: string;
  referrerId?: string;
  ghichu?: string;
}

export interface CreateUserInput {
  codeId?: string;
  name?: string;
  avatar?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  SDT?: string;
  phone?: string;
  zaloId?: string;
  facebookId?: string;
  googleId?: string;
  password?: string;
  provider?: string;
  providerId?: string;
  isSuperAdmin?: boolean;
  isCTV?: boolean;
  isActive?: boolean;
  registrationSource?: string;
  inviteCode?: string;
  affiliateCode?: string;
  referrerId?: string;
  ghichu?: string;
}

export interface UpdateUserInput {
  codeId?: string;
  name?: string;
  avatar?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  email?: string;
  SDT?: string;
  phone?: string;
  zaloId?: string;
  facebookId?: string;
  googleId?: string;
  password?: string;
  provider?: string;
  providerId?: string;
  isSuperAdmin?: boolean;
  isCTV?: boolean;
  isActive?: boolean;
  registrationSource?: string;
  inviteCode?: string;
  affiliateCode?: string;
  referrerId?: string;
  ghichu?: string;
}

export interface UserWhereInput {
  id?: string;
  codeId?: string;
  name?: string;
  email?: string;
  phone?: string;
  isCTV?: boolean;
  isActive?: boolean;
}

export interface UserWhereUniqueInput {
  id?: string;
  codeId?: string;
  inviteCode?: string;
}

export interface BulkOperationResult {
  count: number;
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserGraphQLService {
  constructor(private apollo: Apollo) {}

  // Find all users with optional filters
  findAll(options?: {
    where?: UserWhereInput;
    orderBy?: string;
    skip?: number;
    take?: number;
  }): Observable<User[]> {
    return this.apollo
      .watchQuery<{ findAllUsers: User[] }>({
        query: GET_ALL_USERS,
        variables: options || {},
      })
      .valueChanges.pipe(map(result => result.data.findAllUsers));
  }

  // Find one user by unique identifier
  findOne(where: UserWhereUniqueInput): Observable<User | null> {
    return this.apollo
      .watchQuery<{ findOneUser: User | null }>({
        query: GET_ONE_USER,
        variables: { where },
      })
      .valueChanges.pipe(map(result => result.data.findOneUser));
  }

  // Count users with optional filters
  count(where?: UserWhereInput): Observable<number> {
    return this.apollo
      .watchQuery<{ countUsers: number }>({
        query: COUNT_USERS,
        variables: { where },
      })
      .valueChanges.pipe(map(result => result.data.countUsers));
  }

  // Create a single user
  createOne(data: CreateUserInput): Observable<User> {
    return this.apollo
      .mutate<{ createOneUser: User }>({
        mutation: CREATE_USER,
        variables: { data },
      })
      .pipe(map(result => result.data!.createOneUser));
  }

  // Create multiple users in bulk
  createBulk(data: CreateUserInput[]): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ createBulkUsers: BulkOperationResult }>({
        mutation: CREATE_BULK_USERS,
        variables: { data },
      })
      .pipe(map(result => result.data!.createBulkUsers));
  }

  // Update a single user
  updateOne(where: UserWhereUniqueInput, data: UpdateUserInput): Observable<User> {
    return this.apollo
      .mutate<{ updateOneUser: User }>({
        mutation: UPDATE_USER,
        variables: { where, data },
      })
      .pipe(map(result => result.data!.updateOneUser));
  }

  // Update multiple users in bulk
  updateBulk(where: UserWhereInput, data: UpdateUserInput): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ updateBulkUsers: BulkOperationResult }>({
        mutation: UPDATE_BULK_USERS,
        variables: { where, data },
      })
      .pipe(map(result => result.data!.updateBulkUsers));
  }

  // Delete a single user
  deleteOne(where: UserWhereUniqueInput): Observable<Pick<User, 'id' | 'name' | 'email'>> {
    return this.apollo
      .mutate<{ deleteOneUser: Pick<User, 'id' | 'name' | 'email'> }>({
        mutation: DELETE_USER,
        variables: { where },
      })
      .pipe(map(result => result.data!.deleteOneUser));
  }

  // Delete multiple users in bulk
  deleteBulk(where: UserWhereInput): Observable<BulkOperationResult> {
    return this.apollo
      .mutate<{ deleteBulkUsers: BulkOperationResult }>({
        mutation: DELETE_BULK_USERS,
        variables: { where },
      })
      .pipe(map(result => result.data!.deleteBulkUsers));
  }
}