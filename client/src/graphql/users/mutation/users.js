import { gql} from "@apollo/client";

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
      rol
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