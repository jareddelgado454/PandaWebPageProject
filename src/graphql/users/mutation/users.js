import { gql } from "@apollo/client";

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      cognitoId
      email
      role
      status
      subscription
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
  mutation MyMutation($id: ID!) {
    deleteUser(input: {id: $id}){
      id
    }
  }
`;

export const deleteCustomerFromDB = gql`
  mutation MyMutation($id: ID!) {
    deleteCustomer(input: {id: $id}){
      id
    }
  }

`;

export const updateInformation = gql`
  mutation MyMutation($input: UpdateUserInput!, $email: String!) {
    updateUser(input: $input, condition: {email: {eq: $email}}){
      id
      email
      fullName
      contactNumber
      status
    }
  }
`;

export const updateRol = gql`
  mutation MyMutation($input: UpdateUserInput!, $email: String!) {
    updateUser(condition: {email: {eq: $email}}, input: $input) {
      id
      email
      rol
      subscription
    }
  }
`;

export const updateSubscriptionAndFee = gql`
  mutation MyMutation($id: ID!, $subscription: String!, $fee: Int!) {
    updateUser(input: { id: $id, subscription: $subscription, fee: $fee }) {
      id
      email
      role
      status
      subscription
      fee
    }
  }
`;