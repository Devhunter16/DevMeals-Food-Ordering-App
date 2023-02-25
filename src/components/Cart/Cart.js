import { useContext } from 'react';

import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {

  }

  const cartItemAddHandler = (item) => {

  }

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

  return (
    <Modal onClose={props.onClose}>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
