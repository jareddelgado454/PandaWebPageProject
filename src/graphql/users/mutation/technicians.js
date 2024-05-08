import { gql } from "@apollo/client";

export const createTechnician = gql`
  mutation CreateTechnician($input: CreateTechnicianInput!) {
    createTechnician(input: $input) {
      id
    }
  }
`;

export const updatePersonalInformationTechnician = gql`
  mutation MyMutation($input: UpdateTechnicianInput!, $id: String!) {
    updateTechnician(input: $input, condition: {id: {eq: $id}}){
      address
      city
      state
      status
      zipCode
      contactNumber
    }
  }
`;