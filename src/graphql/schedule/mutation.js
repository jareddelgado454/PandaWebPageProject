import { gql } from "graphql-tag";

export const createScheduleDService = gql`
mutation MyMutation($input: CreateScheduledServiceInput!) {
  createScheduledService(input: $input){
    id
    title
    description
    status
    address
    originLatitude
    originLongitude
    customer{
      id
      fullName
      profilePicture
      rate
    }
    car{
      id
      brand
      model
      image
    }
    createdAt
    updatedAt
  }
}
`;