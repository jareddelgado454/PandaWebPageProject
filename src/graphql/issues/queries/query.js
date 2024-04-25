import { gql } from 'graphql-tag';

export const getAllIssues = gql`
    query MyQuery {
        listReports {
            items {
            createdAt
            description
            id
            image
            title
            createdBy
            updatedAt
            status
            user {
                id
                city
                address
                cognitoId
                profilePicture
                fullName
                email
            }
            }
        }
    }
`;