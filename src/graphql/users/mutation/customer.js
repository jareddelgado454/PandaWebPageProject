import { gql } from "@apollo/client";

export const createCustomer = gql`
    mutation MyMutation($input: CreateCustomerInput!) {
        createCustomer(input: $input) {
            id
            fullName
            email
            
        }
    }
`;