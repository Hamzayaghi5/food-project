import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ManageResturantsComponent } from "./components/manage-resturants/manage-resturants.component";
import { ManageMealsComponent } from "./components/manage-meals/manage-meals.component";
import { HttpClientModule } from "@angular/common/http";
import { AdminBaseContentComponent } from './components/admin-base-content/admin-base-content.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [ManageResturantsComponent,ManageMealsComponent, AdminBaseContentComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    MatTabsModule
  ]
})
export class AdminModule { }
