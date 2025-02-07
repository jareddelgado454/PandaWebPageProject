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
      fullName
      profilePicture
      loLatitude
      loLongitude
      rate{
        items {
          rate
        }
      }
      schedule {
      monday {
        closing
        opening
      }
      friday {
        closing
        opening
      }
      saturday {
        closing
        opening
      }
      sunday {
        closing
        opening
      }
      thursday {
        closing
        opening
      }
      tuesday {
        closing
        opening
      }
      wednesday {
        closing
        opening
      }
    }
      scheduleType
      createdAt
    }
  }
`;

export const listCurrentService = gql`
query MyQuery($customerId: ID!) {
  listServices(filter: {or: [{status: {eq: "service accepted"}}, {status: {eq: "on the way"}}, {status: {eq: "in progress"}}, {status: {eq: "payment"}}], serviceTechnicianSelectedId: {ne: null}, customerId: {eq: $customerId}}) {
      items {
        id
        customerId
        customer {
          id
          fullName
          fcmToken
          email
          profilePicture
          rate
        }
        car {
          id
          brand
          identificationNumber
          image
          model
          year
        }
        title
        description
        status
        address
        destLatitude
        destLongitude
        originLatitude
        originLongitude
        paymentMethod
        price
        tax
        total
        serviceTechnicianSelectedId
        technicianSelected {
          id
          email
          fullName
          contactNumber
          profilePicture
          stripeId
          createdAt
          rate {
            items {
              rate
            }
          }
        }
      }
    }
  }
`;