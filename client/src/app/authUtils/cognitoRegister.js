"use server";

import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { createUserPool } from "./cognitoUserPool";

export const cognitoRegister = async ({ email, password, fullname, mobilephone }) => {
    return new Promise( async (resolve, reject) => {
        const UserPool = await createUserPool();
        const attributeList = [
            new CognitoUserAttribute({ Name : "email", Value : email }),
            new CognitoUserAttribute({ Name : "name", Value : fullname }),
            new CognitoUserAttribute({ Name : "phone_number", Value : mobilephone })
        ]
        UserPool.signUp(email, password, attributeList, [], (err, result) => {
            if(err){
                console.log("Cognito register error: ", err);
                reject(new Error(err.message) || "Cognito sign up failed");
            }
            console.log("Cognito registration result: ", result);
            const response = {
                userConfirmed : result?.userConfirmed,
                userSub : result?.userSub
            }
            resolve(response);
        });
    });
}