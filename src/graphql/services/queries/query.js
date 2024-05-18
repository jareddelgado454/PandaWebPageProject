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
        serviceCustomerId
        originLongitude
        originLatitude
        id
        description
        createdAt
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
            serviceCustomerId
            serviceTechnicianSelectedId
            createdAt
            status
            title
            type
            updatedAt
            customer {
              fullName
            }
        }
    }
`;

export const listMyServices = gql`
  query ListServices($customerId: ID!) {
    listServices(filter: {serviceCustomerId: {eq: $customerId}}) {
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