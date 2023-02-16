import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Cart />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
