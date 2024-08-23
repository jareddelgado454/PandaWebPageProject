import { gql } from 'graphql-tag';

export const getAllIssues = gql`
    query ListAllReports {
        listCustomerReports: listReports(filter: {reportCustomerId: {attributeExists: true}}){
            items {
            id
            title
            description     
            image
            status
            createdBy
            customer {
                id
                profilePicture
                fullName
                email
            }
            answers {
                items {
                    id
                text
                user {
                    email
                    fullName
                    id
                    profilePicture
                }
                createdAt
                updatedAt
                }
            }
            createdAt
            }
        }
        listTechnicianReports: listReports(filter: {reportTechnicianId: {attributeExists: true}}){
            items {
            id
            title
            description     
            image
            status
            createdBy
            technician{
                id
                fullName
                profilePicture
                email
            }
            answers {
                items {
                    id
                text
                user {
                    email
                    fullName
                    id
                    profilePicture
                }
                createdAt
                updatedAt
                }
            }
            createdAt
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