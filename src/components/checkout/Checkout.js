import React from "react";
import { useSelector } from "react-redux";
import "./Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import SubTotal from "../sub total/SubTotal";
import FlipMove from "react-flip-move";
function Checkout() {
  const { user } = useSelector((state) => state.auth);
  const { basket } = useSelector((state) => state.cart);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Events/Pug/Leadup/Launches/PC/PD_Launches_20_Header_PC.jpg"
          alt="ad"
          className="checkout__ad"
        />
        <h3>Hello, {user?.email}</h3>
        {basket?.length === 0 ? (
          <div>
            <h2>Your Shopping Basket is empty</h2>
            <p>
              You have no items in basket. To buy one or more items,click 'Add
              to basket' next to item.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="checkout__title">Your Shopping Basket</h2>
            <FlipMove duration={400}>
              {basket.map((item) => (
                <CheckoutProduct product={item} key={item.id} />
              ))}
            </FlipMove>
          </div>
        )}
      </div>
      {basket?.length > 0 && (
        <div className="checkout__right">
          <SubTotal />
        </div>
      )}
    </div>
  );
}

export default Checkout;
