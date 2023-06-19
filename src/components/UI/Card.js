import classes from "./Card.module.css";

// Using props.children in our div so that we can wrap elements in the Card component
const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
