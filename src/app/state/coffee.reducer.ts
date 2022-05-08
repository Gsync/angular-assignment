import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Coffee } from "../coffee.model";
import { setCoffeeList } from "./coffee.actions"

export interface State {
    coffeeList: Coffee[]
}

const initialState: State = {
    coffeeList: []
}

const selectFeature = createFeatureSelector<State>('coffeeList')

const selectCoffeeList = createSelector(selectFeature, state => state.coffeeList)

export const coffeeReducer = createReducer(
    initialState,
    on(setCoffeeList, (state, action) => ({
        ...state, coffeeList: action.coffeeList
    }))
)