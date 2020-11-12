export const initialState = {
  basket: [],
  user: null,
  search: "",
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, basket: action.basket };
    case "ADD_TO_BASKET":
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.basket, action.item])
      );
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        //remove item
        newBasket.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
    case "EMPTY_BASKET":
      localStorage.removeItem("cart");
      return {
        ...state,
        basket: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SEARCH_ITEM":
      return {
        ...state,
        search: action.search,
      };
    default:
      return state;
  }
}

export default reducer;
