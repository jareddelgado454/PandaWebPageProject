import { gql } from "@apollo/client";

export const createService = gql`
    mutation CreateService($input: CreateServiceInput!) {
        createService(input: $input){
            id
            title
            description
            type
            status
            originLatitude
            originLongitude
            customer {
                email
                fullName
            }
            createdAt
            updatedAt
        }
    }  
`;
