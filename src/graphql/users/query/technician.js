import { gql } from 'graphql-tag';

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

export const getStripeInformationTechnician = gql`
  query MyQuery($id: ID!) {
    getTechnician(id: $id) {
      stripeAccountStatus
      stripeId
    }
  }
`;

