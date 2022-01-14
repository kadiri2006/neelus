const initialState = {
  cartItems: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

      break;
    case "DELETE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };

      break;

    default:
      return state;
      break;
  }
}

export { cartReducer };
