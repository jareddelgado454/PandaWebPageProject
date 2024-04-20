import { gql } from 'graphql-tag';
export const createReport = gql`
    mutation MyMutation($input:CreateReportInput!){
    createReport(input: $input){
        id
        title
        description
    }
    }
`;