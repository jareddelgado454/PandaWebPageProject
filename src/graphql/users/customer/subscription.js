import { gql } from "graphql-tag";

export const onCreateOffers = gql`
    subscription ListenOffers($serviceId: ID) {
        onCreateOffer(filter: {status: {eq: "accepted"}, serviceId: {eq: $serviceId}}) {
            id
            createdAt
            amount
            status
            technician {
                profilePicture
                id
                fullName
                rate
            }
            serviceId
        }
    }

`;

export const onUpdateServiceStatus = gql`
    subscription UpdateService($serviceId: ID!) {
        onUpdateService(filter: {id: {eq: $serviceId}}){
            status
        }
    }
`;