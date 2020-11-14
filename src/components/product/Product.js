import React from "react";
import "./Product.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/action/cart";
import CurrencyFormat from "react-currency-format";
import shortid from "shortid";
function Product({ id, title, image, price, rating }) {
  const dispatch = useDispatch();

  const addToBasket = () => {
    const item = {
      id: shortid.generate(),
      productId: id,
      title,
      image,
      price,
      rating,
    };
    dispatch(addToCart(item));
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <div className="product__price">
          <CurrencyFormat
            renderText={(value) => (
              <>
                <p>
                  <strong>{value}</strong>
                </p>
              </>
            )}
            decimalScale={2}
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
          />
        </div>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to basket</button>
    </div>
  );
}

export default Product;
