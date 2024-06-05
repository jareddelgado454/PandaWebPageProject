import gql from "graphql-tag";

export const listMyChats = gql`
    query ListMyChats($customerId: ID!) {
        listChats(filter: {chatCustomerId: {eq: $customerId}}) {
            items {
                id
                chatCustomerId
                chatTechnicianSelectedId
                createdAt
                updatedAt
                technicianSelected {
                    address
                    profilePicture
                    fullName
                    id
                }
                customer{
                    id
                    fullName
                    profilePicture
                }
                messages {
                    items {
                        id
                        chatId
                        content
                        createdAt
                    }
                }
            }
        }
    }
`;

export const listMyChatWithTechnician = gql`
    query MyQuery($customerId: ID!, $technicianId: ID!) {
        listChats(filter: {chatCustomerId: {eq: $customerId}, chatTechnicianSelectedId: {eq: $technicianId}}){
            items{
                id
            }
        }
    }

`;

export const getChatById = gql`
    query GetChatById($chatId: ID!) {
        getChat(id: $chatId){
            id
            technicianSelected{
                id
                email
                fullName
                profilePicture
            }
            messages{
                items{
                    id
                    content
                    sender
                    chatId
                    createdAt
                }
            }
            createdAt
        }
    }
`;