export const setCart = (basket) => ({
  type: "SET_CART",
  basket: basket,
});

export const addToCart = (item) => ({
  type: "ADD_TO_BASKET",
  item: item,
});

export const removeFromCart = (id) => ({
  type: "REMOVE_FROM_BASKET",
  id: id,
});

export const removeItemFromCart = (id) => ({
  type: "REMOVE_ITEM_FROM_BASKET",
  id: id,
});

export const emptyCart = () => ({
  type: "EMPTY_BASKET",
});
