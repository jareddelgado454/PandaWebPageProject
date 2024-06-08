import gql from "graphql-tag";

export const listMyChats = gql`
query ListAllMyChats($customerId: ID!) {
	listChatsWithTechnicians: listChats(filter: {chatCustomerId: {eq: $customerId}, chatTechnicianSelectedId: {attributeExists: true}}) {
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
	        customer {
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
	listChatsWithAdmins: listChats(filter: {chatCustomerId: {eq: $customerId}, chatAdminId: {attributeExists: true}}) {
	    items {
	        id
	        chatCustomerId
	        chatAdminId
	        createdAt
	        updatedAt
	        admin {
	            profilePicture
	            fullName
	            id
	        }
	        customer {
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

export const listMyChatsAsAdmin = gql`
    query ListMyChats($adminId: ID!) {
        listChats(filter: {chatAdminId: {eq: $adminId}}) {
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

export const listMyChatWithAdmin = gql`
    query MyQuery($customerId: ID!, $adminId: ID!) {
        listChats(filter: {chatCustomerId: {eq: $customerId}, chatAdminId: {eq: $adminId}}){
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


export const getCustomerChatById = gql`
    query GetChatById($chatId: ID!) {
        getChat(id: $chatId){
            id
            customer{
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