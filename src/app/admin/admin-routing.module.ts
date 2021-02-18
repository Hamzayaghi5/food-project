import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { AdminBaseContentComponent } from './components/admin-base-content/admin-base-content.component';
import { AddResturantComponent } from './components/manage-resturants/add-resturant/add-resturant.component';
import { ResturantDetailsComponent } from './components/manage-resturants/resturant-details/resturant-details.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminBaseContentComponent, children: [
      { path: 'add-new-rest', component: AddResturantComponent },
      { path: 'rest-details', component: ResturantDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
