import { Fragment } from 'react';
import classes from './Meals.module.css'
import MealsSummery from './MealsSummary'
import AvailableMeals from './AvailableMeals';

const Meals = ()=>{
    return <Fragment>
        <MealsSummery/>
        <AvailableMeals/>
    </Fragment>
}

export default Meals;