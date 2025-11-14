// Payment placeholders: Stripe example and Vipps notes
const express = require('express');
const router = express.Router();

/*
  Stripe example: create a PaymentIntent and return client_secret to frontend.
  - Install stripe in backend: `npm i stripe`
  - Set `STRIPE_SECRET` in .env

  Vipps: Vipps integration requires OAuth and webhooks. Add endpoints here for
  creating Vipps checkout sessions and handling webhooks. See Vipps developer docs.
*/

if (process.env.STRIPE_SECRET) {
  const Stripe = require('stripe');
  const stripe = new Stripe(process.env.STRIPE_SECRET);

  router.post('/create-payment-intent', async (req, res) => {
    try {
      const { amount, currency = 'nok' } = req.body;
      if (!amount) return res.status(400).json({ message: 'Amount required' });
      // Stripe expects smallest currency unit (øre). For NOK, multiply by 100.
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(amount) * 100),
        currency: 'nok',
        // add metadata to link to job / user
        metadata: req.body.metadata || {}
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      console.error('stripe error', err);
      res.status(500).json({ message: 'Payment error' });
    }
  });
}

// Vipps placeholder route (NOT IMPLEMENTED)
router.post('/vipps/create-checkout', (req, res) => {
  // TODO: Implement Vipps OAuth + checkout creation here. See Vipps API docs:
  //  - Obtain access token using client id/secret
  //  - Create payment/checkout session
  //  - Return checkout URL to frontend
  res.status(501).json({ message: 'Vipps integration placeholder' });
});

module.exports = router;
