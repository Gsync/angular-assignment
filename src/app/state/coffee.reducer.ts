import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Coffee } from "../coffee.model";
import { setCoffeeList, setCoffeeDetails } from "./coffee.actions"

export interface State {
    coffeeList: Coffee[],
    currentCoffee: Coffee
}

const initialState: State = {
    coffeeList: [],
    currentCoffee: {}
}

const selectFeature = createFeatureSelector<State>('coffee')

export const selectCoffeeList = createSelector(selectFeature, state => state.coffeeList)

export const selectCoffeeDetails = createSelector(selectFeature, state => state.currentCoffee)

export const coffeeReducer = createReducer(
    initialState,
    on(setCoffeeList, (state, action) => ({
        ...state, coffeeList: action.coffeeList
    })),
    on(setCoffeeDetails, (state, action) => ({
        ...state, currentCoffee: action.currentCoffee
    }
    )),
)