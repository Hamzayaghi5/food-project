import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Initiative } from 'src/app/user/models/initiative';
import { Invitation } from 'src/app/user/models/Invitation';
import { LoginModel, Person } from 'src/app/user/models/user';
import { UserserviceService } from 'src/app/user/services/userservice.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';
import { Meal } from 'src/app/admin/models/meal';
import { MealRequest } from 'src/app/user/models/meal-request';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-view-my-invitations',
  templateUrl: './view-my-invitations.component.html',
  styleUrls: ['./view-my-invitations.component.css']
})
export class ViewMyInvitationsComponent implements OnInit {
  myInvitations: Invitation[] = [];
  login = new LoginModel();
  people: Person[] = [];


  columnsToDisplay: string[] = ['Id', 'InitiatorName', 'PersonName', 'Comment', 'IsAccepted', 'SeenAt', 'PersonId'];
  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private serv: UserserviceService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('currentUser'));
    this.serv.getPeopleById(this.login.personId).subscribe(res => {
      console.log(res);

      this.myInvitations = res.Invitation;
      console.log(this.myInvitations);

    });
  }
  onRowClick(row: Invitation) {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '1000px',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {
  Init: Initiative = new Initiative();
  Meals: Meal[] = [];
  MealRequestForm: FormGroup;
  login = new LoginModel();
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Invitation, private fb: FormBuilder,
    private serv: UserserviceService, private aserv: AdminServiceService,
    private matSnackBar: MatSnackBar, public dialog: MatDialog) { }
  ngOnInit(): void {
    console.log(this.data);

    this.login = JSON.parse(localStorage.getItem('currentUser'));
    this.MealRequestForm = this.fb.group({
      MealId: ['', Validators.required],
      Count: ['', Validators.required]
    })
    this.serv.getInitiativebyId(+this.data.InitiativeId).subscribe(res => {
      console.log(res);
      this.Init = res;
      this.aserv.getMealsOfRestaurant(+this.Init.RestaurantId).subscribe(res => {
        console.log(res);
        this.Meals = res;
      })
    });

  }

  onNoClick(): void {
    this.DeclineInvite(1);
    this.dialogRef.close();
  }

  AcceptInvite(id): Invitation {
    let inv = new Invitation();
    inv = this.data
    inv.IsAccepted = true;
    inv.SeenAt = (new Date()).toDateString();
    this.serv.AcceptInvitation(inv).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Invitation Accepted", "close", { duration: 3000 });
    });
    return inv;
  }

  DeclineInvite(id): Invitation {
    let inv = new Invitation();
    inv = this.data;
    inv.IsAccepted = false;
    inv.SeenAt = (new Date()).toDateString();
    console.log(inv);
    
    this.serv.AcceptInvitation(inv).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Invitation Declined", "close", { duration: 3000 });
    });
    return inv;
  }
  onMealRequestFormSubmit(e) {
    if (this.MealRequestForm.invalid) {
      e.preventDefault();
      return;
    }
    let inv = this.AcceptInvite(this.data.Id);
    let x = new MealRequest();
    x = this.MealRequestForm.value;
    x.PersonId = this.login.personId;
    x.InitiativeId = inv.InitiativeId;
    console.log(x);
    this.serv.MealRequest(x).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Meal Ordered", "close", { duration: 3000 });
    });


  }
}