import { gql } from "graphql-tag";

export const updateAdminStatus = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      status
    }
  }
`;

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      fullName
      status
    }
  }
`;

export const createUserFromDB = gql`
  mutation MyMutation($user: CreateUserDBInput!) {
    createUserFromAdminPanel(user: $user){
      id
      fullName
    }
  }
`;

export const updateStatus = gql`
  mutation UpdateUser($id: ID!, $status: String!, $email: String!) {
    updateUser(input: {id: $id, status: $status}, condition: {email: {eq: $email}}) {
      status
      email
    }
  }
`;

export const deleteUserById = gql`
  mutation MyMutation($id: ID!, $email: String!) {
    deleteUser(input: {id: $id}, condition: {email: {eq: $email}})
    {
      id
    }
  }

`;

export const deleteUserFromDB = gql`
  mutation MyMutation($id: ID!, $username: String!) {
    deleteUserFromAdminPanel(id: $id, username: $username)
  }
`;