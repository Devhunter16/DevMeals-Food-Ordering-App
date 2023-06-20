import { useContext, useState } from 'react';

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    // See the cartProvider file for more context on this. This line
    // of code essentially allows us to use the "plus" button in the
    // cart to increment the amount of a certain type of item.
    cartCtx.addItem({...item, amount: 1});
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  // Sends the form data in the Checkout component to our database for storage. We
  // added orders.json to the end so that it will create a new node called "orders"
  // to store the user data in.
  const submitOrderHandler = async (userData) => {
    // We've begun submitting, so setting isSubmitting to true.
    setIsSubmitting(true);
    // Specifiying that this is a POST request. Also calling JSON.stringify({}) on the
    // body because we need to turn our strings into JSON to send them to the db.
    await fetch('https://react-http-1b7e7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        // All of the user's data from the form such as street address, name, etc.
        user: userData,
        // All of the items in the cart order.
        orderedItems: cartCtx.items
      })
    });
    // We're done submitting now, so setting isSubmitting to false.
    setIsSubmitting(false);
    setDidSubmit(true);
    // Clearing the cart and closing the modal after submitting.
    cartCtx.clearCart();
  };

  const cartItems = (
    // Mapping each cart item to a custom CartItem element within a <ul> element 
    // to make an unordered list of CartItems
    // The cart-items className is written like that because of the dash
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        // Each CartItem must have an id labeled "key" because this helps
        // React identify which items have been added/removed/re-ordered
        // within a list.
        <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price} 
        // Explanation of .bind() here: If we want to pass additional 
        // params (not only the event which is passed by default), 
        // we can't just write a simple reference like onClick={clickHandler}
        // And we can't write onClick={clickHandler(param)} since this 
        // would call the function immediately (and not only when the 
        // cart item is clicked). if we want to pass params, we can 
        // either use bind (the first param is not used here, so we 
        // can write anything in this place) onClick={clickHandler.bind(null, param)}
        // or we can create an anonymous function: onClick={() => clickHandler(param)}
        // Both options are equivalent.
        onRemove={cartItemRemoveHandler.bind(null, item.id)} 
        onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
  );

  // The content of the cart modal. Shown when we're not in the isSubmitting state.
  const cartModalContent = (
    <>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onSubmit={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </>
  );

  // The submitting modal. Shown when we're actively submitting.
  const isSubmittingModalContent = (
    <p>Sending order data. Please wait... </p>
  );

  // The modal that shows if we did submit successfully.
  const didSubmitModalContent = (
    <>
      <p>We've received your order! You will recieve a notification when your order is complete.</p>
      <button className={classes} onClick={props.onClose}>Close</button>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && !didSubmit && cartModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
