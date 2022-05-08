import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { Coffee } from "../coffee.model";
import { setCoffeeList } from "./coffee.actions"

export interface State {
    coffeeList: Coffee[]
}

const initialState: State = {
    coffeeList: []
}

const selectFeature = createFeatureSelector<State>('coffee')

export const selectCoffeeList = createSelector(selectFeature, state => state.coffeeList)

export const getCoffeeDetails = (id: string) => createSelector(
    selectFeature, state => {
        return state.coffeeList.find(coffee => coffee.uid === id)
    }
)

export const coffeeReducer = createReducer(
    initialState,
    on(setCoffeeList, (state, action) => ({
        ...state, coffeeList: action.coffeeList
    }))
)