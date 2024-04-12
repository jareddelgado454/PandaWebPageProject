/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_PANDAWEBAPP0A05BCD0_USERPOOLID
	STORAGE_PANDAWEBAPP_BUCKETNAME
	STRIPE_TEST_KEY
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient , UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
const { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

exports.handler = async (event) => {
  try {
      const secret_name = "STRIPE_TEST_KEY";
      const clientSecrets = new SecretsManagerClient({
        region: "us-east-1",
      });

      const response = await clientSecrets.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", 
        })
      );

      const secret = JSON.parse(response.SecretString);
      console.log("This are the secreeeeeeeeeeets", secret);

      const stripe = require('stripe')(secret.STRIPE_TEST_KEY);

      const signHeader = event.headers['stripe-signature'];
      const eventBody = event.body;

      const eventReceived = stripe.webhooks.constructEvent(eventBody, 
        signHeader,
        secret.STRIPE_WEBHOOK_SECRET,
      );

      switch( eventReceived.type ){
          case "checkout.session.completed" : 
              const checkoutSessionCompleted = eventReceived.data.object
              console.log({checkoutSessionCompleted})

              const idPassed = checkoutSessionCompleted.metadata?.idDatabase;
              const cognitoUsername = checkoutSessionCompleted.metadata?.cognitoUsername;
              if(!idPassed || !cognitoUsername){
                  console.log("Missing hashedUserId in metadata. Skipping user lookup.");
                  break;
              }
              console.log("idPassed", idPassed);
              console.log("cognitoUsername", cognitoUsername);

              const client = new DynamoDBClient({ region: 'us-east-1'});
              const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

              const cognitoUpdateParams = {
                  UserPoolId: secret.PANDA_WEB_USER_POOL,
                  Username: cognitoUsername,
                  UserAttributes: [
                      { Name: "custom:subscription", Value: `${checkoutSessionCompleted.amount_total === 500000 ? "annual" : "monthly"}` },
                      { Name: "custom:fee", Value: "0" }
                  ]
              };

              const updateParams = {
                  TableName: "User-yjp2laxn7fhihdb4oidvyc3hf4-dev",
                  Key: {
                      "id": { S: idPassed } 
                  },
                  UpdateExpression: "SET subscription = :subscriptionValue, fee = :feeValue",
                  ExpressionAttributeValues: {
                      ":subscriptionValue": { S: `${checkoutSessionCompleted.amount_total == 500000 ? "annual" : "monthly"}` },
                      ":feeValue": { N: "0" } 
                  },
                  ReturnValues: "UPDATED_NEW"
              };

              console.log("Before Updaaaaaaaaaaaaaaaaaaaaate");

              try {

                const cognitoUpdateCommand = new AdminUpdateUserAttributesCommand(cognitoUpdateParams);
                const cognitoUpdateData = await cognitoClient.send(cognitoUpdateCommand);
                console.log("Cognitoooooooo Updaaaaateeeeeeeed", cognitoUpdateData);

                const updateCommand = new UpdateItemCommand(updateParams);
                const updateData = await client.send(updateCommand);

                console.log("After Updaaaaaaaaaaaaaaaaaaaaate Databaseeeee ", updateData);
              }catch(error){
                    console.log(error);
              }

              break;
          default : 
              console.log("unhandled event")
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Succeed' })
      };
  
    } catch (error) {
      console.error('An error ocurred:', error);
      return {
          statusCode: 500,
          body: JSON.stringify({ message: 'Error ocurred' })
      };
  }
};
