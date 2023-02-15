import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  // This ensures that there'll be a dollar sign before each price and decimal will be fixed to two places
  const price = `$${props.mealPrice.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <h3>{props.mealName}</h3>
      <div className={classes.description}>{props.mealDescription}</div>
      <div className={classes.price}>{price}</div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
};

export default MealItem;
