
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");
const {CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand} = require("@aws-sdk/client-cognito-identity-provider");

const TEST_SECRET_KEY = "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf"
const stripe = require("stripe")(TEST_SECRET_KEY);
const USERPOOL_ID = "us-east-1_H9Y0GkM7h"

exports.handler = async (event) => {
    const { action, userSub, username, email, stripeId } = JSON.parse(event.body);
    if (action === 'create') {
        return handleCreateStripeAccount(userSub, username, email);
    } else if (action === 'continueOnboarding') {
        return handleContinueOnboarding(stripeId);
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Invalid action' }),
        };
    }
};

const handleCreateStripeAccount = async (userSub, username, email) => {
    try {
        // Crear cuenta de Stripe
        const account = await stripe.accounts.create({
            type: "express",
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
            business_type: "individual",
            metadata: { technicianId: userSub, cognitoUsername: username },
            email: email,
        });

        // Actualizar DynamoDB
        const client = new DynamoDBClient({ region: 'us-east-1' });
        const params = {
            TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
            Key: { id: { S: userSub } },
            UpdateExpression: 'set stripeId = :stripeId, stripeAccountStatus = :stripeAccountStatus',
            ExpressionAttributeValues: {
                ':stripeId': { S: account.id },
                ':stripeAccountStatus': { S: 'incomplete' }
            },
        };
        await client.send(new UpdateItemCommand(params));
        console.log("saved in database stripeId")

        // Actualizar Cognito
        const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });
        const cognitoParams = {
            UserPoolId: USERPOOL_ID,
            Username: username,
            UserAttributes: [
                { Name: "custom:stripeId", Value: account.id },
                { Name: "custom:stripeAccountStatus", Value: 'incomplete' },
            ]
        };
        await cognitoClient.send(new AdminUpdateUserAttributesCommand(cognitoParams));
        console.log("saved in cognito stripeId")

        // Crear link de onboarding
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: "https://www.app.panda-mars.com/redirect-to-app-after-stripe/incompleted",
            return_url: "https://www.app.panda-mars.com/redirect-to-app-after-stripe/completed",
            type: "account_onboarding"
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: accountLink.url, stripeId:account.id }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};

const handleContinueOnboarding = async (stripeId) => {
    try {
        // Crear link de onboarding
        const accountLink = await stripe.accountLinks.create({
            account: stripeId,
            refresh_url: "https://www.app.panda-mars.com/redirect-to-app-after-stripe/incompleted",
            return_url: "https://www.app.panda-mars.com/redirect-to-app-after-stripe/completed",
            type: "account_onboarding"
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: accountLink.url }),
        };
    } catch (error) {
        console.error('Error during onboarding:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
