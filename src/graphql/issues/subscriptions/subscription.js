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