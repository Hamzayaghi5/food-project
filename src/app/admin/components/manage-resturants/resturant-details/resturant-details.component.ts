import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Resturant } from 'src/app/admin/models/resturant';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';

@Component({
  selector: 'app-resturant-details',
  templateUrl: './resturant-details.component.html',
})
export class ResturantDetailsComponent implements OnInit {
  rest: Resturant = new Resturant();
  constructor(private route: ActivatedRoute, private serv: AdminServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(t => {
      let Id = +t.get('id');
      this.serv.getResturantById(Id).subscribe(rest => {
        console.log(rest);
        this.rest = rest;
      }, error => {
        console.log(error);

      });

    });
  }
  UpdateRest(rest: Resturant) {
    this.serv.UpdateResturant(rest).subscribe(t => {
      console.log(t);
    });
  }

}