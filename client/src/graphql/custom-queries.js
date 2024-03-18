import { gql } from 'graphql-tag';

export const getUserByCognitoID = gql`
    query MyQuery($cognitoId: String!) {
        listUsers(filter: {cognitoId: {eq: $cognitoId}}) {
            items {
                rol
                fullName
                id
                email
                address
                zipCode
                contactNumber
                city
                status
            }
        }
    }
`;