import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      cognitoId
      email
      role
      status
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

export const updateInformation = gql`
  mutation MyMutation($input: UpdateUserInput!, $email: String!) {
    updateUser(input: $input, condition: {email: {eq: $email}}){
      id
      email
      role
      fullName
      contactNumber
      status
      address
      password
      city
      state
    }
  }
`;

export const updateRol = gql`
  mutation MyMutation($input: UpdateUserInput!, $email: String!) {
    updateUser(condition: {email: {eq: $email}}, input: $input) {
      id
      email
      rol
    }
  }
`;