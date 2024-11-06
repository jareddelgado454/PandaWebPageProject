import { gql } from "graphql-tag";
export const retrieveScheduledServicesByTechnicianId = gql`
    query MyQuery($technicianOfferedId: ID!) {
        listScheduledServices(filter: {technicianOfferedId: {eq: $technicianOfferedId}, status: {eq: "pending"}}) {
            items {
                id
                dateScheduled
            }
        }
    }
`;