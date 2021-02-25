import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisteruserComponent } from "../user/components/registeruser/registeruser.component";
import { AddInitiativeComponent } from './components/userprofile/add-initiative/add-initiative.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ViewMyInvitationsComponent } from './components/userprofile/view-my-invitations/view-my-invitations.component';
const routes: Routes = [
  { path: 'user-register', component: RegisteruserComponent },
  {
    path: 'user-profile', component: UserprofileComponent, children: [
      { path: 'add-initiative', component: AddInitiativeComponent },
      {path:'view-my-invitation/:id',component:ViewMyInvitationsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
