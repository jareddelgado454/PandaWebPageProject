/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");

const stripe = require("stripe")("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf"); 

exports.handler = async (event) => {
    const { subscriptionId, cognitoUsername, idPassed } = JSON.parse(event.body);

    if (!subscriptionId || !cognitoUsername || !idPassed) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Subscription ID, Cognito Username, and Database ID are required" }),
        };
    }

    try {
        const cancellation = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true,
        });
        console.log("Subscription cancellation status in Stripe:", cancellation);

        const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });
        const cognitoUpdateParams = {
            UserPoolId: "us-east-1_H9Y0GkM7h",
            Username: cognitoUsername,
            UserAttributes: [
                { Name: "custom:subscriptionStatus", Value: "cancelled" }
            ]
        };
        const cognitoUpdateCommand = new AdminUpdateUserAttributesCommand(cognitoUpdateParams);
        const cognitoUpdateData = await cognitoClient.send(cognitoUpdateCommand);
        console.log("Cognito user updated with status 'cancelled':", cognitoUpdateData);

        const client = new DynamoDBClient({ region: 'us-east-1' });
        const updateParams = {
            TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
            Key: {
                "id": { S: idPassed }
            },
            UpdateExpression: "SET subscriptionStatus = :subscriptionStatus",
            ExpressionAttributeValues: {
                ":subscriptionStatus": { S: "cancelled" }
            },
            ReturnValues: "UPDATED_NEW"
        };
        const updateCommand = new UpdateItemCommand(updateParams);
        const updateData = await client.send(updateCommand);
        console.log("DynamoDB item updated with status 'cancelled':", updateData);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Subscription cancelled and status updated in Cognito and DynamoDB", cancellation }),
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to cancel subscription and update status", error: error.message }),
        };
    }
}