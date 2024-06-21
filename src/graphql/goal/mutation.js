import { gql } from "graphql-tag";
export const updateGoalValue = gql`
    mutation UpdateGoalForThisMonth($input: UpdateGoalInput!) {
        updateGoal(input: $input){
            id
            goal
        }
    }
`;
export const deleteMonthlyGoal = gql`
    mutation DeleteMonthlyGoal($goalId: ID!) {
        deleteGoal(input: {id: $goalId}){
            id
        }
    }
`;

export const createMonthlyGoal = gql`
    mutation DeleteMonthlyGoal($input: CreateGoalInput!) {
        createGoal(input: $input) {
            id
            type
            goal
        }
    }
`;