/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const stripe = require("stripe")("sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf"); 

exports.handler = async (event) => {
  try {
    const { connectAccountId } = JSON.parse(event.body);
    
    if (!connectAccountId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Connect Account ID is required" }),
      };
    }

    const getPaymentsByTechnician = async (connectAccountId) => {
      let payments = [];
      let hasMore = true;
      let startingAfter = null;

      while (hasMore) {
        const response = await stripe.paymentIntents.list({
          limit: 100,
          starting_after: startingAfter,
          stripeAccount: connectAccountId,
        });

        payments = payments.concat(response.data);
        hasMore = response.has_more;

        if (hasMore) {
          startingAfter = response.data[response.data.length - 1].id;
        }
      }

      return payments;
    };

    const payments = await getPaymentsByTechnician(connectAccountId);

    let totalAmount = 0;
    let totalCommission = 0;
    const serviceTypes = { repair: 0, towing: 0 };
    let numberRepairs = 0;
    let numberTowings = 0;

    const filteredPayments = payments.map(payment => {
      if (payment.status === "succeeded") {
        const amount = payment.amount / 100;
        const commission = payment.application_fee_amount / 100;
        totalAmount += amount;
        totalCommission += commission;

        if (payment.metadata) {
          const serviceType = payment.metadata.serviceType;
          if (serviceType === "towing") {
            numberTowings += 1;
            serviceTypes["towing"] += amount - commission;
          } else {
            numberRepairs += 1;
            serviceTypes["repair"] += amount - commission;
          }
        }

        return {
          created: payment.created, 
          amount: amount,
          serviceType: payment.metadata.serviceType, 
        };
      }
    }).filter(Boolean);

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalAmount: totalAmount.toFixed(2),
        totalCommission: totalCommission.toFixed(2),
        serviceTypes: {
          towing: serviceTypes.towing.toFixed(2),
          repair: serviceTypes.repair.toFixed(2),
        },
        numberRepair: numberRepairs,
        numberTowing: numberTowings,
        payments: filteredPayments, 
      }),
    };
  } catch (error) {
    console.error('Error fetching payments:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to fetch payments", error: error.message }),
    };
  }
};