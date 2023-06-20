// Using a reference with the useRef hook to get the values in the form only once it is
// submitted. useRef allows you to store a value that won't cause your component to 
// re-render when it changes. By using useRef, you can store values or references to 
// elements in a way that doesn't trigger re-renders and easily access them throughout 
// the component's lifecycle.
import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

// Created the isEmpty function to take a value and determine whether or not the value
// within the input element within the form is empty.
const isEmpty = (value) => {
    // .trim() removes any leading or trailing whitespace.
    if (value.trim().length === 0) {
        return true;
    } else {
        return false;
    };
};

// This function checks whether an entered value is 5 characters in length.
const isFiveChars = (value) => {
    if (value.trim().length === 5) {
        return true;
    } else {
        return false;
    };
};

const Checkout = (props) => {
    // We could have done four separate useState hooks here but we chose to use one 
    // instead, hence the object with the four boolean values. Initially we're treating
    // these as valid, which is a little confusing since the form is yet to be filled
    // out, but we'll handle that in the code.
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    // Getting an input reference for each form element by calling useRef().
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    // Here we're getting the values the user entered into each input in the form by 
    // calling on the "ref" props in each form input below.
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    // enteredWhateverIsValid = true if enteredWhatever contains anything other than only
    // whitespace.
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    // enteredPostalCodeIsValid = true if enteredPostalCode contains exactly 5 characters
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    // Setting formInputsValidity to either true or false based on some inferred
    // validities (whether or not whateverIsValid in each of these cases = true or false)
    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalCodeIsValid
    });

    // Now we check if the overall form is valid by checking is each of the values above
    // is true.
    const overallFormIsValid = enteredNameIsValid && enteredCityIsValid && enteredStreetIsValid && enteredPostalCodeIsValid;
  
    // If the overall form is NOT valid, we do not submit the cart data and show an error.
    if (!overallFormIsValid) {
        // return in order to NOT continue with code execution.
        return;
    };

    // Passing the user's entered data to the submitOrderHandler() function from our 
    // Cart component where it takes the data and sends it to the backend database for 
    // storage.
    props.onSubmit({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode
    });
};

  // useRef comes with a ref prop that we're using in each input component below. We use\
  // these to read whataver the user entered in that input when the form is submitted.
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={ nameInputRef }/>
        {!formInputsValidity.name && <p> Please enter a valid name! </p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={ streetInputRef } />
        {!formInputsValidity.street && <p> Please enter a valid street! </p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={ postalCodeInputRef } />
        {!formInputsValidity.postalCode && <p> Please enter a valid postal code! </p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city'ref={ cityInputRef }  />
        {!formInputsValidity.city && <p> Please enter a valid city! </p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};
// The Cancel button is of type "button" above so that it does not submit the form. Only
// the Confirm button should submit the form

export default Checkout;