const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
var ses = new AWS.SES({ region: "us-east-1" });
const { v4: uuidv4 } = require('uuid');
exports.handler = async (event) => {
    const { user } = event.arguments;
    try {

        const userExistsInCognito = await checkUserInCognito(user.email);
        if (userExistsInCognito) {
            throw new Error(`The email ${user.email} is already being used`);
        }

        const timestamp = new Date().toISOString();
        user.id = uuidv4();
        user.createdAt = timestamp;
        user.updatedAt = timestamp;

        await createUserInCognito(user);

        await addUserToGroup(user.email, 'admin-access')

        await createUserOnDynamo(user);

        await sendTemporaryCredentials(user);

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const checkUserInCognito = async (email) => {
    const params = {
        UserPoolId: 'us-east-1_H9Y0GkM7h',
        Filter: `email = "${email}"`
    };

    const result = await cognitoIdentityServiceProvider.listUsers(params).promise();
    return result.Users.length > 0;
};

const createUserInCognito = async (user) => {
    try {
        const params = {
            UserPoolId: 'us-east-1_H9Y0GkM7h',
            Username: user.email,
            TemporaryPassword: user.temporaryPassword,
            UserAttributes: [
                { Name: 'email', Value: user.email },
                { Name: 'name', Value: user.fullName },
                { Name: 'custom:role', Value: 'admin' }
            ],
            MessageAction: 'SUPPRESS'
        };

        await cognitoIdentityServiceProvider.adminCreateUser(params).promise();
    } catch (error) {
        throw error;
    }
};

const addUserToGroup = async (username, userGroup) => {
    try {
        const params = {
            GroupName: userGroup,
            UserPoolId: 'us-east-1_H9Y0GkM7h',
            Username: username
        };
        await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    } catch (error) {
        throw error;
    }
};

const createUserOnDynamo = async (user) => {
    try {
        const params = {
            TableName: "User-yjp2laxn7fhihdb4oidvyc3hf4-dev",
            Item: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                status: user.status,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
         await dynamoDb.put(params).promise();
    } catch (error) {
        throw error;
    }
}

const sendTemporaryCredentials = async (user) => {
    try {
        const emailParams = {
            Destination: {
                ToAddresses: [user.email],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Hi ${user.fullName},\n\nYour temporary credentials are:\n\nEmail: ${user.email}\nPassword: ${user.temporaryPassword}\n\nPlease, change your password once you signIn for the first time in our system.`
                    }
                },
                Subject: { Data: "Your temporary credentials from The Panda" }
            },
            Source: "reply@panda-mars.com"
        };
        
        await ses.sendEmail(emailParams).promise();
    } catch (error) {
        throw error;
    }
}