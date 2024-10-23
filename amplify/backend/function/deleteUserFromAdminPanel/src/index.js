const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    const { id, username, role } = event.arguments;

    try {

        switch (role) {
            case "customer":
                await deleteCustomerFromDynamo(id);
                break;

            case "technician":
                await deleteTechnicianFromDynamo(id);
                break;
        
            default:
                await removeFromGroup(username, 'admin-access');
                await deleteAdminFromDynamo(id);
                break;
        }

        await deleteFromCognito(username);

        return id;

    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error' };
    }
};

const deleteAdminFromDynamo = async (id) => {
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

const deleteCustomerFromDynamo = async (id) => {
    const params = {
        TableName: "Customer-yjp2laxn7fhihdb4oidvyc3hf4-dev",
        Key: { id }
    }
    try {
        await dynamoDb.delete(params).promise();
    } catch (error) {
        throw error;
    }
}

const deleteTechnicianFromDynamo = async (id) => {
    const params = {
        TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
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

const removeFromGroup = async (username, userGroup) => {
    const params = {
        GroupName: userGroup,
        UserPoolId: 'us-east-1_H9Y0GkM7h',
        Username: username
    };
    try {
        await cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params).promise();
        console.log(`User ${username} removed from group ${userGroup}`);
    } catch (error) {
        throw error;
    }
};