import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MustMatch } from "../../../helpers/must-match";
import { Person, User } from '../../models/user';
import { UserserviceService } from "../../services/userservice.service";
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  RegisterForm: FormGroup;
  LoginForm: FormGroup;
  submitted: boolean = false;
  lsubmitted: boolean = false;
  hide = true;
  hidec = true;
  lhide = true;
  _progressBar: boolean = false;
  _lprogressBar: boolean = false;
  _responseError: boolean = false;
  _lresponseError: boolean = false;
  constructor(private fb: FormBuilder, private serv: UserserviceService, private matSnackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      UserName: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9 a-z A-Z !@#$%^&*()-=]*?')])],
      ConfirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Phone: ['', Validators.compose([Validators.required])],
      Mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[09][0-9]*')])]
    }, { validator: MustMatch('Password', 'ConfirmPassword') });
    this.LoginForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9 a-z A-Z !@#$%^&*()-=]*?')])],
    });
  }
  get f() {
    return this.RegisterForm.controls;
  }

  get fl() {
    return this.LoginForm.controls;
  }
  onLoginFormSubmit(e) {
    this.lsubmitted = true;
    if (this.LoginForm.invalid) {
      e.preventDefault();
      return;
    }
    this._lprogressBar = true;
    let _username = this.LoginForm.get('Email').value;
    let _password = this.LoginForm.get('Password').value;
    let _id: string;
    this.serv.UserLogin(_username, _password).subscribe(res => {
      console.log(res);
      this.serv.SearchUser(_username).subscribe(res => {
        _id = res[0].Id;
        localStorage.setItem('LoggedID', _id);
      });
      this._lprogressBar = false;
    }, error => {
      console.log(error);
      this._lresponseError = true;
    });
  }
  onRegisterFormSubmit(e) {
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      e.preventDefault();
      return;
    }
    this._progressBar = true;
    let _user = new User();
    let _person = new Person();
    Object.assign(_user, this.RegisterForm.value);
    Object.assign(_person, this.RegisterForm.value);
    console.log(_user);
    console.log(_person);

    this.serv.RegisterUser(_user).subscribe(success => {
      let _splitedEmail = _user.Email.split('@')[0];
      this.serv.SearchUser(_splitedEmail).subscribe(_searchedUser => {
        console.log(_searchedUser);
        _person.UserId = _searchedUser[0].Id;
        console.log(_person);
        this.serv.RegisterPerson(_person).subscribe(res => {
          console.log(res);
          this._progressBar = false;
          this.matSnackBar.open("User Successfully Registered", "Close", {
            duration: 3000,
          });

        }, error => {
          this._responseError = true;
        })
      }, error => {
        this._responseError = true;
      });
    }, error => {
      this._responseError = true;
    });


  }

}
