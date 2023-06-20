// Importing React here so that we can use React.createContext()
import React from "react";

// Context provides a way to pass data through the component tree
// without having to pass props down manually at every level. Here
// we're setting some defaults inside createContext. We are not
// required to do this, but it improves IDE intellisense (code hinting)
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {}
});

export default CartContext;