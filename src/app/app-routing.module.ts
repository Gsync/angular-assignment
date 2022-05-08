import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: '',
        redirectTo: 'coffees',
        pathMatch: 'full'
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
