import { gql } from 'graphql-tag';

export const ListenService = gql`  
subscription ListenToService {
    onCreateService {
      id
      originLongitude
      originLatitude
      status
      customer {
        email
        fullName
        id
      }
      createdAt
      updatedAt
    }
  }
`;

export const listenUpdateService = gql`
subscription ListenSubscription ($serviceId:ID, $technicianId:ID) {
  onUpdateService(filter: {id: {eq: $serviceId}, serviceTechnicianSelectedId: {eq: $technicianId}}) {
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
    destLatitude
    destLongitude
    type
    createdAt
    updatedAt
  }
}
`;

