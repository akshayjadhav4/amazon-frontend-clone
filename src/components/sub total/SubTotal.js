import React from "react";
import "./SubTotal.css";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { getBasketTotal } from "../../redux/reducer/cart";
import { useHistory } from "react-router-dom";

function SubTotal() {
  const { basket } = useSelector((state) => state.cart);

  const history = useHistory();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items) : <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift.
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
      <button onClick={(e) => history.push("/payment")}>
        Proceed to checkout
      </button>
    </div>
  );
}

export default SubTotal;
