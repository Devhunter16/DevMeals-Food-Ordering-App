import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import "./App.css";

function App() {
  const [cartIsShown, setCartVisibility] = useState(false);

  const setCartVisible = () => {
    setCartVisibility(true);
  };

  const setCartInvisible = () => {
    setCartVisibility(false);
  };

  // Wrapping our app in <CartProvider> so that it has access to all
  // of the context values from that custom component
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={setCartInvisible}/>}
      <Header onShowCart={setCartVisible}/>
      <main>
        <Meals />
      </main>
    </ CartProvider>
  );
}

export default App;
