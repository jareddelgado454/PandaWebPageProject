import { gql } from "graphql-tag";

export const ListenService = gql`
  subscription ListenToService {
    onCreateService {
      id
      originLongitude
      originLatitude
      status
      type
      customer {
        profilePicture
        fullName
        id
      }
      car {
        id
        brand
        model
        year
      }
      createdAt
      updatedAt
    }
  }
`;

export const listenUpdateService = gql`
  subscription ListenSubscription($serviceId: ID, $technicianId: ID) {
    onUpdateService(
      filter: {
        id: { eq: $serviceId }
        serviceTechnicianSelectedId: { eq: $technicianId }
      }
    ) {
      id
      originLatitude
      originLongitude
      status
      technicianSelected {
        id
        email
        fullName
        contactNumber
        profilePicture
      }
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
      destLatitude
      destLongitude
      type
      createdAt
      updatedAt
    }
  }
`;

export const listenDeleteService = gql`
  subscription MySubscription {
    onDeleteService {
      id
    }
  }
`;

export const onUpdateStatusServiceSubscription = gql`
  subscription OnUpdateService($serviceId: ID!, $technicianId: ID!) {
    onUpdateService(filter: {id: { eq: $serviceId } serviceTechnicianSelectedId: { eq: $technicianId }}){
      id
      status
    }
  }
`;

