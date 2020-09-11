import React from "react";
import "./Payment.css";
import CheckoutProduct from "../checkout/CheckoutProduct";
import FlipMove from "react-flip-move";
import { useStateValue } from "../../contextApi/StateProvider";
import { Link } from "react-router-dom";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

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
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <p>Strip Magic</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
