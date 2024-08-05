const TEST_SECRET_KEY = "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf"
const stripe = require('stripe')(TEST_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { total, serviceAssigned, applicationFeeAmount, userEmail } = requestBody;

    console.log('Received data:', requestBody);

    if (!total || !serviceAssigned || !applicationFeeAmount || !userEmail) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Total, serviceAssigned, applicationFeeAmount, and userEmail are required' }),
      };
    }

    console.log('Creating session with:', {
      total,
      serviceAssigned,
      applicationFeeAmount,
      userEmail
    });

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
          application_fee_amount: Math.round(applicationFeeAmount * 100),
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

    console.log('Session created:', session);

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    console.error('Error creating session:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};