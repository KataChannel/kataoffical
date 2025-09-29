import { gql } from 'apollo-angular';

// Universal GraphQL operations for all models

export const FIND_ALL_UNIVERSAL = gql`
  query FindAllUniversal($modelName: String!, $where: String, $orderBy: String, $skip: Int, $take: Int) {
    findAllUniversal(modelName: $modelName, where: $where, orderBy: $orderBy, skip: $skip, take: $take)
  }
`;

export const FIND_ONE_UNIVERSAL = gql`
  query FindOneUniversal($modelName: String!, $where: String!) {
    findOneUniversal(modelName: $modelName, where: $where)
  }
`;

export const CREATE_ONE_UNIVERSAL = gql`
  mutation CreateOneUniversal($modelName: String!, $data: String!) {
    createOneUniversal(modelName: $modelName, data: $data)
  }
`;

export const CREATE_BULK_UNIVERSAL = gql`
  mutation CreateBulkUniversal($modelName: String!, $data: String!) {
    createBulkUniversal(modelName: $modelName, data: $data) {
      count
      successfulItems
      failedItems
    }
  }
`;

export const UPDATE_ONE_UNIVERSAL = gql`
  mutation UpdateOneUniversal($modelName: String!, $where: String!, $data: String!) {
    updateOneUniversal(modelName: $modelName, where: $where, data: $data)
  }
`;

export const UPDATE_BULK_UNIVERSAL = gql`
  mutation UpdateBulkUniversal($modelName: String!, $where: String!, $data: String!) {
    updateBulkUniversal(modelName: $modelName, where: $where, data: $data) {
      count
      successfulItems
      failedItems
    }
  }
`;

export const DELETE_ONE_UNIVERSAL = gql`
  mutation DeleteOneUniversal($modelName: String!, $where: String!) {
    deleteOneUniversal(modelName: $modelName, where: $where)
  }
`;

export const DELETE_BULK_UNIVERSAL = gql`
  mutation DeleteBulkUniversal($modelName: String!, $where: String!) {
    deleteBulkUniversal(modelName: $modelName, where: $where) {
      count
      successfulItems
      failedItems
    }
  }
`;