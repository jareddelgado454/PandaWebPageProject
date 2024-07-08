import { gql } from "graphql-tag";

export const updateStatus = gql`
  mutation UpdateUser($id: ID!, $status: String!, $email: String!) {
    updateUser(input: {id: $id, status: $status}, condition: {email: {eq: $email}}) {
      status
      email
    }
  }
`;

export const updateCustomerStatus = gql`
  mutation UpdateCustomerStatus($input: UpdateCustomerInput!) {
    updateCustomer(input: $input){
      id
      email
      fullName
      status
      contactNumber
      profilePicture
    }
  }
`;

export const updateTechnicianStatus = gql`
  mutation UpdateTechnicianStatus($input: UpdateTechnicianInput!) {
    updateTechnician(input: $input){
      id
      email
      fullName
      status
      contactNumber
      profilePicture
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

export const createUser = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      address
      city
      cognitoId
      contactNumber
      email
      fullName
      profilePicture
      rol
      state
      status
      subscription
      zipCode
    }
  }
`;