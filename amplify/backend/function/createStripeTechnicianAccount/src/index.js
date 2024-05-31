

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
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
        const accountStatus = account.requirements.currently_due.length === 0 ? 'verified' : 'pending_verification';

        const client = new DynamoDBClient({ region: 'us-east-1'})

        const params = {
            TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
            Key: { 
                "id": { S: technicianId }
            },
            UpdateExpression: 'set stripeId = :stripeId, stripeAccountStatus = :stripeAccountStatus',
            ExpressionAttributeValues: {
                ':stripeId': { S: account.id },
                ':stripeAccountStatus': { S: accountStatus },
            },
        };

        try {
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
