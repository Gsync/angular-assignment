import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeDetailsComponent } from './coffee-details/coffee-details.component';
import { CoffeeListComponent } from './coffee-list/coffee-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'coffees',
        component: CoffeeListComponent,
      },
      {
        path: 'coffees/:coffeeId',
        component: CoffeeDetailsComponent
      },
      {
        path: '',
        redirectTo: 'coffees',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'coffees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
