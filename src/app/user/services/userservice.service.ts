import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as config from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http: HttpClient) { }

  RegisterUser() {
    // this.http.post(config.ApiUrl + 'api/Users')
  }
}
