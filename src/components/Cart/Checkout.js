import classes from './Checkout.module.css';

const Checkout = (props) => {
    // We can use an "event" object here because we're binding this function to the 
    // onSubmit event on the form 
    const confirmHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
            </div>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button>Confirm</button>
        </form>
    )
};
// The Cancel button is of type "button" above so that it does not submit the form. Only
// the Confirm button should submit the form

export default Checkout;