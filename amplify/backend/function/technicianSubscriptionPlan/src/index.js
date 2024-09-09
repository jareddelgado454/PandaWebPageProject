
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const { DynamoDBClient , UpdateItemCommand} = require("@aws-sdk/client-dynamodb");
const { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } = require("@aws-sdk/client-cognito-identity-provider");
// const {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } = require("@aws-sdk/client-secrets-manager");

exports.handler = async (event) => {
  try {
    //   const secret_name = "STRIPE_TEST_KEY";
    //   const clientSecrets = new SecretsManagerClient({
    //     region: "us-east-1",
    //   });

    //   const response = await clientSecrets.send(
    //     new GetSecretValueCommand({
    //       SecretId: secret_name,
    //       VersionStage: "AWSCURRENT", 
    //     })
    //   );

    //   const secret = JSON.parse(response.SecretString);
    //   console.log("This are the secreeeeeeeeeeets", secret);

      const stripe = require('stripe')("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf");

      const signHeader = event.headers['stripe-signature'];
      const eventBody = event.body;

      const eventReceived = stripe.webhooks.constructEvent(eventBody, 
        signHeader,
        "whsec_GuTmaAuH7TIzAd8FuJi7QEy7yKAEcb4C",
      );

      switch( eventReceived.type ){
          case "checkout.session.completed" : 
              const checkoutSessionCompleted = eventReceived.data.object
              console.log("Esta es la session Completed",{checkoutSessionCompleted})

              const idPassed = checkoutSessionCompleted.metadata?.idDatabase;
              const cognitoUsername = checkoutSessionCompleted.metadata?.cognitoUsername;
              const subscriptionId = checkoutSessionCompleted.subscription;
              if(!idPassed || !cognitoUsername){
                  console.log("Missing hashedUserId in metadata. Skipping user lookup.");
                  break;
              }
              console.log("idPassed", idPassed);
              console.log("cognitoUsername", cognitoUsername);

              const subscriptionType = checkoutSessionCompleted.amount_total === 500000 ? "annual" : "monthly";
        
              const currentDate = new Date();
              let expirationDate;
              if (subscriptionType === "annual") {
                expirationDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
              } else {
                expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
              }
              const expirationDateISOString = expirationDate.toISOString();


              const client = new DynamoDBClient({ region: 'us-east-1'});
              const cognitoClient = new CognitoIdentityProviderClient({ region: "us-east-1" });

              const cognitoUpdateParams = {
                  UserPoolId: "us-east-1_H9Y0GkM7h",
                  Username: cognitoUsername,
                  UserAttributes: [
                      { Name: "custom:subscription", Value: `${checkoutSessionCompleted.amount_total === 500000 ? "annual" : "monthly"}` },
                      { Name: "custom:fee", Value: "0" },
                      { Name: "custom:subExpirationDate", Value: expirationDateISOString },
                      { Name: "custom:subscriptionId", Value: subscriptionId }, 
                      { Name: "custom:subscriptionStatus", Value: "ongoing" }
                  ]
              };

              const updateParams = {
                  TableName: "Technician-yjp2laxn7fhihdb4oidvyc3hf4-dev",
                  Key: {
                      "id": { S: idPassed } 
                  },
                  UpdateExpression: "SET subscription = :subscriptionValue, fee = :feeValue, subscriptionExpirationDate = :expirationDate, subscriptionId = :subscriptionId, subscriptionStatus = :subscriptionStatus",
                  ExpressionAttributeValues: {
                      ":subscriptionValue": { S: subscriptionType },
                      ":feeValue": { N: "0" },
                      ":expirationDate": { S: expirationDateISOString },
                      ":subscriptionId": { S: subscriptionId }, 
                      ":subscriptionStatus": { S: "ongoing" } 
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
