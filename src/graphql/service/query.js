import { gql } from "graphql-tag";

export const getServiceById = gql`
    query getService($serviceId: ID!) {
    getService(id: $serviceId){
        id
        title
        description
        type
        status
        originLatitude
        originLongitude
        customer{
            id
            fullName
            contactNumber
        }
        technicianSelected{
            id
            email
            fullName
            contactNumber
            profilePicture
            rate
            createdAt
        }
        destLatitude
        destLongitude
    }
    }
`;