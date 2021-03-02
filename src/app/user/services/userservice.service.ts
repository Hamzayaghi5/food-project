import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import * as config from '../../config';
import { User, Person, LoginModel, TokenResponse } from '../models/user';
import { getHeaders } from "../../helpers/getHeaders";
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Initiative } from '../models/initiative';
import { Invitation } from '../models/Invitation';
import { MealRequest } from '../models/meal-request';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private _loggedInUser: LoginModel=new LoginModel();
  public get loggedInUser(): LoginModel {
    return this._loggedInUser;
  }
  public set loggedInUser(value: LoginModel) {
    this._loggedInUser = value;
  }
  private isLogged: boolean = false;
  constructor(private http: HttpClient) { }
  //meal Request
  MealRequest(mr: MealRequest) {
    return this.http.post(config.ApiUrl + 'api/vmMealRequests', mr, { headers: getHeaders() });
  }
  getMealRequests(InitId): Observable<MealRequest[]> {
    return this.http.get<MealRequest[]>(config.ApiUrl + 'api/MealRequests/OfInitiative/' + InitId);
  }
  //invitations
  AcceptInvitation(inv: Invitation) {
    return this.http.put(config.ApiUrl + 'api/Invitations/' + inv.Id, inv, { headers: getHeaders() });
  }
  // Intiatives services
  getInitiativeInvitations(id): Observable<Invitation[]> {
    return this.http.get<Invitation[]>(config.ApiUrl + 'api/Invitations/OfInitiative/' + id);
  }
  InvitePerson(inv: Invitation) {
    return this.http.post(config.ApiUrl + 'api/Invitations', inv, { headers: getHeaders() });
  }
  DisableInitiative(init: Initiative) {
    return this.http.put(config.ApiUrl + 'api/Initiatives/' + init.Id, init, { headers: getHeaders() });
  }
  getInitiativeByPersone(id: number): Observable<Initiative[]> {
    return this.http.get<Initiative[]>(config.ApiUrl + 'api/Initiatives/OfPerson/' + id);
  }
  AddInitiative(init: Initiative) {
    return this.http.post(config.ApiUrl + 'api/Initiatives', init, { headers: getHeaders() });
  }
  getInitiativebyId(id: number): Observable<Initiative> {
    return this.http.get<Initiative>(config.ApiUrl + 'api/Initiatives/' + id);
  }

  //users services
  getPeopleById(id): Observable<Person> {
    return this.http.get<Person>(config.ApiUrl + 'api/People/' + id);
  }
  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(config.ApiUrl + 'api/People');
  }
  RegisterUser(user: User) {
    return this.http.post(config.ApiUrl + 'api/account/register', user, { headers: getHeaders() });
  }
  SearchUser(_username: string): Observable<User[]> {
    return this.http.get<User[]>(config.ApiUrl + 'api/users/search/' + _username);
  }
  RegisterPerson(person: Person) {
    return this.http.post(config.ApiUrl + 'api/People', person, { headers: getHeaders() });
  }
  UserLogin(_username: string, _password: string): Observable<boolean> {
    let data = "grant_type=password&username=" + _username + "&password=" + _password;
    return this.http.post<TokenResponse>(config.ApiUrl + '/token', data, { headers: getHeaders() }).
      pipe(
        map(at => {
          if (at) {
            console.log(at);

            if (!this.loggedInUser)
              this.loggedInUser = new LoginModel();

            // casting the coming value to LoginModel object
            this.loggedInUser.userName = at.userName;
            this.loggedInUser.token = at.access_token;
            this.loggedInUser.expires = new Date(at[".expires"]);
            this.loggedInUser.personId = at.personId;

            if (this.tokenIsValid()) {
              this.isLogged = true;
              this.saveLoggedinInfo(this.loggedInUser);
            }
            else
              this.logout();
          }
          else {
            this.logout();
          }

          // login must return a boolean
          return this.isLogged;
        }),
        retry(1),
        catchError(err => this.handleError(err))
      );
  }

  logout() {
    this.isLogged = false;
    this.loggedInUser.token = '';
    this.loggedInUser.userName = '';
    this.loggedInUser.expires = new Date('01-01-1980');
    localStorage.removeItem('currentUser');
  }

  saveLoggedinInfo(loginUser: LoginModel) {
    // use encryption if possible
    localStorage.setItem('currentUser', JSON.stringify(loginUser));
  }

  loggedUser(): LoginModel {
    if (!this.tokenIsValid) {
      this.loggedInUser.token = '';
      this.loggedInUser.userName = '';
    }
    return this.loggedInUser;
  }

  readSavedUserInfo() {
    if (!this.loggedInUser) {
      this.loggedInUser = new LoginModel();
      this.loggedInUser.token = '';
      this.loggedInUser.userName = '';
      this.loggedInUser.expires = new Date('01-01-1980');
    }

    let lStorageUser: string = localStorage.getItem('currentUser');
    if (!lStorageUser || lStorageUser === "undefined") {
      this.loggedInUser.token = '';
      this.loggedInUser.userName = '';
      this.loggedInUser.expires = new Date('01-01-1980');
    } else {
      // decrypt info if it's encrypted
      this.loggedInUser = JSON.parse(lStorageUser);
    }
    this.tokenIsValid();
  }
  tokenIsValid(): boolean {
    // Check if the token is expired
    let now = new Date();
    let expiryDate: Date = new Date(this.loggedInUser.expires);
    this.isLogged = (expiryDate > now) && this.loggedInUser.token != '';

    return this.isLogged;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Could not get access token from server; please try again later.');
  }

  getInitiativeByperson(id: number): Observable<Initiative[]> {
    return this.http.get<Initiative[]>(config.ApiUrl + 'api/initiatives/ofPerson/' + id);
  }

}
