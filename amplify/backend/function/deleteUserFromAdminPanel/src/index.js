const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    const { id, username } = event.arguments;
    try {
        await deleteFromDynamo(id);

        await deleteFromCognito(username);

        return id;

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error' };
    }
};

const deleteFromDynamo = async (id) => {
    const params = {
        TableName: "User-yjp2laxn7fhihdb4oidvyc3hf4-dev",
        Key: { id }
    }
    try {
        await dynamoDb.delete(params).promise();
    } catch (error) {
        throw error;
    }
}

const deleteFromCognito = async(username) => {
    const params = {
        UserPoolId: 'us-east-1_H9Y0GkM7h',
        Username: username
    }
    try {
        await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
    } catch (error) {
        throw error;
    }
}