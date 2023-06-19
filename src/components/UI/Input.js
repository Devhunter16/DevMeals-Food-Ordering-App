import React from "react";
import classes from "./Input.module.css";

// forwardRef is used to forward a ref to a child component, when we wish to access
// that ref further down the DOM tree
const Input = React.forwardRef((props, ref) => {
  // We can use the spread operator in the input element so that it gets all of the
  // key-value pairs that we put into our input prop in our Input element inside of
  // the MealItemForm element
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
