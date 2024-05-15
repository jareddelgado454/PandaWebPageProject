import { gql } from "@apollo/client";

export const createOffer = gql`
  mutation MyMutation($input: CreateOfferInput!) {
    createOffer(input: $input) {
      id
      createdAt
      amount
      status
      serviceId
      technician {
        profilePicture
        id
        fullName
        rate
      }
    }
  }
`;