import classes from "./MealItem.module.css";

const MealItem = (props) => {
  return (
    <div className={classes.meal}>
      <h3>{props.mealName}</h3>
      <div className={classes.description}>{props.mealDescription}</div>
      <div className={classes.price}>{props.mealPrice}</div>
    </div>
  );
};

export default MealItem;
