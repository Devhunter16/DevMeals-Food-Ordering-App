import { useContext, useState } from 'react';

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
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

  const cartItems = (
    // Mapping each cart item to a custom CartItem element within a <ul> element 
    // to make an unordered list of CartItems
    // The cart-items className is written like that because of the dash
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        // Each CartItem must have an id labeled "key" because this helps
        // React identify which items have been added/removed/re-ordered
        // within a list
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

  return (
    <Modal onClose={props.onClose}>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
