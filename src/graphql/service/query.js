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
        price
        repairPrice
        total
        paymentMethod
        car{
            id
            brand
            model
            year
        }
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
            createdAt
        }
        destLatitude
        destLongitude
    }
    }
`;