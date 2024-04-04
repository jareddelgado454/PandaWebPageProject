import { client } from '@/contexts/AmplifyContext';
import { getUserByCognitoID, getUserByEmail } from '@/graphql/custom-queries';
import { createUser } from '@/graphql/users/mutation/users';
export const handleCreateUserOnDatabase = async(values, isAdded) => {
    
    try {
        const { data } = await client.graphql({
            query: createUser,
            variables: {
                input: { ...values }
            },
            authMode: isAdded ? 'iam' : 'userPool'
        });
        console.log(data);
        console.log("added");
        return data;

    } catch (error) {
        console.log(error);
    }
}

export const handleRetrieveMyUser = async (cognitoId) => {
    try {

        const { data } = await client.graphql({
            query: getUserByCognitoID,
            variables: {
                cognitoId: cognitoId
            }
        });

        return data && data.listUsers.items[0];
    } catch (error) {
        console.log(error);
    }
}

export const getUserByMail = async (email) => {
    try {
        const { data } = await client.graphql({
            query: getUserByEmail,
            variables: {
                email: email
            }
        });

        return data && data.listUsers.items[0];
    } catch (error) {
        console.log(error);
    }
}