import { useContext, useEffect, useState } from "react";

import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);
  // Using useContext hook here to essentially subscribe to the 
  // values within CartContext so that any time any of those values
  // change, the subscription we have made to useContext auto-updates
  // those values and our component re-renders to reflect the new
  // values in the UI.
  const cartCtx = useContext(CartContext);

  // Specifically pulling the items array out of cartCtx so that we
  // can put it in our useEffect dependency array below so that 
  // whenever the items in the cart change our useEffect function is 
  // called.
  const { items } = cartCtx;

  // .reduce() is a method that allows us to transform an array of
  // data into a signle calue. A number that represents the number
  // of items in the cart in this context. The method wants two
  // parameters, a value (currNumber) that holds its value and is 
  // updated every execution, the "0" value in .reduce() is the intial
  // starting value. 
  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  // A variable that combines two css classes so that we can pass them
  // both to our button element in the jsx below. This makes the button
  // bounce whenever the cart is updated. We check to see if 
  // btnIsHighlighted is true, if so then add the .bump class, if not
  // add an empty string (so no class is added).
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  // useEffect tells React that our component needs to do something
  // after render. We can call these somethings "side-effects". In 
  // our useEffect function here, we are going to change the btnClasses
  // variable to include the .bump animation class and set a timer to
  // remove the class so that when it's added again in the future
  // it will play the animation again.
  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    }
    setButtonIsHighlighted(true);
    // Setting a timer to remove the .bump class every 300ms (because
    // that is how long it takes the animation to complete) so that
    // we can then set it again every time the useEffect function is
    // called.
    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);
    // Whenever we a return a function from useEffect, this is called
    // a cleanup function. Here we are cleaning up the timer. This is
    // not necessary for the purposes of this app, but it is good
    // practice.
    return () => {
      clearTimeout(timer);
    }
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
