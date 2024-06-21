import { gql } from 'graphql-tag';

export const getUserByCognitoID = gql`
    query MyQuery($cognitoId: String!) {
        listUsers(filter: {cognitoId: {eq: $cognitoId}}) {
            items {
                fullName
                id
                email
                contactNumber
                profilePicture
                status
            }
        }
    }
`;
export const getUser = gql`
    query GetUser($userId: ID!){
        getUser(id: $userId){
            id
            profilePicture
        }
    }
`;

export const getUserByEmail = gql`
    query MyQuery($email: String!) {
        listUsers(filter: {email: {eq: $email}}) {
            items {
                id
                email
                fullName
                profilePicture
            }
        }
    }
`;

export const getGoalPerMonth = gql`
query listGoalPerMonth($month: String!) {
  listGoals(filter: {monthYear: {eq: $month}}){
    items
    {
      id
      type
      goal
      monthYear
      createdAt
    }
  }
}
`;