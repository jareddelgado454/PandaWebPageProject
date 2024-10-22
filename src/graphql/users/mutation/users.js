import { gql } from "graphql-tag";

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