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
                    profilePicture
                    fullName
                    email
                }
                answers {
                    items {
                        id
                        user {
                            email
                            fullName
                            id
                            profilePicture
                        }
                        text
                        createdAt
                    }
                }
            }
        }
    }
`;

export const getAnswersByReport = gql`
    query ListAnswersByReportId($reportId: ID!) {
        listAnswers(filter: {reportId: {eq: $reportId}}){
            items{
            id
            user {
                id
                email
                fullName
                profilePicture
            }
            text
            reportId
            createdAt
        }
  }
}
`;