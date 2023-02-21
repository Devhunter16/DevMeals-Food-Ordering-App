// The purpose of this component is to manage the cart-context data
// and provide that context to all components that want access to it.

import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// Reducer functions return a state and an action. The state
// is the last state snapshot managed by the reducer function and the action
// is dispatched by you later in your code.
const cartReducer = (state, action) => {
  if (action.type === "ADD_ITEM") {
    // The .concat() method is like .push() but it creates a new array
    // so that we don't mess with the old state snapshot because we don't
    // want to mess with existing data and memory without react knowing
    // about it.
    const updatedItems = state.items.concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

// <CartContext.Provider allows us to wrap other components in the
// <CartContext> component so that the items wrapped inside gain
// access to the context we provided within the CartContext component
// such as the array and the functions we defined. We will also add
// all of the logic for managing all the contxt data so that no other
// components have to deal with that.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  // Passing cartContext to CartContext.Provider so that all of the
  // values within our cartContext object are passed to any components
  // we want to wrap in our CartProvider component.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
