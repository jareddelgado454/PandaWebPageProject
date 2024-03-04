"use server";

import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { createUserPool } from "./cognitoUserPool";
import { createUser } from "@/graphql/users/mutation";
import {client} from "../admin-dashboard/layout";

export const cognitoRegister = async ({ email, password, fullname, contactNumber, rol, status, address, city, state, profilepicture, subscription, zipcode }) => {
    return new Promise( async (resolve, reject) => {
        try{
            const UserPool = await createUserPool();
            const attributeList = [
                new CognitoUserAttribute({ Name : "email", Value : email }),
                new CognitoUserAttribute({ Name : "name", Value : fullname }),
                new CognitoUserAttribute({ Name : "phone_number", Value : contactNumber })
            ]
            UserPool.signUp(email, password, attributeList, [], async (err, result) => {
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
            })
        }catch(error){
            console.log("Error during registration: ", error);
            reject(new Error(error.message) || "Registration failed");
        }
    });
}