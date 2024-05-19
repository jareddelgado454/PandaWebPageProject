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
      role
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
        role
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
        role
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

export const listCustomers = gql`
  query ListCustomers {
    listCustomers {
      items {
          id
          email
          fullName
          contactNumber
          status
          profilePicture
          createdAt
      }
    }
  }
`;


export const listTechnicians = gql`
  query ListTechnicians {
    listTechnicians {
      items{
            id
            email
            fullName
            contactNumber
            status
            profilePicture
            createdAt
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
        role
        cognitoId
        rate
      }
    }
  }
`;