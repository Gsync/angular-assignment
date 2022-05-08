import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { exhaustMap, map, mergeMap, Observable, switchMap, take } from "rxjs";
import { DataService } from "../data.service";
import * as CoffeeActions from "./coffee.actions";

@Injectable()
export class CoffeeEffects {
    constructor(
        private actions$: Actions,
        private dataService: DataService
    ) { }

    fetchCoffeeList$ = createEffect((): Observable<Action> => this.actions$.pipe(
        ofType(CoffeeActions.fetchCoffeeList),
        switchMap(() => this.dataService.fetchCoffeeList()
            .pipe(
                map(coffeeList => (CoffeeActions.setCoffeeList({ coffeeList })))
            )
        )
    ))
}