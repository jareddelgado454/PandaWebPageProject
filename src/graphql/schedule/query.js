import { gql } from "graphql-tag";

export const retrieveCustomerScheduledServices = gql`
    query MyQuery($customerId: ID!) {
        listScheduledServices(filter: {customerId: {eq: $customerId}}){
            items{
                id
                status
                price
                type
                title
                createdAt
            }
        }
    }
`;

export const retrieveScheduledServicesByTechnicianId = gql`
    query MyQuery($technicianOfferedId: ID!) {
        listScheduledServices(filter: {technicianOfferedId: {eq: $technicianOfferedId}, status: {eq: "pending"}}) {
            items {
                id
                dateStartScheduled
                dateEndScheduled
            }
        }
    }
`;