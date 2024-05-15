import gql from "graphql-tag";
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

export const OnChangeStatusService = gql`
  mutation CancelService($input: UpdateServiceInput!){
    updateService(input: $input){
      id
      amount
      status
      serviceId
      technician {
        profilePicture
        id
        fullName
        rate
      }
      serviceTechnicianSelectedId
      serviceCustomerId
      createdAt
      updatedAt
      
    }
  }
`;