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
            profilePicture
            rate{ items { id rate } }
            createdAt
        }
    }
`;

export const retrieveMyAuthInformation = gql`
    query GetCustomer($id: ID!) {
        getCustomer(id: $id){
            id
            email
            fullName
        }
    }
`;

export const retrieveCustomerRate = gql`
    query GetCustomer($id: ID!) {
        getCustomer(id: $id){
            id
            rate{
                items{
                    rate
                }
            }
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
                            createdById
                            createdBy
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