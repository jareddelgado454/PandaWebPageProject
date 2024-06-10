import gql from "graphql-tag";

export const listenToMessages = gql`
    subscription ListenToMessages($chatId: ID!) {
        onCreateMessage(filter: {chatId: {eq: $chatId}}){
            id
            chatId
            content
            image
            sender
            createdAt
        }
    }

`;