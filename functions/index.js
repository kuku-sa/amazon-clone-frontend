const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { setGlobalOptions } = require("firebase-functions");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
setGlobalOptions({ maxInstances: 10 });
const app = express();
app.use(cors({ origin: true }));
<<<<<<< HEAD
app.use(express.json());
=======
//  CORS middleware for your Express app, allowing all origins to make requests to your server.

app.use(express.json());
// Allows the app to handle JSON data in POST requests


>>>>>>> 3d429a0bc866bdb3f3e7fac3e6a4c4036ebae114
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});
<<<<<<< HEAD
=======
// root path, checks the api is running and return a 200 status code with a success message
>>>>>>> 3d429a0bc866bdb3f3e7fac3e6a4c4036ebae114
app.post("/payment/create", async (req, res) => {
  // async to calls to Stripe
  const total = parseInt(req.query.total);
  // Extracts the total parameter from the query string
  // Converts it to an integer using parseInt()
  if (total > 0) {
    // Validates that the total amount is greater than 0 and prevent creating fro invalids amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
<<<<<<< HEAD
=======
    // await waits for the Stripe API call to complete and create a new stripe payment with the specified amount
>>>>>>> 3d429a0bc866bdb3f3e7fac3e6a4c4036ebae114
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
    // Sends back the client secret from the PaymentIntent
// Client secret is used by frontend to confirm the payment
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
  // If total is 0 or negative, returns HTTP 403 (Forbidden)
});

exports.api = onRequest(app);
