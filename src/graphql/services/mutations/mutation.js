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

export const OnChangeStatusServiceByCustomer = gql`
  mutation UpdateService($input: UpdateServiceInput!, $customerId: ID!) {
    updateService(input: $input, condition: {serviceCustomerId: {eq: $customerId}}) {
      id
      status
      completed
      serviceCustomerId
      serviceTechnicianSelectedId
    }
  }

`;

export const DeleteMyRequest = gql`
  mutation DeleteRequest($serviceId: ID!, $serviceCustomerId: ID!) {
    deleteService(input: {id: $serviceId}, condition: {serviceCustomerId: {eq: $serviceCustomerId}}){
      id
    }
  }

`;