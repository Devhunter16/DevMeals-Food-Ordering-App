import { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  // useRef() allows us to persist values between renders. It can be used to
  // store a mutable value that does not cause a re-render when updated.
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    // Using preventDefault() here so that the browser event of reloading
    // the page is prevented.
    event.preventDefault();

    // The value property of an input element is always a string, so here
    // we are converting it to a number. +enteredAmount converts to a number
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    // Here we're doing some validation like trimming white space and
    // checking whether or not the value is empty. If so, return to make sure
    // not to continue with function execution.
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmountNumber);
  };

  // Passing in an object named input with a bunch of key-value value pairs that we
  // will pass to our Input
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
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
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
