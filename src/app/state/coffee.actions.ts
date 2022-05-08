import { createAction, props } from "@ngrx/store";
import { Coffee } from "../coffee.model";

export enum CoffeeActionTypes {
    FETCH_LIST = '[Coffee] Fetch List',
    SET_LIST = '[Coffee] Set List',
    GET_COFFEE_DETAILS = '[Coffee] Get Coffee Details'
}

export const fetchCoffeeList = createAction(
    CoffeeActionTypes.FETCH_LIST
)

export const setCoffeeList = createAction(
    CoffeeActionTypes.SET_LIST,
    props<{
        coffeeList: Coffee[]
    }>()
)