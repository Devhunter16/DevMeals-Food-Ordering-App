import classes from "./Input.module.css";

// We can use the spread operator in the input element so that it gets all of the
// key-value pairs that we put into our input prop in our Input element inside of
// the MealItemForm element
const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
