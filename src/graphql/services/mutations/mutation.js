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
        loLatitude
    		loLongitude
        rate {
          items{
            rate
          }
        }
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

export const updateTechnicianLocation = gql`
  mutation MyMutation ($input: UpdateServiceInput!, $serviceCustomerId: ID!) {
    updateService(input: $input, condition: {serviceCustomerId: {eq: $serviceCustomerId}}) {
      id
      destLatitude
      destLongitude
      status
      serviceCustomerId
    }
  }
`;

export const updateStatusService = gql`
  mutation MyMutation($serviceId: ID!, $status: String!){
    updateService(input: { id: $serviceId, status: $status }) {
      id
      status
      serviceCustomerId
      serviceTechnicianSelectedId
    }
  }
`;

export const createTechnicianRate = gql`
  mutation CreateTechnicianRate($rate: Float!, $comment: String!, $technicianId: ID!, $customerId: ID!) {
    createRate(input: {rate: $rate, comment: $comment, rateCustomerId: $customerId, technicianId: $technicianId}){
      id
      comment
    }
  }
`;