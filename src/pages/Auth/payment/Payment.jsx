import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./payment.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import { DataContext } from "../../../components/dataProvider/DataProvider";
import ProductCard from "../../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../../components/CurrencyFormat";
import { axiosInstance} from "../../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../../utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../../utility/Action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket?.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    if (!user || !user.uid) {
      setCardError("Please sign in to complete your purchase");
      navigate("/auth"); // Redirect to authentication page
      return;
    }
    try {
      setProcessing(true);
      setCardError(null);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get client secret from server");
      }
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }
      const userOrdersRef = collection(db, "users", user.uid, "orders");
      const orderDocRef = doc(userOrdersRef, paymentIntent.id);
      await setDoc(orderDocRef, {
        basket: basket,
        amount: paymentIntent.amount,
        totalAmount: total,
        created: paymentIntent.created,
        status: paymentIntent.status,
      });

      dispatch({
        type: Type.EMPTY_BASKET,
      });
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
    } catch (error) {
      console.log("Payment error:", error);
      setCardError(
        error.message || "An error occurred during payment processing"
      );
      setProcessing(false);
    }
  };

  if (!user) {
    return (
      <LayOut>
        <div className={classes.payment_header}>Please sign in to continue</div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>You need to be signed in to access the checkout page.</p>
          <button onClick={() => navigate("/auth")}>Sign In</button>
        </div>
      </LayOut>
    );
  }
  return (
    <LayOut>
      <div className={classes.payment_header}>checkout ({totalItem}) items</div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <div>
            <h3>Delivery Address</h3>
          </div>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <div>
            <h3>Review items and delivery</h3>
          </div>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={item.id || index} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement
                  onChange={handleChange}
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                    },
                  }}
                />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={!stripe || processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                  {/*  */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
// This component handles the complete payment flow including authentication checks, Stripe integration, order storage, and user feedback.