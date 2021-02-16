import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { AdminBaseContentComponent } from './components/admin-base-content/admin-base-content.component';

const routes: Routes = [
 {path:'admin',component:AdminBaseContentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
