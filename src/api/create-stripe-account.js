
import Stripe from 'stripe';

const TEST_SECRET_KEY = "sk_test_51MHZf4JbGPo8jsLC7uInizJy0DjyqYbFZrSYMN0USaP1L3w6r4D1tbTWuF5pwWMOq6UoVlhdeBfsFa68sGIE7tY600NlVl5zAf";

const stripe = new Stripe(TEST_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body;
      const account = await stripe.accounts.create({
        type: 'express',
        email, 
      });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: 'http://http://localhost:3000/user', 
        return_url: 'http://http://localhost:3000/user/subscription', 
        type: 'account_onboarding', 
      });
      
      res.status(200).json({ url: accountLink.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}