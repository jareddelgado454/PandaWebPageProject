import { gql } from 'graphql-tag';

export const retrieveMyInformation = gql`
    query GetCustomer($id: ID!) {
        getCustomer(id: $id){
            id
            email
            fullName
            contactNumber
            state
            city
            address
            zipCode
            profilePicture
            createdAt
        }
    }
`;

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
                    loLatitude
                    loLongitude
                    rate {
                        items{
                            id
                            rate
                            comment
                            createdBy{
                                id
                                fullName
                                profilePicture
                            }
                            createdAt
                        }
                    }
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
                identificationNumber
                createdAt
            }
        }
    }
`;

export const verifyIfCustomerRated = gql`
    query ListRates($customerId: String!) {
        listRates(filter: {customer: {eq: $customerId}}){
            items{
                id
            }
        }
    }
`;