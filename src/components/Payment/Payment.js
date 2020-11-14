import React, { useState, useEffect } from "react";
import "./Payment.css";
import CheckoutProduct from "../checkout/CheckoutProduct";
import FlipMove from "react-flip-move";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "../../redux/action/cart";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../redux/reducer/cart";
import axios from "../../api/axios";
import { db } from "../../firebase/Firebase";
function Payment() {
  const { user } = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();

  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [proccessing, setProccessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProccessing(true);
    const payLoad = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          type: "card",
          card: elements.getElement(CardElement),
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
  const handleChange = (event) => {
    setDisable(event.empty);
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
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout"> {basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>
              Address : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>Proin gravida mauris vitae vehicula ultricies.</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            <FlipMove duration={400}>
              {basket.map((item) => (
                <CheckoutProduct product={item} key={item.id} />
              ))}
            </FlipMove>
          </div>
        </div>
        {user ? (
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
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
                {error && <div>{error}</div>}
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
