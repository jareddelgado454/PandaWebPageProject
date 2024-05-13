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
            }
            createdAt
            updatedAt
        }
    }

`;

export const updateService = gql`
    mutation updateService($input: UpdateServiceInput!) {
        updateService(input: $input){
            id
            title
            description
            type
            status
            originLatitude
            originLongitude
            customer{
                id
                email
                contactNumber
                profilePicture
            }
            technicianSelected{
                id
                email
                contactNumber
                profilePicture
            }
            destLatitude
            destLongitude
            updatedAt
        }
    }
`;