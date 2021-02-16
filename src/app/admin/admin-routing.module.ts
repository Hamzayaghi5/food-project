import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";

const routes: Routes = [
  { path: 'admin/manage-rests', component: ManageResturantsComponent },
  { path: 'admin/manage-meals', component: ManageMealsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
