import { gql } from 'graphql-tag';

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      address
      city
      contactNumber
      email
      fullName
      profilePicture
      rol
      state
      zipCode
      subscription
      status
    }
  }
`;

export const listUsersForGraphics = gql`
  query ListUsers{
    listUsers {
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

export const listUsersFilter = gql`
  query ListUsers($email: String!, $rol: String!) {
    listUsers(filter: {email: {ne: $email}, rol: {eq: $rol}}) {
      items {
        id
        email
        rol
        fullName
        contactNumber
        status
        profilePicture
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
