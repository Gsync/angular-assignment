import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { EMPTY, exhaustMap, map, mergeMap, Observable, of, switchMap, take, withLatestFrom } from "rxjs";
import { Coffee } from "../coffee.model";
import { DataService } from "../data.service";
import * as CoffeeActions from "./coffee.actions";
import { selectCoffeeDetails, selectCoffeeList, State } from "./coffee.reducer";

@Injectable()
export class CoffeeEffects {
    constructor(
        private actions$: Actions,
        private dataService: DataService,
        private store: Store<State>
    ) { }

    fetchCoffeeList$ = createEffect((): Observable<Action> => this.actions$.pipe(
        ofType(CoffeeActions.fetchCoffeeList),
        withLatestFrom(this.store.select(selectCoffeeList)),
        switchMap(([_, storeList]) => storeList.length ? EMPTY : this.dataService.fetchCoffeeList()
            .pipe(map(coffeeList => (CoffeeActions.setCoffeeList({ coffeeList }))))
        )
    ))

    getCoffeeDetail$ = createEffect((): Observable<Action> => this.actions$.pipe(
        ofType(CoffeeActions.getCoffeeDetails),
        withLatestFrom(this.store.select(selectCoffeeList), this.store.select(selectCoffeeDetails)),
        switchMap(([action, coffeeList, selectedCoffee]) => {
            if (selectedCoffee.uid === action.coffeeId) EMPTY
            if (coffeeList.length) this.store.select(selectCoffeeList).pipe(
                map(
                    coffeeList => CoffeeActions.setCoffeeDetails(
                        {
                            currentCoffee: coffeeList.filter((c: Coffee) => c.uid === action.coffeeId)[0]
                        }
                    )
                )
            )
            return this.dataService.fetchCoffeeList()
                .pipe(
                    map(coffeeList => (
                        CoffeeActions.setCoffeeDetails(
                            {
                                currentCoffee: coffeeList.find((c: Coffee) => c.uid === action.coffeeId)
                            }
                        ))
                    )
                )
        })
    ))
}