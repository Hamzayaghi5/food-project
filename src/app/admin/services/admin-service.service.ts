import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resturant } from '../models/resturant';
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
    styleUrls: ['./resturant-details.component.css']
    return this.http.post(config.ApiUrl + 'api/Restaurants', JSON.stringify(rest), { headers: this.getHeaders() })
  }
}
