import { gql } from "graphql-tag";

export const createCustomer = gql`
    mutation MyMutation($input: CreateCustomerInput!) {
        createCustomer(input: $input) {
            id
            fullName
            email
            
        }
    }
`;