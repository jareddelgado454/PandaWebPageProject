import { gql } from 'graphql-tag';

export const getTehcnicianById = gql`
query GetTechnician($id: ID!) {
    getTechnician(id: $id) {
      id
      email
      fullName
      contactNumber
      status
      profilePicture
      subscription
      repairPriceHour
      diagnosticPrice
      fee
    }
  }
`;

export const getTechnician = gql`
  query GetTechnician($id: ID!) {
    getTechnician(id: $id) {
      id
      email
      fullName
      contactNumber
      status
      address
      city
      state
      profilePicture
      zipCode
      subscription
      repairPriceHour
      diagnosticPrice
      fee
      schedule {
        monday {
            opening
            closing
        }
        tuesday {
            opening
            closing
        }
        wednesday {
            opening
            closing
        }
        thursday {
            opening
            closing
        }
        friday {
            opening
            closing
        }
        saturday {
            opening
            closing
        }
        sunday {
            opening
            closing
        }
      }
    }
  }
`;

export const getPricesTechnician = gql`
  query MyQuery($id: ID!) {
    getTechnician(id: $id) {
      repairPriceHour
      diagnosticPrice
    }
  }
`;

export const getSubscriptionExpirationDate = gql`
  query MyQuery($id: ID!) {
    getTechnician(id: $id) {
      subscriptionExpirationDate
    }
  }
`;

export const getStripeInformationTechnician = gql`
  query MyQuery($id: ID!) {
    getTechnician(id: $id) {
      stripeAccountStatus
      stripeId
    }
  }
`;

export const getProfilePicture = gql`
  query MyQuery($id: ID!) {
    getTechnician(id: $id) {
      id
      profilePicture
    }
  }
`;

export const LIST_MY_CHATS = gql`
query ListAllMyChats($technicianId: ID!) {
    listChatsWithTechnicians: listChats(filter: {chatTechnicianSelectedId: {eq: $technicianId}, chatCustomerId: {attributeExists: true}}) {
        items {
            id
            chatCustomerId
            chatTechnicianSelectedId
            createdAt
            updatedAt
            customer {
                id
                fullName
                profilePicture
            }
            messages {
                items {
                    id
                    sender
                    chatId
                    content
                    image
                    createdAt
                }
            }
        }
    }
    listChatsWithAdmins: listChats(filter: {chatTechnicianSelectedId: {eq: $technicianId}, chatAdminId: {attributeExists: true}}) {
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
            messages {
                items {
                    id
                    sender
                    chatId
                    content
                    image
                    createdAt
                }
            }
        }
    }
}
`;

