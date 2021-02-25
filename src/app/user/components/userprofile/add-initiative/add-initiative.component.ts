import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Resturant } from 'src/app/admin/models/resturant';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';
import { LoginModel } from 'src/app/user/models/user';
import { UserserviceService } from 'src/app/user/services/userservice.service';
import { Initiative } from "../../../models/initiative";
@Component({
  selector: 'app-add-initiative',
  templateUrl: './add-initiative.component.html',
  styleUrls: ['./add-initiative.component.css']
})
export class AddInitiativeComponent implements OnInit {
  rests: Resturant[] = [];
  addInitiativeForm: FormGroup;
  submitted: boolean = false;
  constructor(private restServ: AdminServiceService, private fb: FormBuilder, private matSnackBar: MatSnackBar,
    private serv: UserserviceService) { }

  ngOnInit(): void {
    this.addInitiativeForm = this.fb.group({
      RestaurantId: ['', Validators.required],
      ExpectedCallTime: ['', Validators.required]
    });
    this.restServ.getResturants().subscribe(rests => {
      console.log(rests);
      this.rests = rests;
    });
  }

  get f() {
    return this.addInitiativeForm.controls;
  }


  onAddInitiativeFormSubmit(e) {
    if (this.addInitiativeForm.invalid) {
      e.preventDefaults();
      return;
    }
    let x = new Initiative();
    let login = new LoginModel();
    login = JSON.parse(localStorage.getItem('currentUser'));
    x.InitiatorId = login.personId;
    x.RestaurantId = this.addInitiativeForm.get('RestaurantId').value;
    x.ExpectedCallTime = this.addInitiativeForm.get('ExpectedCallTime').value;
    x.DayOfInitiative = (new Date()).toDateString();
    x.IsActive = true;
    console.log(x);
    console.log(login);

    this.serv.AddInitiative(x).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("User Successfully Registered", "Close", {
        duration: 3000,
      });
    });

  }

}
