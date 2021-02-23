import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "../../../helpers/must-match";
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {
  RegisterForm: FormGroup;
  submitted: boolean = false;
  hide = true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required, Validators.email])],
      UserName: ['', Validators.compose([Validators.required])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[0-9 a-z A-Z !@#$%^&*()-=]*?')])],
      passConfirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Phone: ['', Validators.compose([Validators.required])],
      Mobile: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[09][0-9]*')])]
    }, { validator: MustMatch('Password', 'passConfirm') });
  }
  get f() {
    return this.RegisterForm.controls;
  }
  onRegisterFormSubmit(e) {
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      e.preventDefault();

    }

  }

}
