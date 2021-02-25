import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Meal } from '../../models/meal';
import { Resturant } from '../../models/resturant';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  rest: Resturant = new Resturant();
  rest_id: number;
  meals: Meal[] = [];
  selectedMeal: Meal = new Meal();

  columnsToDisplay: string[] = ['Id', 'Name', 'Description', 'Price', 'IsActive', 'Action'];

  constructor(private serv: AdminServiceService, private router: Router, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.route.paramMap.subscribe(t => {
      let Id = +t.get('rest_id');
      this.serv.getResturantById(Id).subscribe(r => { this.rest = r; });
      this.rest_id = +this.rest.Id;
      this.serv.getMealsOfRestaurant(Id).subscribe(m => {
        this.meals = m;
        console.log(m);
      }, error => {
        console.log(error);
      });
    });
  }


  showAllMeals(rest_id: number) {
    this.serv.getMealsOfRestaurant(rest_id).subscribe(t => { this.meals = t; });
  }

  showAddMeal() {
    this.router.navigate(['add-new-meal/', this.rest.Id], { relativeTo: this.route });
  }



  onRowClick(row: Meal) {
    this.selectedMeal = row;
    this.router.navigate(['meal-details', row.Id], { relativeTo: this.route });
  }



  DeleteMeal(id: number) {
    this.serv.DeleteMeal(+id).subscribe(t => {
      console.log(t);
      this.serv.getMealsOfRestaurant(this.rest_id).subscribe(t => { this.meals = t; });
    });
  }

}
