import {gql} from "graphql-tag";

export const createChat = gql`
mutation CreateChat($customerId: ID!, $technicianId: ID!) {
  createChat(input: {chatCustomerId: $customerId, chatTechnicianSelectedId: $technicianId}) {
    id
    chatCustomerId
    technicianSelected{
      id
      fullName
      profilePicture
    }
    messages{
      items{
        id
        content
        createdAt
      }
    }
  	createdAt
  }
}
`;

export const createChatAsAdmin = gql`
  mutation CreateChat($customerId: ID!, $adminId: ID!) {
    createChat(input: {chatCustomerId: $customerId, chatAdminId: $adminId}) {
      id
      chatCustomerId
      technicianSelected{
        id
        fullName
        profilePicture
      }
      messages{
        items{
          id
          content
          createdAt
        }
      }
      createdAt
    }
  }
`;

export const createMessage = gql`
  mutation CreateMessage($chatId: ID!, $content: String!, $senderId: ID!) {
    createMessage(input: {chatId: $chatId, content: $content, sender: $senderId}){
      id
      chatId
      content
      sender
      createdAt
    }
  }
`;

export const createImageMessage = gql`
  mutation CreateImageMessage($chatId: ID!, $image: String!, $senderId: ID!, $content: String!) {
    createMessage(input: {chatId: $chatId, image: $image, sender: $senderId, content: $content}){
      id
      chatId
      content
      image
      sender
      createdAt
    }
  }
`;