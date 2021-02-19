import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { AddResturantComponent } from './components/manage-resturants/add-resturant/add-resturant.component';
import { ResturantDetailsComponent } from './components/manage-resturants/resturant-details/resturant-details.component';
import { AdminbasecontentComponent } from './components/adminbasecontent/adminbasecontent.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminbasecontentComponent, children: [{
      path: 'mange-rests', component: ManageResturantsComponent, children: [
        { path: 'add-new-rest', component: AddResturantComponent },
        { path: 'rest-details/:id', component: ResturantDetailsComponent },
      ]
    }]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
