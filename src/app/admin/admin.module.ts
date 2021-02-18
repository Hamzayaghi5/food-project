import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { HttpClientModule } from "@angular/common/http";
import { AdminBaseContentComponent } from './components/admin-base-content/admin-base-content.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import { AddResturantComponent } from "../admin/components/manage-resturants/add-resturant/add-resturant.component";
import {MatInputModule} from '@angular/material/input';
import { ResturantDetailsComponent } from './components/manage-resturants/resturant-details/resturant-details.component';

@NgModule({
  declarations: [ManageResturantsComponent, ManageMealsComponent, AdminBaseContentComponent, AddResturantComponent, ResturantDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatTabsModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AdminModule { }
