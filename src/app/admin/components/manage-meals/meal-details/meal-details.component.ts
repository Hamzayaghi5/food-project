import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meal, vmMeal } from 'src/app/admin/models/meal';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  meal: Meal = new Meal();
  vmeal: vmMeal = new vmMeal();

  constructor(private route: ActivatedRoute, private router: Router, private serv: AdminServiceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(t => {
      let Id = +t.get('id');
      this.serv.getMealById(Id).subscribe(m => {
        console.log(m);
        this.meal = m;
      }, error => {
        console.log(error);
      });

    });
  }


  UpdateMeal(meal: Meal) {
    this.serv.UpdateMeal(meal).subscribe(t => {
      console.log(t);
    });
    this.router.navigate(['rest-meals/', meal.RestaurantId], { relativeTo: this.route });


  }



}
