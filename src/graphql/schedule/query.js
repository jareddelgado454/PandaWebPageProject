import { gql } from "graphql-tag";

export const retrieveCustomerScheduledServices = gql`
    query MyQuery($customerId: ID!) {
        listScheduledServices(filter: {customerId: {eq: $customerId}}){
            items{
                id
                status
                offerStatus
                price
                type
                title
                createdAt
                scheduledStartDate
            }
        }
    }
`;

export const retrieveScheduledServiceFullDetail = gql`
    query MyQuery($id: ID!) {
        getScheduledService(id: $id) {
            id
            title
            type
            completed
            address
            createdAt
            customerId
            description
            destLatitude
            destLongitude
            fee
            offerStatus
            originLatitude
            originLongitude
            paymentMethod
            price
            scheduledEndDate
            scheduledServiceTechnicianSelectedId
            scheduledStartDate
            status
            technicianOfferedId
            total
            technicianSelected {
                id
                fullName
                profilePicture
                rate {
                    items {
                    id
                    rate
                    }
                }
                createdAt
                contactNumber
            }
        }
    }

`;

export const retrieveScheduledServicesByTechnicianId = gql`
    query MyQuery($technicianOfferedId: ID!) {
        listScheduledServices(filter: {technicianOfferedId: {eq: $technicianOfferedId}, status: {eq: "accepted"}}) {
            items {
                id
                scheduledStartDate
                scheduledEndDate
            }
        }
    }
`;