import { Component, OnInit } from '@angular/core';
import { People } from '../../models/people';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from "../../services/admin-service.service";

@Component({
  selector: 'app-manage-people',
  templateUrl: './manage-people.component.html',
  styleUrls: ['./manage-people.component.css']
})
export class ManagePeopleComponent implements OnInit {
data: People[]=[];
selectedPeople: People = new People();
columnsToDisplay: string[] = ['Id', 'UserId', 'FirstName', 'LastName','Phone', 'Mobile','IsActive'];

  constructor(private serv: AdminServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serv.getPeople().subscribe(t => {
      this.data = t;
    });
  }
  DeletePeople(id:number)
  {
    this.serv.deletePeople(+id).subscribe(t =>{
      console.log(t);
      this.serv.getPeople().subscribe(t => {
        this.data = t;
      });
    });
  }

}
