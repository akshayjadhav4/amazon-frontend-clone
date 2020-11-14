const initialState = {
  basket: [],
};
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price * item.quantity + amount, 0);

export const getTotalNumberOfItems = (basket) =>
  basket?.reduce((total, item) => item.quantity + total, 0);

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, basket: action.basket };

    case "ADD_TO_BASKET":
      // check already product is present or not
      const itemIndex = state.basket.findIndex(
        (basketItem) => basketItem.productId === action.item.productId
      );
      // if present
      if (itemIndex >= 0) {
        var basket = [...state.basket];
        // looping through all products
        for (var i = 0; i < basket.length; i++) {
          // for same product increase quantitly
          if (basket[i].productId === action.item.productId) {
            basket[i].quantity += 1;
          }
        }
        localStorage.setItem("cart", JSON.stringify({ cart: basket }));

        return {
          ...state,
          basket: basket,
        };
      } else {
        var item = action.item;
        item.quantity = 1;
        localStorage.setItem(
          "cart",
          JSON.stringify({ cart: [...state.basket, action.item] })
        );
        return { ...state, basket: [...state.basket, action.item] };
      }

    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        //remove item
        newBasket.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify({ cart: newBasket }));
      return { ...state, basket: newBasket };

    case "REMOVE_ITEM_FROM_BASKET":
      let removedItemBasket = [...state.basket];
      const indexItem = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (indexItem >= 0) {
        for (var item = 0; item < removedItemBasket.length; item++) {
          if (removedItemBasket[item].id === action.id) {
            // if only one product them simply remove
            if (removedItemBasket[item].quantity === 1) {
              removedItemBasket.splice(indexItem, 1);
            } else {
              // otherwise decrement quantity
              removedItemBasket[item].quantity -= 1;
            }
          }
        }
      } else {
        console.log("Can't remove the product.It is not in basket");
      }
      localStorage.setItem("cart", JSON.stringify({ cart: removedItemBasket }));
      return { ...state, basket: removedItemBasket };

    case "EMPTY_BASKET":
      localStorage.removeItem("cart");
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};
