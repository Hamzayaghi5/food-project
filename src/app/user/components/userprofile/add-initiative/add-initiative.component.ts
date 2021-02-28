import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  Initiatives: Initiative[] = [];
  addInitiativeForm: FormGroup;
  submitted: boolean = false;
  columnsToDisplay: string[] = ['Id', 'InitiatorId', 'InitiatorName', 'RestaurantId', 'RestaurantName', 'DayOfInitiative', 'ExpectedCallTime', 'IsActive', 'Actions'];
  login = new LoginModel();
  constructor(private restServ: AdminServiceService, private fb: FormBuilder, private matSnackBar: MatSnackBar,
    private serv: UserserviceService, private router: Router) {
    this.login = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit(): void {
    this.addInitiativeForm = this.fb.group({
      RestaurantId: ['', Validators.required],
      ExpectedCallTime: ['', Validators.required]
    });
    this.restServ.getResturants().subscribe(rests => {
      console.log(rests);
      this.rests = rests;
    });
    this.serv.getInitiativeByPersone(+this.login.personId).subscribe(res => {
      console.log(res);
      this.Initiatives = res;
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
    x.InitiatorId = this.login.personId;
    x.RestaurantId = this.addInitiativeForm.get('RestaurantId').value;
    x.ExpectedCallTime = this.addInitiativeForm.get('ExpectedCallTime').value;
    x.DayOfInitiative = (new Date()).toDateString();
    x.IsActive = true;
    this.serv.AddInitiative(x).subscribe(res => {
      console.log(res);
      this.serv.getInitiativeByPersone(+this.login.personId).subscribe(res => {
        this.Initiatives = res;
      });
      this.matSnackBar.open("Initiative Add Successfully", "Close", {
        duration: 3000,
      });
    });




  }
  onRowClick(row) {

  }

  DisableInit(id: string) {
    let init = new Initiative;
    init = this.Initiatives.filter(x => x.Id = id)[0]
    console.log(init);
    init.IsActive = false;
    this.serv.DisableInitiative(init).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Initiative Disabled Successfully", "Close", {
        duration: 3000,
      });

    });


  }
  InvitesOfInit(id: number) {
    this.router.navigate(['user-profile/initiative-invite', id]);
  }

}
