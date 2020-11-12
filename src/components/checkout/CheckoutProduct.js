import React, { forwardRef } from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "../../contextApi/StateProvider";
import shortid from "shortid";

const CheckoutProduct = forwardRef(({ product, hideButton }, ref) => {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: product.id,
    });
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: shortid.generate(),
        productId: product.productId,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    });
  };

  const removeItemFromBasket = () => {
    dispatch({
      type: "REMOVE_ITEM_FROM_BASKET",
      id: product.id,
    });
  };
  return (
    <div className="checkoutProduct" ref={ref}>
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
        {hideButton && (
          <p>
            Quantity: <strong>{product?.quantity}</strong>
          </p>
        )}
        {!hideButton && (
          <div className="checkoutProduct__quantity">
            <button onClick={addToBasket}>+</button>
            <span>
              Quantity: <strong>{product.quantity}</strong>
            </span>
            <button onClick={removeItemFromBasket}>-</button>
          </div>
        )}
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
});

export default CheckoutProduct;
