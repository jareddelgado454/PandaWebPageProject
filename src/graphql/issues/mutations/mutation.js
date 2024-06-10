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
    mutation UpdateReportStatus($id: ID!, $status: ReportStatus!) {
        updateReport(input: {id: $id, status: $status}) {
            id
            status
            description
            image
            title
            createdBy
            createdAt
            customer {
                id
                fullName
                email
                profilePicture
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

export const onDeleteAnswerById = gql`
    mutation DeleteAnswer($input: DeleteAnswerInput!, $reportId: ID!, $userId: ID!) {
        deleteAnswer(input: $input, condition: {reportId: {eq: $reportId}, and: {answerUserId: {eq: $userId}}}) {
            id
        }
    }
`;