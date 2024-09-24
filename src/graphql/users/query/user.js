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

export const listDataToGraphs = gql`
  query ListData{
    listCustomers: listCustomers {
      items {
        id
        fullName
        email
        status
        profilePicture
        rate{
          items{
            id
            rate
          }
        }
        createdAt
      }
    }
    listTechnicians: listTechnicians {
      items {
        id
        fullName
        email
        status
        profilePicture
        rate{
          items{
            id
            rate
          }
        }
        createdAt
      }
    }
    listServices {
      items{
        id
        title
        status
        createdAt
      }
    }
  }

`;

export const listUsers = gql`
query ListUsers($currentAdminId: ID!) {
  listUsers(filter: {id: {notContains: $currentAdminId}}) {
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

export const listAllUsers = gql`
  query listAllUser {
    listUsers{
      items{
        id
        fullName
        email
        status
        profilePicture
        createdAt
      }
    }
    listTechnicians{
      items{
        id
        fullName
        email
        status
        profilePicture
        createdAt
      }
    }
    listCustomers{
      items{
        id
        fullName
        email
        status
        profilePicture
        createdAt
      }
    }
  }
`;