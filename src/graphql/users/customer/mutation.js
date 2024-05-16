import gql from "graphql-tag";

export const createService = gql`
    mutation CreateService($input: CreateServiceInput!) {
        createService(input: $input) {
            id
            originLatitude
            originLongitude
            status
            customer {
                id
                fullName
                email
                contactNumber
                profilePicture
            }
            createdAt
            updatedAt
        }
    }

`;

export const updateService = gql`
    mutation MyMutation($serviceId: ID!, $serviceTechnicianSelectedId: ID!) {
        updateService(input: {id: $serviceId, serviceTechnicianSelectedId: $serviceTechnicianSelectedId, destLatitude: -77.09353, destLongitude: -12.04109, type: "repair", status: "in progress"}){
            id
            originLatitude
            originLongitude
            status
            serviceTechnicianSelectedId
            technicianSelected{
                id
                email
                fullName
                contactNumber
                profilePicture
                rate
            }
            destLatitude
            destLongitude
            type
            createdAt
            updatedAt
        }
    }
`;