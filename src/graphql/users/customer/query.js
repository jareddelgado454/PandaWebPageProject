import { gql } from 'graphql-tag';

export const listOffersByServiceId = gql`
    query ListOffersById($serviceId: ID) {
        listOffers(filter: {serviceId: {eq: $serviceId}}) {
            items {
                id
                status
                amount
                createdAt
                technician {
                    id
                    profilePicture
                    fullName
                    rate
                }
            }
        }
    }

`;