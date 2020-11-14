import React from "react";
import "./OrderProduct.css";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "../checkout/CheckoutProduct";
function OrderProduct({ order }) {
  return (
    <div className="orderProduct">
      <div className="orderProduct__info">
        <h2>Order</h2>
        <p>
          {moment
            .unix(order.data.created)
            .format("dddd, MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p className="orderProduct__id">
          <small>OrderID: {order.id}</small>
        </p>
      </div>

      {order.data.basket?.map((product) => (
        <CheckoutProduct product={product} key={product.id} hideButton />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="orderProduct__total">Order Total : {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default OrderProduct;
