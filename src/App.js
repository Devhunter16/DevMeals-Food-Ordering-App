import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
  const [cartIsShown, setCartVisibility] = useState(false);

  const setCartVisible = () => {
    setCartVisibility(true);
  };

  const setCartInvisible = () => {
    setCartVisibility(false);
  };

  return (
    <>
      {cartIsShown && <Cart onClose={setCartInvisible}/>}
      <Header onShowCart={setCartVisible}/>
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
