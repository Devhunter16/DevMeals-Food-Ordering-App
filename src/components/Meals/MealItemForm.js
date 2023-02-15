import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

// Passing in an object named input with a bunch of key-value value pairs that we
// will pass to our Input
const MealItemForm = () => {
  return (
    <form className={classes.form}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
