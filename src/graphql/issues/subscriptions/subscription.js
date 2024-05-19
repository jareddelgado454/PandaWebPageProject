import { gql } from 'graphql-tag';

export const ListenAnswersById = gql`
    subscription ListenAnswersById($reportId: ID!) {
        onCreateAnswer(filter: {reportId: {eq: $reportId}}) {
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

export const ListenStatusReportById = gql`
    subscription OnUpdateStatus($id: ID!) {
        onUpdateReport(filter: {id: {eq: $id}}) {
            id
            status
            description
            image
            title
            createdBy
            createdAt
            user {
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

export const onUpdateReport = gql`
    subscription OnUpdateStatus {
        onUpdateReport {
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

export const onDeleteAnswersSubscription = gql`
    subscription OnDeleteAnswer {
        onDeleteAnswer {
            id
        }
    }

`;