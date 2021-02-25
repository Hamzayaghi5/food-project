import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resturant } from '../models/resturant';
import { Meal } from '../models/meal';
import * as config from '../../config';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  // headers
  getHeaders(): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return headers;
  }
  constructor(private http: HttpClient) { }
  //returants services
  getResturants(): Observable<Resturant[]> {
    return this.http.get<Resturant[]>(config.ApiUrl + 'api/Restaurants');
  }
  addResturant(rest: Resturant) {
    return this.http.post(config.ApiUrl + 'api/Restaurants', JSON.stringify(rest), { headers: this.getHeaders() });
  }

  getResturantById(id: number): Observable<Resturant> {
    return this.http.get<Resturant>(config.ApiUrl + 'api/Restaurants/' + id);
  }
  DeleteResturant(id: number) {
    return this.http.delete(config.ApiUrl + 'api/Restaurants/' + id);
  }
  UpdateResturant(rest: Resturant): Observable<Resturant> {
    return this.http.put<Resturant>(config.ApiUrl + 'api/Restaurants/' + rest.Id,
      JSON.stringify(rest), { headers: this.getHeaders() });
  }

  ///////////////////////////////////
  getMealsOfRestaurant(id: number): Observable<Meal[]> {
    return this.http.get<Meal[]>(config.ApiUrl + 'api/Meals/OfRestaurant/' + id);
  }

  getMealById(id: number): Observable<Meal> {
    return this.http.get<Meal>(config.ApiUrl + 'api/Meals/' + id);
  }


  DeleteMeal(id: number) {
    return this.http.delete(config.ApiUrl + 'api/Meals/' + id);
  }


  UpdateMeal(meal: Meal): Observable<Meal> {
    return this.http.put<Meal>(config.ApiUrl + 'api/Meals/' + meal.Id,
      JSON.stringify(meal), { headers: this.getHeaders() });
  }
  addMeal(meal: Meal) {
    return this.http.post(config.ApiUrl + 'api/Meals', JSON.stringify(meal), { headers: this.getHeaders() });
  }

}
