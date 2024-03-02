"use server"

import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolId = process.env.COGNITO_ID;
const clientId = process.env.COGNITO_CLIENT_ID;

if(!userPoolId || !clientId){
    throw new Error("Cognito environment is not defined");
}

const poolData = {
    UserPoolId : userPoolId,
    ClientId : clientId
}

export const createUserPool = async () => {
    return new CognitoUserPool(poolData);
}