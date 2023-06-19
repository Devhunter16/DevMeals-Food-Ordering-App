import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/food.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>DevMeals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of food." />
      </div>
    </>
  );
};

export default Header;