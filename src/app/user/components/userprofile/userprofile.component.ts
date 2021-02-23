import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from "../../../helpers/must-match";

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  UpdateProfileForm: FormGroup;
  submitted: boolean = false;
  hide:boolean=true;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.UpdateProfileForm = this.fb.group({
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
    return this.UpdateProfileForm.controls;
  }



}
