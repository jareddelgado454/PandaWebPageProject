

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const {CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand} = require("@aws-sdk/client-cognito-identity-provider");
// import {
//     SecretsManagerClient,
//     GetSecretValueCommand,
// } from "@aws-sdk/client-secrets-manager";

exports.handler = async (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    const stripe = require('stripe')("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");
    const WEBHOOK_SECRET = "whsec_Fr2q4BYKacllhSNadRdInnD6mHzTlxHZ";
    const signHeader = event.headers['stripe-signature'];
    let stripeEvent;
    try {
        stripeEvent = stripe.webhooks.constructEvent(event.body, signHeader, WEBHOOK_SECRET);
    } catch (error) {
        console.error('Error verifying Stripe signature:', error);
        return {
            statusCode: 400,
            body: `Webhook Error: ${error}`,
        };
    }

    if (stripeEvent.type === 'account.updated') {
        const account = stripeEvent.data.object;
        const technicianId = account.metadata.technicianId;
        const cognitoUsername = account.metadata.cognitoUsername;
        const accountStatus = account.requirements.currently_due.length === 0 ? 'verified' : 'pending_verification';

        if (!technicianId || !cognitoUsername) {
            console.error('Missing technicianId or cognitoUsername in metadata');
            return {
                statusCode: 400,
                body: 'Missing technicianId or cognitoUsername in metadata',
            };
        }

        console.log("Faltaaaaaaaaaa", account.requirements);
        console.log("techniciaaaaaaaaaaId", technicianId, " Useeeeeeeeeeeeeeeeeeeername Cognito", cognitoUsername );

        const client = new DynamoDBClient({ region: 'us-east-1'});
        const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

        const cognitoUpdateParams = {
            UserPoolId: "us-east-1_H9Y0GkM7h",
            Username: cognitoUsername,
            UserAttributes: [
                { Name: "custom:stripeAccountStatus", Value: accountStatus }
            ]
        };

        const params = {
            TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
            Key: { 
                "id": { S: technicianId }
            },
            UpdateExpression: 'set stripeAccountStatus = :stripeAccountStatus',
            ExpressionAttributeValues: {
                ':stripeAccountStatus': { S: accountStatus }
            },
        };

        try {
            const cognitoUpdateCommand = new AdminUpdateUserAttributesCommand(cognitoUpdateParams);
            const cognitoUpdateData = await cognitoClient.send(cognitoUpdateCommand);
            console.log("Cognitoooooooo Updaaaaateeeeeeeed", cognitoUpdateData);

            const updateCommand = new UpdateItemCommand(params);
            const updateData = await client.send(updateCommand);
            console.log("After Updaaaaaaaaaaaaaaaaaaaaate Databaseeeee ", updateData);
        } catch (err) {
            console.error('DynamoDB Update Error:', err);
            return {
                statusCode: 500,
                body: `DynamoDB Update Error: ${err}`,
            };
        }
    }

    return {
        statusCode: 200,
        body: 'Webhook received successfully',
    };
};
