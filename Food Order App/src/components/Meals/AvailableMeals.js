import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'

// https://react-project-9b670-default-rtdb.firebaseio.com

  

const AvailableMeals = () => {
   const [meals, setMeals] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [httpError, setHttpError] = useState(); // if you are not passing any value inside useState() then it is simply
   // undefined.
  // function useEffect() does not return any promise. so if you want to fetch data from api then simply add another function 
  // inside useEffect() which is asynchronous and then we can fetch data by using async-await.
  // useEffect(async()=>{}) ===> not allow in useEffect.
  useEffect(() => {
    const fetchMeals = async () => {
      const response =   await fetch('https://react-project-9b670-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()

      const loadedMeals = [];
      
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false);
    }
    // here fetchMeals() return Promises but we are only interested to catch the error that's why we are only dealing with 
    // catch() block.

    fetchMeals().catch((error)=>{
        setIsLoading(false)
    setHttpError(error.message);
    });
  },[]);

  if(isLoading){
    return <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
  }
if(httpError){
  return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
}
    const mealsList = meals.map(meal =>{
       return <MealItem key = {meal.id} 
       meal = {meal}
        />
    })
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}
export default AvailableMeals;