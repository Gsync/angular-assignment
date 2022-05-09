import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { Coffee } from '../coffee.model';
import * as fromCoffee from "../state/coffee.reducer";
import * as coffeeActions from "../state/coffee.actions";

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoffeeDetailsComponent implements OnInit {
  coffeeDetails$: Observable<Coffee | undefined>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromCoffee.State>,
    private location: Location
  ) { }

  ngOnInit(): void {
    const coffeeId = this.route.snapshot.params['coffeeId'];
    this.coffeeDetails$ = this.store.select(fromCoffee.selectCoffeeDetails);
    this.store.dispatch(coffeeActions.getCoffeeDetails({ coffeeId }));
  }

  goBack() {
    this.location.back();
  }

}
