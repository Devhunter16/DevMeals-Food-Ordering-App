import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../store/cart-context";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // This ensures that there'll be a dollar sign before each price and decimal will be fixed to two places
  const price = `$${props.mealPrice.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.mealName,
      amount: amount,
      price: props.mealPrice,
    });
  };

  return (
    <li className={classes.meal}>
      <h3>{props.mealName}</h3>
      <div className={classes.description}>{props.mealDescription}</div>
      <div className={classes.price}>{price}</div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
