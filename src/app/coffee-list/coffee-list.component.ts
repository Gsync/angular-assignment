import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCoffee from "../state/coffee.reducer";
import * as coffeeActions from "../state/coffee.actions";
import { map, Observable } from 'rxjs';
import { Coffee } from '../coffee.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coffee-list',
  templateUrl: './coffee-list.component.html',
  styleUrls: ['./coffee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoffeeListComponent implements OnInit, AfterViewInit {
  coffeeList$: Observable<Coffee[]>;
  coffeeDataSource: MatTableDataSource<Coffee>;

  displayedColumns: string[] = ['id', 'blend_name', 'intensifier', 'origin', 'variety', 'notes'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store<fromCoffee.State>,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.coffeeList$ = this.store.select(fromCoffee.selectCoffeeList).pipe(
      map((data: Coffee[]) => {
        this.coffeeDataSource = new MatTableDataSource<Coffee>();
        this.coffeeDataSource.data = data;
        this.coffeeDataSource.paginator = this.paginator;
        return data;
      })
    );
    this.store.dispatch(coffeeActions.fetchCoffeeList())
  }

  ngAfterViewInit(): void {
    this.coffeeDataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  goToCoffeeDetails(coffeeId: string) {
    this.router.navigateByUrl(`/coffees/${coffeeId}`);
  }

}
