import { Component, OnInit } from '@angular/core';
import { Meal } from '../../models/meal';

@Component({
  selector: 'app-manage-meals',
  templateUrl: './manage-meals.component.html',
  styleUrls: ['./manage-meals.component.css']
})
export class ManageMealsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showAddmeal() {

  }
  onRowClick(row: Meal) {

  }

}
