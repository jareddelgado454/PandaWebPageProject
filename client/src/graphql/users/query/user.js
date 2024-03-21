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

export const GetEmailById = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      email
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

export const listUsers = gql`
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

export const filterUserByRate = gql`
  query MyQuery {
    listUsers(filter: {rate: {between: [4, 5]}}) {
      items {
        fullName
        id
        email
        profilePicture
        rol
        cognitoId
        rate
      }
    }
  }
`;