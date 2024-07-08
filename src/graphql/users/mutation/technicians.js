import gql from "graphql-tag";

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

export const updateStripeInformationTechnician = gql`
  mutation MyMutation($input: UpdateTechnicianInput!) {
    updateTechnician(input: $input){
      id
      stripeId
      stripeAccountStatus
    }
  }  
`;

export const updatePricesTechnician = gql`
  mutation MyMutation($input: UpdateTechnicianInput!) {
    updateTechnician(input: $input) {
      id
      diagnosticPrice
      repairPriceHour
    }
}
`;

export const updateLocationTechnician = gql`
  mutation MyMutation($input: UpdateTechnicianInput!) {
    updateTechnician(input: $input) {
      id
      loLatitude
      loLongitude
    }
}
`;
