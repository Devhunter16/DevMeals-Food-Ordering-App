// The purpose of this component is to manage the cart-context data
// and provide that context to all components that want access to it. 

import CartContext from "./cart-context";

// <CartContext.Provider allows us to wrap other components in the
// <CartContext> component so that the items wrapped inside gain 
// access to the context we provided within the CartContext component
// such as the array and the functions we defined. We will also add
// all of the logic for managing all the contxt data so that no other
// components have to deal with that.
const CartProvider = (props) => {
    const addItemToCartHandler = (item) => {

    }

    const removeItemFromCartHandler = (id) => {

    }

    const cartContext = {
        items: [],
        totalAmount: 0,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    // Passing cartContext to CartContext.Provider so that all of the
    // values within our cartContext object are passed to any components
    // we want to wrap in our CartProvider component.
    return
    (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};

export default CartProvider;