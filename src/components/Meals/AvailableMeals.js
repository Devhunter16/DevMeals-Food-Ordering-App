import { useState, useEffect } from 'react';
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Set loading to true while we get the meals data from firebase
        setIsLoading(true);
        const response = await fetch(
          'https://react-http-1b7e7-default-rtdb.firebaseio.com/meals.json'
        );

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const data = await response.json();

        // Convert the object of meals into an array
        const mealsArray = [];

        for (const key in data) {
          mealsArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(mealsArray);
        // Set loading to false after we finally set the meals in the mealsArray
        setIsLoading(false);
      } catch (err) {
        console.error('Something went wrong!');
      }
    };

    // Using .catch() rather than a try-catch block here. This is a super niche case,
    // don't worry about remembering why you had to do this
    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpError(err.message);
    });
  }, []);

  // If isLoading is true, return loading message instead of meals
  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }

  if (httpError) {
    return ( 
      <section className={classes.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal}
      key={meal}
      mealName={meal.name}
      mealPrice={meal.price}
      mealDescription={meal.description}
    ></MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
