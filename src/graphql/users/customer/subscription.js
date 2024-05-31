import { gql } from "graphql-tag";

export const onCreateOffers = gql`
    subscription ListenOffers($serviceId: ID) {
        onCreateOffer(filter: {status: {eq: "accepted"}, serviceId: {eq: $serviceId}}) {
            id
            createdAt
            amount
            status
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
            
            serviceId
        }
    }

`;

export const onUpdateService = gql`
    subscription MySubscription($serviceId: ID!, $customerId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}, serviceCustomerId: {eq: $customerId}}){
            id
            status
            destLatitude
            destLongitude
        }
    }

`;

export const onUpdateServiceStatus = gql`
    subscription MySubscription($serviceId: ID!, $customerId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}, serviceCustomerId: {eq: $customerId}}){
            id
            status
        }
    }
`;

export const onUpdateServiceCoordinates = gql`
    subscription OnUpdateServiceCoordinates($serviceId: ID!, $customerId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}, serviceCustomerId: {eq: $customerId}}){
            id
            destLatitude
            destLongitude
        }
    }

`;