import React, { forwardRef } from "react";
import "./CheckoutProduct.css";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeItemFromCart,
} from "../../redux/action/cart";
import shortid from "shortid";

const CheckoutProduct = forwardRef(({ product, hideButton }, ref) => {
  const dispatch = useDispatch();
  const removeFromBasket = () => {
    dispatch(removeFromCart(product.id));
  };

  const addToBasket = () => {
    const item = {
      id: shortid.generate(),
      productId: product.productId,
      title: product.title,
      image: product.image,
      price: product.price,
      rating: product.rating,
    };
    dispatch(addToCart(item));
  };

  const removeItemFromBasket = () => {
    dispatch(removeItemFromCart(product.id));
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
