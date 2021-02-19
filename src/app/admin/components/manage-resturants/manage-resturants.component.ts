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
  constructor(private serv: AdminServiceService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.serv.getResturants().subscribe(t => {
      this.data = t;

    });
  }
  showAddRest() {
    this.router.navigate(['add-new-rest'], { relativeTo: this.route });
  }
  onSelect(rest: Resturant) {
    this.selectedRest = rest;
    this.router.navigate(['rest-details', rest.Id], { relativeTo: this.route });
  }

  DeleteRest(rest: Resturant) {
    this.serv.DeleteResturant(+rest.Id).subscribe(t => {
      console.log(t);
      this.serv.getResturants().subscribe(t => {
        this.data = t;
      });

    })
  }

}
