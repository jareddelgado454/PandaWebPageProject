import { gql } from "graphql-tag";

export const updateAdminStatus = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      status
    }
  }
`;