import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffee } from './coffee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  fetchCoffeeList(): Observable<any> {
    const url = "https://random-data-api.com/api/coffee/random_coffee?size=50";
    // return this.http.get<Coffee[]>('assets/data.json');
    return this.http.get<Coffee[]>(url);
  }
}
