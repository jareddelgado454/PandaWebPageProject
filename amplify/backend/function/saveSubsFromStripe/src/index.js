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

const stripe = require('stripe')("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");

exports.handler = async (event) => {

  try {
      const signHeader = event.headers['stripe-signature'];
      const eventBody = event.body;
      const STRIPE_WEBHOOK_SECRET = "whsec_GuTmaAuH7TIzAd8FuJi7QEy7yKAEcb4C" 
      console.log( "eventBodyyyy",eventBody, "  ....signHeadeeeeeeeeeeeer",signHeader);

      const eventReceived = stripe.webhooks.constructEvent(eventBody, 
        signHeader,
        "whsec_GuTmaAuH7TIzAd8FuJi7QEy7yKAEcb4C",
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
                  UserPoolId: "us-east-1_H9Y0GkM7h",
                  Username: cognitoUsername,
                  UserAttributes: [
                      { Name: "custom:subscription", Value: `${checkoutSessionCompleted.amount_total === 500000 ? "annual" : "monthly"}` }
                  ]
              };

              const updateParams = {
                  TableName: "User-yjp2laxn7fhihdb4oidvyc3hf4-dev",
                  Key: {
                      "id": { S: idPassed } 
                  },
                  UpdateExpression: "SET subscription = :subscriptionValue",
                  ExpressionAttributeValues: {
                      ":subscriptionValue": { S: `${checkoutSessionCompleted.amount_total == 5000000 ? "annual" : "monthly"}` } 
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

  // console.log(`EVENT: ${JSON.stringify(event)}`);
  // for (const record of event.Records) {
  //   console.log(record.eventID);
  //   console.log(record.eventName);
  //   console.log('DynamoDB Record: %j', record.dynamodb);
  // }
  // return Promise.resolve('Successfully processed DynamoDB record');
};
