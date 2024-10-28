import { gql } from "graphql-tag";

export const getAllRequestServices = gql`
  query MyQuery {
    listServices {
      items {
        updatedAt
        type
        title
        status
        serviceTechnicianSelectedId
        customerId
        originLongitude
        originLatitude
        id
        description
        createdAt
        car{
          id
          brand
          model
          year
        }
      }
    }
  }
`;

export const getRequestServiceById = gql`
    query MyQuery($id: ID!) {
        getService(id: $id){
            description
            id
            originLatitude
            originLongitude
            customerId
            serviceTechnicianSelectedId
            createdAt
            status
            title
            type
            updatedAt
            customer {
              fullName
            }
            car{
              id
              brand
              model
              year
            }
        }
    }
`;

export const listMyServices = gql`
  query ListServices($customerId: ID!) {
    listServices(filter: {customerId: {eq: $customerId}}) {
    items {
      id
      status
      price
      type
      title
      createdAt
    }
  }
  }
`;

export const listMyServicesHome = gql`
  query ListMyServices($customerId: ID!) {
    listServices(filter: {customerId: {eq: $customerId}}, limit: 5) {
      items {
        id
        car {
          id
          image
        }
        createdAt
        total
        title
        type
        status
      }
    }
  }
`;


export const getServiceById = gql`
    query getService($serviceId: ID!) {
    getService(id: $serviceId){
        id
        title
        description
        type
        status
        completed
        originLatitude
        originLongitude
        tax
        price
        total
        paymentMethod
        paymentLink
        completed
        car{
            id
            brand
            model
            year
        }
        customer{
            id
            fullName
        }
        technicianSelected{
            id
            email
            fullName
            contactNumber
            profilePicture
            suscription
            stripeId
            rate {
              items{
                rate
              }
            }
            createdAt
        }
        destLatitude
        destLongitude
    }
    }
`;

export const listTechnicians = gql`
query ListTechnicians {
  listTechnicians(filter: {status: {eq: "active"}}) {
    items {
      id
      fullName
      loLatitude
      loLongitude
    }
  }
}
`
export const getNearbyTechnicians = gql`
  query getNearByTechnicians($lat: Float!, $lon: Float!) {
    getNearbyTechnicians(lat: $lat, lon: $lon){
      id
      email
      profilePicture
      loLatitude
      loLongitude
    }
  }
`;