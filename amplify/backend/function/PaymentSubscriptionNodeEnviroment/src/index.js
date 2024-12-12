


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const TEST_SECRET_KEY = "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf"
const stripe = require("stripe")(TEST_SECRET_KEY);

exports.handler = async (event) => {
    const { priceId, idsPassed } = JSON.parse(event.body);
    console.log({ priceId, idsPassed });
    try {
        const plans = await stripe.prices.list();
        console.log("Aqui los products",plans.data);

        const checkoutSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            success_url: "https://app.panda-mars.com/redirect-to-app-after-subscription-stripe/completed",
            cancel_url: "https://app.panda-mars.com/redirect-to-app-after-subscription-stripe/inccompleted",
            metadata: idsPassed ? { ...idsPassed } : {},
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ url: checkoutSession.url }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
