import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from "../../../helpers/must-match";
import { LoginModel } from '../../models/user';
import { UserserviceService } from '../../services/userservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  login = new LoginModel();
  UpdateProfileForm: FormGroup;
  submitted: boolean = false;
  hide: boolean = true;
  matDrawerLinks: string[] = ['Create Initiative', 'My Invitations', 'Logout'];
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
    private serv: UserserviceService) { }

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('currentUser'));
    this.UpdateProfileForm = this.fb.group({
      Email: ['', Validators.compose([Validators.required,])],
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
  UserLogout() {
    console.log(localStorage.getItem('currentUser'));
  }

  DrawerNavigate(option: string) {
    switch (option) {
      case 'Create Initiative': this.router.navigate(['add-initiative'], { relativeTo: this.route });
        break;
      case 'My Invitations': this.router.navigate(['view-my-invitation'], { relativeTo: this.route });
        break;
      case 'Logout': this.serv.logout(); this.router.navigate(['user-register']);
    }
  }



}
