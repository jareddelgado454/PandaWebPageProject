import { getServerSession } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { createUserPool } from "./cognitoUserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

export const authOptions = {
    providers : [
        CredentialsProvider({
            credentials:{
                email : { label:"Email",  type:"email" },
                password : { label:"Password", type : "password" }
            },
            async authorize(credentials) {
                if(!credentials || !credentials.email || !credentials.password){
                    throw new Error("Email and password are not defined correctly")
                }
                const UserPool = await createUserPool();
                const cognitoUser = new CognitoUser({
                    Username : credentials.email,
                    Pool : UserPool
                });
                
                const authenticationDetails = new AuthenticationDetails({
                    Username : credentials.email,
                    Password : credentials.password
                })

                return new Promise((resolve, reject)=>{
                    cognitoUser.authenticateUser(authenticationDetails,{
                        onSuccess : (result) => {
                            console.log("Cognito login success ", result);
                            const payload = result.getIdToken().payload;
                            resolve({
                                id : credentials.email,
                                email : credentials.email
                            })
                        },
                        onFailure : (err) => {
                            console.log("Cognito login failed: ", err);
                            if(err.code==="UserNotConfirmedException"){
                                resolve({
                                    id:credentials.email,
                                    email:"NOTVERIFIED"
                                })
                            }
                            reject(new Error(err.message) || "Cognito email auth failed" );
                        }
                    });
                });

            },
        })
    ],
    pages : {
        signIn : "/"
    },
    secret : process.env.NEXT_AUTH_SECRET,
    session : {
        strategy : "jwt"
    }
}

export const getSession =  () => {
    const session =  getServerSession(authOptions);
    return session;
}