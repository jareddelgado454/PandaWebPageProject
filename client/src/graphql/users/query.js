import { gql } from 'graphql-tag';

export const getUser = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      rol
      fullName
      contactNumber
      createdAt
      status
      address
      city
      state
      profilePicture
      review {
        id
        comment
        rate
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;

// export const listUsers = gql`
//   query ListUsers{
//     listUsers {
//       items {
//         id
//         email
//         rol
//         fullName
//         contactNumber
//         createdAt
//         status
//         address
//         city
//         state
//         profilePicture
//         updatedAt
//         __typename
//       }
//       nextToken
//       __typename
//     }
//   }
// `;

export const listUsers = gql`
  query ListUsers($email: String!, $rol: String!) {
    listUsers(filter: {email: {ne: $email}, rol: {eq: $rol}}) {
      items {
        id
        email
        rol
        fullName
        contactNumber
        createdAt
        status
        address
        city
        state
        profilePicture
        updatedAt
        __typename
      }
    }
  }
`;

export const getReview = `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      comment
      user {
        id
        email
        rol
        fullName
        contactNumber
        createdAt
        status
        address
        city
        state
        profilePicture
        updatedAt
        __typename
      }
      rate
      createdAt
      updatedAt
      __typename
    }
  }
`;

export const listReviews = `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        rate
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
