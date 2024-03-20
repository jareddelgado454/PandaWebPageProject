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
                profilePicture
                city
                state
                status
            }
        }
    }
`;

export const getUserByEmail = gql`
    query MyQuery($email: String!) {
        listUsers(filter: {email: {eq: $email}}) {
            items {
                id
                email
                fullName
                rol
                profilePicture
            }
        }
    }
`;