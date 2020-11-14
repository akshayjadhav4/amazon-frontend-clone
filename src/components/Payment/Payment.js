import React, { useState, useEffect } from "react";
import "./Payment.css";
import CheckoutProduct from "../checkout/CheckoutProduct";
import FlipMove from "react-flip-move";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../redux/action/cart";
import { useHistory } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import {
  getBasketTotal,
  getTotalNumberOfItems,
} from "../../redux/reducer/cart";
import axios from "../../api/axios";
import { db } from "../../firebase/Firebase";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
function Payment() {
  // redux
  const { user } = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // stripe
  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [proccessing, setProccessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [address, setAddress] = useState("");

  // card component (only UI purpose)
  const [cardNumer, setCardNumer] = useState("");
  const [expiry, setExpiry] = useState("");

  // payment processing
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!address) {
      setError("Provide address.");
      return;
    }
    setProccessing(true);
    const payLoad = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: elements.getElement("cardNumber"),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            address: address,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProccessing(false);
        dispatch(emptyCart());
        history.replace("/orders");
      });
  };
  // stirp card element
  const handleChange = (event) => {
    setDisable(event.empty);
    setCardNumer(4242);
    setError(event.error ? event.error.message : "");
  };

  const handleChangeCVC = (event) => {
    setDisable(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleChangeExpire = (event) => {
    setDisable(event.empty);
    setExpiry(`12/25`);
    setError(event.error ? event.error.message : "");
  };

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  return (
    <div className="payment">
      <div className="payment__summary">
        <div className="payment__title">
          <h1>Your Order summary</h1>
        </div>
        <h3 className="payment__itemCount">
          {" "}
          Total items {getTotalNumberOfItems(basket)} in your cart
        </h3>

        <div className="payment__items">
          <FlipMove duration={400}>
            {basket.map((item) => (
              <CheckoutProduct product={item} key={item.id} />
            ))}
          </FlipMove>
        </div>
      </div>
      <div className="payment__method">
        <h1>
          Please fill out <br /> your payment Details
        </h1>
        <br />
        <h3>Contact Detail: {user?.email}</h3>
        <h3>Delivery Address</h3>
        <input
          type="text"
          placeholder="Address"
          className="payment__address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {user ? (
          <div className="payment__section">
            <h3>Payment Method</h3>
            <Cards
              expiry={expiry}
              name={user?.email.substring(0, user?.email.lastIndexOf("@"))}
              number={cardNumer}
            />
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <div className="payment__cardForm">
                  <label htmlFor="number">Card Number</label>
                  <div className="payment__cardInput">
                    <CardNumberElement
                      onChange={handleChange}
                      options={{ style: { base: { fontSize: "20px" } } }}
                    />
                  </div>

                  <label htmlFor="cvc">Card CVC</label>
                  <div className="payment__cardInput">
                    <CardCvcElement
                      onChange={handleChangeCVC}
                      options={{ style: { base: { fontSize: "20px" } } }}
                    />
                  </div>

                  <label htmlFor="expirationDate">Expiration date</label>
                  <div className="payment__cardInput">
                    <CardExpiryElement
                      onChange={handleChangeExpire}
                      options={{ style: { base: { fontSize: "20px" } } }}
                    />
                  </div>
                </div>
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => (
                      <>
                        <h3>Order Total : {value}</h3>
                      </>
                    )}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                  />
                  {basket?.length > 0 ? (
                    <button
                      disabled={proccessing || disable || succeeded}
                      className="payment__button"
                    >
                      <span>
                        {proccessing ? <p>Proccessing...</p> : "Buy Now"}
                      </span>
                    </button>
                  ) : (
                    <p>Cart is empty</p>
                  )}
                </div>
                {error && <div style={{ color: "red" }}>{error}</div>}
              </form>
            </div>
          </div>
        ) : (
          <div className="payment__section">
            <div className="payment__title">
              <h3>Login to complete payment process</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
