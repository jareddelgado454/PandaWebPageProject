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

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = event => {

  try {
      const signHeader = event.headers['stripe-signature'];
      const eventBody = JSON.stringify(event.body);
      const STRIPE_WEBHOOK_SECRET = "whsec_VQPhDxuYEICLAZaLUrh517TL9pkTSBbK" 

      const eventReceived = stripe.webhooks.constructEvent(eventBody, signHeader, STRIPE_WEBHOOK_SECRET)

      switch( eventReceived.type ){
          case "checkout.session.completed" : 
              const checkoutSessionCompleted = eventReceived.data.object
              console.log({checkoutSessionCompleted})
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
