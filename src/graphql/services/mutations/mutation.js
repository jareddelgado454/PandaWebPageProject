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
    updateService(input: $input, condition: {customerId: {eq: $customerId}}) {
      id
      completed
      serviceTechnicianSelectedId
      originLatitude
      originLongitude
      destLatitude
      destLongitude
      status
      type
      customer {
        id
        profilePicture
        fullName
      }
      car {
        id
        image
        brand
        model
      }
    }
  }

`;

export const DeleteMyRequest = gql`
  mutation DeleteRequest($serviceId: ID!, $serviceCustomerId: ID!) {
    deleteService(input: {id: $serviceId}, condition: {customerId: {eq: $serviceCustomerId}}){
      id
    }
  }

`;

export const updateTechnicianLocation = gql`
  mutation MyMutation ($input: UpdateServiceInput!, $customerId: ID!) {
    updateService(input: $input, condition: {customerId: {eq: $customerId}}) {
      id
      destLatitude
      destLongitude
      status
      customerId
    }
  }
`;

export const updateStatusService = gql`
  mutation MyMutation($serviceId: ID!, $status: String!){
    updateService(input: { id: $serviceId, status: $status }) {
      id
      status
      customerId
      completed
      serviceTechnicianSelectedId
      originLatitude
      originLongitude
      destLatitude
      destLongitude
      status
      type
      customer {
        id
        profilePicture
        fullName
      }
      car {
        id
        image
        brand
        model
      }
    }
  }
`;

export const updateStatusServiceWithInput = gql`
  mutation MyMutation($input: UpdateServiceInput!){
    updateService(input: $input) {
      id
      status
      customerId
      completed
      serviceTechnicianSelectedId
      originLatitude
      originLongitude
      destLatitude
      destLongitude
      status
      type
      customer {
        id
        profilePicture
        fullName
      }
      car {
        id
        image
        brand
        model
      }
    }
  }
`;

export const updateTotalAmountService = gql`
  mutation MyMutation($serviceId: ID!, $total: Float!){
    updateService(input: { id: $serviceId, total: $total }) {
      id
      total
      price
      tax
      status
      customerId
      paymentLink
    }
  }
`;

export const updatePaymentLinkService = gql`
  mutation MyMutation($serviceId: ID!, $paymentLink: String!){
    updateService(input: { id: $serviceId, paymentLink: $paymentLink }) {
      id
      paymentLink
    }
  }
`;

export const createTechnicianRate = gql`
  mutation CreateTechnicianRate($rate: Float!, $comment: String!, $technicianId: ID!, $customerId: ID!) {
    createRate(input: {rate: $rate, comment: $comment, rateCreatedById: $customerId, technicianId: $technicianId}){
      id
      comment
    }
  }
`;