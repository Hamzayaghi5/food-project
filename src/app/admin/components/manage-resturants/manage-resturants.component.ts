import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Resturant } from '../../models/resturant';
import { AdminServiceService } from "../../services/admin-service.service";
@Component({
  selector: 'app-manage-resturants',
  templateUrl: './manage-resturants.component.html',
  styleUrls: ['./manage-resturants.component.css']
})
export class ManageResturantsComponent implements OnInit {
  data: Resturant[] = [];
  selectedRest: Resturant = new Resturant();
  columnsToDisplay: string[] = ['Id', 'Name', 'Address', 'Phone','Action'];
  constructor(private serv: AdminServiceService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.serv.getResturants().subscribe(t => {
      this.data = t;

    });
  }
  showAddRest() {
    this.router.navigate(['add-new-rest'], { relativeTo: this.route });
  } 

  DeleteRest(id:number) {
    this.serv.DeleteResturant(+id).subscribe(t => {
      console.log(t);
      this.serv.getResturants().subscribe(t => {
        this.data = t;
      });

    });
  }
  onRowClick(row:Resturant) {
    this.selectedRest = row;
    this.router.navigate(['rest-details', row.Id], { relativeTo: this.route });

  }

}
