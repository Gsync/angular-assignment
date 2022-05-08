import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from "@ngrx/store";
import { EMPTY, exhaustMap, map, mergeMap, Observable, switchMap, take, withLatestFrom } from "rxjs";
import { DataService } from "../data.service";
import * as CoffeeActions from "./coffee.actions";
import { selectCoffeeList, State } from "./coffee.reducer";

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
}