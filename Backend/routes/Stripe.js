const express = require("express");
const stripe = require("stripe")(
  "sk_test_51HpMDYEyGT5AepuernFQ6kqCb8MFLOttDEwSs9vlaqONgUU1YyrjA9XWhq5vMa8g2NghwkBZVHDB3c0KyOrxxXsQ00k2wcHx8p"
);
const stripeRouter = express.Router();

stripeRouter.post("/checkout", async (req, res) => {
  const amount = req.body.amount;
  const token = req.body.token;
  stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: amount,
        currency: "PKR",
        customer: customer.id,
        receipt_email: token.email,
      });
    })
    .then((result) => res.status(200).send(result))
    .catch((error) => console.log(error));
});
module.exports = stripeRouter;
