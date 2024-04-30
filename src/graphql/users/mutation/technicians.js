import { gql } from "@apollo/client";

export const createTechnician = gql`
  mutation CreateTechnician($input: CreateTechnicianInput!) {
    createTechnician(input: $input) {
      id
    }
  }
`;