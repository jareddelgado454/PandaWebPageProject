const stripeModule = require('stripe');
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
exports.handler = async (event) => {
  try {
    const secret = await retrieveKeyFromSM();
    const stripe = stripeModule(secret.STRIPE_TEST_KEY);

    const requestBody = JSON.parse(event.body);
    const { total, serviceAssigned, userEmail, typeAccount } = requestBody;
    let feeAmount = 0;
    if (typeAccount === "free") {
      feeAmount = Math.round(total * 10);
    }
    
    if (!total || !serviceAssigned || !userEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Total, serviceAssigned and userEmail are required' }),
      };
    }

    const session = await stripe.checkout.sessions.create(
      {
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Repair Service',
              },
              unit_amount: Math.round(total * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        payment_intent_data: {
          application_fee_amount: feeAmount,
          metadata: {
            serviceType: serviceAssigned.type,
          },
        },
        success_url: `https://master.d3dtglewderhtg.amplifyapp.com/payment-customer?paymentStatus=successfully&serviceId=${serviceAssigned.id}`,
        cancel_url: `https://master.d3dtglewderhtg.amplifyapp.com/payment-customer?paymentStatus=cancel&serviceId=${serviceAssigned.id}`,
        customer_email: userEmail,
      },
      {
        stripeAccount: serviceAssigned.stripeId,
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

const retrieveKeyFromSM = async() => {
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

    return secret;
  } catch (error) {
    throw new Error('Could not retrieve Stripe secret key');
  }
    
}