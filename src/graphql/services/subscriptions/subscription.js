import { gql } from 'graphql-tag';

export const ListenService = gql`  
subscription ListenToService {
    onCreateService {
      id
      originLongitude
      originLatitude
      status
      customer {
        email
        fullName
        id
      }
      createdAt
      updatedAt
    }
  }
`;