import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../contextApi/StateProvider";
function CheckoutProduct({ product }) {
  const [{basket},dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: product.id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img
        src={product.image}
        alt="productImg"
        className="checkoutProduct__img"
      />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{product.title}</p>
        <p className="checkoutProduct__price">
          <small>₹</small>
          <strong>{product.price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(product.rating)
            .fill()
            .map((_) => (
              <p>⭐</p>
            ))}
        </div>
        <button onClick={removeFromBasket}>Remove from basket</button>
      </div>
    </div>
  );
}

export default CheckoutProduct;