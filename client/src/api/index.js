import { client } from '@/app/contexts/AmplifyContext';
import { getUserByCognitoID } from '@/graphql/custom-queries';
import { createUser } from '@/graphql/users/mutation/users';
export const handleCreateUserOnDatabase = async(values) => {
    try {

        console.log(values);

        await client.graphql({
            query: createUser,
            variables: {
                input: { ...values }
            },
            authMode: 'apiKey',
        });

        console.log("added");

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

        return data && data.listUsers.items.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
    }
}