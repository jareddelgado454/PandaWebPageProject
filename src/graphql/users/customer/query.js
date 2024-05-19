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
                serviceId
            }
        }
    }

`;

export const listCarsById = gql`
    query retrieveMyCars($customerId: ID!) {
        listCars(filter: {customerCarsId: {eq: $customerId}}){
            items{
                id
                brand
                image
                model
                year
                createdAt
            }
        }
    }
`;