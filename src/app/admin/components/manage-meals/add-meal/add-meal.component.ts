import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal } from 'src/app/admin/models/meal';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrls: ['./add-meal.component.css']
})
export class AddMealComponent implements OnInit {

  newMeal: Meal = new Meal();
  rest_id: number;

  constructor(private route: ActivatedRoute, private serv: AdminServiceService, private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(t => {
      this.rest_id = +t.get('rest_id');
    }
    );
  }

  AddNewMeal(meal: Meal) {
    meal.RestaurantId = stringify(this.rest_id);

    this.serv.addMeal(meal).subscribe(t => {
      console.log(t);
    });
  }

}
