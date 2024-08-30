import { gql } from "graphql-tag";

export const onCreateOffers = gql`
    subscription ListenOffers($serviceId: ID) {
        onCreateOffer(filter: {status: {eq: "pending"}, serviceId: {eq: $serviceId}}) {
            id
            createdAt
            amount
            status
            serviceId
            service {
              customer {
                fullName
                profilePicture
              }
              car {
                brand
                model
                year
              }
            }
            technician {
                profilePicture
                id
                fullName
                loLatitude
      	        loLongitude
                  rate {
                    items{
                        id
                        rate
                        comment
                        createdById
                        createdBy
                        createdAt
                    }
                }
            }
        }
    }

`;

export const onUpdateService = gql`
    subscription MySubscription($serviceId: ID!, $customerId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}, customerId: {eq: $customerId}}){
            id
            status
            destLatitude
            destLongitude
        }
    }

`;

export const onUpdateServiceGlobal = gql`
  subscription OnUpdateService($serviceId: ID!, $customerId: ID!) {
    onUpdateService(filter: {id: {eq: $serviceId}, customerId: {eq: $customerId}}){
      id
      status
      destLatitude
      destLongitude
      paymentLink
      price
      tax
      total
    }
  }
`;

export const onUpdateServiceStatus = gql`
  subscription OnUpdateService($serviceId: ID!) {
    onUpdateService(filter: {id: {eq: $serviceId}}){
      id
      status
      destLatitude
      destLongitude
      paymentLink
      price
      tax
      total
    }
  }
`;


export const onUpdateServiceCoordinates = gql`
    subscription OnUpdateServiceCoordinates($serviceId: ID!, $customerId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}, customerId: {eq: $customerId}}){
            id
            destLatitude
            destLongitude
        }
    }

`;