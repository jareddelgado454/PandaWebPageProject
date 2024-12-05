import { gql } from "graphql-tag";

export const onUpdateScheduledService = gql`
    subscription MySubscription($serviceId: ID!, $customerId: ID!) {
        onUpdateScheduledService(filter: {id: {eq: $serviceId}, customerId: {eq: $customerId}}){
            id
            status
            destLatitude
            destLongitude
            price
            fee
            total
        }
    }
`;