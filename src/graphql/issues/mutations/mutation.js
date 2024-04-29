import { gql } from 'graphql-tag';
export const createReport = gql`
    mutation MyMutation($input:CreateReportInput!){
    createReport(input: $input){
        id
        title
        description
    }
    }
`;

export const UpdateReportStatus = gql`
    mutation UpdateReportStatus($input: UpdateReportInput!) {
        updateReport(input: $input) {
            id
            user {
            id
            email
            }
            title
            description
            reportUserId
            createdBy
        }
    }
`;

export const DeleteReportById = gql`
    mutation DeleteReportById($reportId: ID!) {
        deleteReport(input: { id: $reportId })
        {
            id
        }
    }
`;

export const AnswerReport = gql`
    mutation AnswerReport($input: CreateAnswerInput!) {
        createAnswer(input: $input){
            id
            text
            reportId
            answerUserId
            createdAt
            user{
                id
                email
                fullName
                profilePicture
            }
        }
    }
`;