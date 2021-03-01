import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Initiative } from 'src/app/user/models/initiative';
import { LoginModel, Person } from 'src/app/user/models/user';
import { Invitation } from 'src/app/user/models/Invitation';
import { UserserviceService } from 'src/app/user/services/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MealRequest } from 'src/app/user/models/meal-request';

@Component({
  selector: 'app-initiative-invitations',
  templateUrl: './initiative-invitations.component.html',
  styleUrls: ['./initiative-invitations.component.css']
})
export class InitiativeInvitationsComponent implements OnInit {
  comment: string;
  login = new LoginModel();
  currentInit: Initiative = new Initiative();
  people: Person[] = [];
  MealRequests: MealRequest[] = [];
  columnsToDisplay: string[] = ['Id', 'Email', 'UserName', 'FirstName', 'LastName', 'Phone', 'Mobile', 'Actions'];
  columnsToDisplay2: string[] = ['Id', 'PersonName', 'MealName', 'Count', 'Price', 'TotalPrice'];
  constructor(private route: ActivatedRoute, private serv: UserserviceService, private matSnackBar: MatSnackBar) {
  }
  //Restaurant
  ngOnInit(): void {
    this.login = JSON.parse(localStorage.getItem('currentUser'));
    this.route.paramMap.subscribe(t => {
      let init_id = t.get('init_id');
      this.serv.getInitiativebyId(+init_id).subscribe(res => {
        console.log(res);

        this.currentInit = res;
        this.currentInit.InitiatorName = res["Person"]["AspNetUsers"]["Email"];
        this.currentInit.RestaurantId = res["Restaurant"]["Id"];
        this.currentInit.RestaurantName = res["Restaurant"]["Name"];


        console.log(this.currentInit);
        this.serv.getMealRequests(this.currentInit.Id).subscribe(res => {
          console.log(res);
          this.MealRequests = res;
        });
      });
    });
    this.serv.getPeople().subscribe(res => {
      console.log(res);
      this.people = res;
    });
  }
  onRowClick(row) {

  }
  InvitePerson(id) {
    console.log(id);
    let x = new Invitation();
    x.PersonId = id;
    x.InitiativeId = this.currentInit.Id;
    x.Comment = this.comment;
    this.serv.InvitePerson(x).subscribe(res => {
      console.log(res);
      this.matSnackBar.open("Succesfully Invited", "Close", {
        duration: 3000,
      });
    });
  }

}