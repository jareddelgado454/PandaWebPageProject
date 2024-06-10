// import { CognitoIdentityProviderClient, AdminSetUserPasswordCommand } from "@aws-sdk/client-cognito-identity-provider";
// import config from "@/amplifyconfiguration.json";

// export const AdminSetUserPassword = async(username, password) => {
    
//     try {
//         const client = new CognitoIdentityProviderClient({
//             region: 'us-east-1',
//         });
//         const input = {
//             UserPoolId: "us-east-1_H9Y0GkM7h",
//             Username: username,
//             Password: password,
//             Permanent: false,
//         };
//         const command = new AdminSetUserPasswordCommand(input);
//         const response = await client.send(command);
//         console.log(response);
//     } catch (error) {
//         console.log(error);
//     }

// }