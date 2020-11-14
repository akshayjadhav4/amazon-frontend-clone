const initialState = {
  search: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_ITEM":
      return {
        ...state,
        search: action.search,
      };

    default:
      return state;
  }
};
