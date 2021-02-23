import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { AddResturantComponent } from './components/manage-resturants/add-resturant/add-resturant.component';
import { ResturantDetailsComponent } from './components/manage-resturants/resturant-details/resturant-details.component';
import { AdminbasecontentComponent } from './components/adminbasecontent/adminbasecontent.component';
import { AddMealComponent } from './components/manage-meals/add-meal/add-meal.component';
import { MealDetailsComponent } from './components/manage-meals/meal-details/meal-details.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminbasecontentComponent, children: [{
      path: 'mange-rests', component: ManageResturantsComponent, children:
        [
          { path: 'add-new-rest', component: AddResturantComponent },
          { path: 'rest-details/:id', component: ResturantDetailsComponent },
        ]
    },
    {
      path: 'rest-meals/:rest_id', component: ManageMealsComponent, children:
        [
          { path: 'add-new-meal/:rest_id', component: AddMealComponent },
          { path: 'meal-details/:id', component: MealDetailsComponent },
        ]
    }]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
