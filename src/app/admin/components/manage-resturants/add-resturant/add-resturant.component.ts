import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { config } from 'rxjs';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';
import { Resturant } from '../../../models/resturant';
@Component({
  selector: 'app-add-resturant',
  templateUrl: './add-resturant.component.html',
})
export class AddResturantComponent implements OnInit {
  newRest: Resturant = new Resturant();
  constructor(private serv:AdminServiceService) { }

  ngOnInit(): void {
  }
  AddNewRest(rest: Resturant) {
    this.serv.addResturant(rest).subscribe(t=>{
       console.log(t);
       
    });
  }

}
