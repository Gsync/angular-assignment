import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCoffee from "./state/coffee.reducer";
import * as coffeeActions from "./state/coffee.actions";
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'angular-assignment';

  constructor(private store: Store<fromCoffee.State>, private dataService: DataService) { }
  ngOnInit(): void {
    this.store.dispatch(coffeeActions.fetchCoffeeList())
  }
}
