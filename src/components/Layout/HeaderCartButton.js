import { useContext } from "react";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  // Using useContext hook here to essentially subscribe to the 
  // values within CartContext so that any time any of those values
  // change, the subscription we have made to useContext auto-updates
  // those values and our component re-renders to reflect the new
  // values in the UI.
  const cartCtx = useContext(CartContext);

  // .reduce() is a method that allows us to transform an array of
  // data into a signle calue. A number that represents the number
  // of items in the cart in this context. The method wants two
  // parameters, a value (currNumber) that holds its value and is 
  // updated every execution, the "0" value in .reduce() is the intial
  // starting value. 
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
