const stripe = require("stripe")(process.env.STRIPE_KEY);

const stripeController = async (req, res) => {
  const { purchase, total_amount, shipping_fee } = req.body;

  //In actual project, take the product id and get the prices
  //and compare with the passed product prices.
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntent.create({
    amount: calculateOrderAmount(),
    currency: "usd",
  });

  return res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
