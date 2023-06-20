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
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    // findIndex() is a built in JS method that finds the index of an
    // element within an array. It takes a function which returns true
    // if it finds the item we're looking for and false otherwise.
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // We just got the index of an item, now we're getting the item
    // itself.
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // The .concat() method is like .push() but it creates a new array
      // so that we don't mess with the old state snapshot because we don't
      // want to mess with existing data and memory without react knowing
      // about it.
      updatedItems = state.items.concat(action.item);
    };
    // This option is a fallback/default.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  };

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    console.log(state.totalAmount);
    const updatedTotalAmount = state.totalAmount - existingItem.price
    let updatedItems;
    // If you only have one item in the cart, and you press minus,
    // we want to make sure that that item is gone from the cart
    // completely, rather than just displaying 0 of that item. Else
    // keep the item in the cart, just decrement the amount by 1.
    if (existingItem.amount === 1) {
      // With filter, the function we pass is executed for every item
      // in the array. If the logic is true keep the item in the newly
      // returned array, if false it will be removed before the new
      // array is returned.
      updatedItems = state.items.filter((item => item.id !== action.id));
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      // Overwriting the old item in the cart with the new item with
      // the updated amount.
      updatedItems[existingCartItemIndex] = updatedItem;
    };
    // This option is a fallback/default.
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  };

  // If we recieve this kind of action, we return a new state where our cart is empty.
  if (action.type === 'CLEAR') {
    return defaultCartState;
  };

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

  // The second key-value pair within the object that is being passed
  // to dispatchCartAction() is item: itemArgument. This means that 
  // the itemArgument value passed as an argument to addItemToCartHandler() 
  // will be assigned to the item key within the object passed to 
  // dispatchCartAction(). This is because dispatchCartAction() takes
  // an object as an argument, where the type key indicates which 
  // action should be performed, and any additional keys can be used 
  // to pass data needed to perform that action. In this case, the 
  // ADD_ITEM action requires information about the item being added 
  // to the cart, so that information is passed in the form of an 
  // object with the type key set to "ADD_ITEM" and the item key set 
  // to the itemArgument argument passed to addItemToCartHandler().
  // Once the dispatchCartAction() function is called with this 
  // object, the cartReducer() function defined earlier in the code 
  // will use the type key to determine which action to perform and 
  // the item key to access the data needed to perform that action. 
  // In this case, the cartReducer() function will use the item key 
  // to update the cart state by either adding a new item to the cart
  // or increasing the amount of an existing item.
  const addItemToCartHandler = (itemArgument) => {
    dispatchCartAction({ type: "ADD_ITEM", item: itemArgument });
  };

  const removeItemFromCartHandler = (idArgument) => {
    dispatchCartAction({ type: "REMOVE_ITEM", id: idArgument });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR"});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
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
