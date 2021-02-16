import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resturant } from '../models/resturant';
import * as config from '../../config';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }
  getResturants(): Observable<Resturant> {
    return this.http.get<Resturant>(config.ApiUrl + 'api/Restaurants');
  }
}
