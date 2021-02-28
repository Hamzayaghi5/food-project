import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisteruserComponent } from "../user/components/registeruser/registeruser.component";
import { AddInitiativeComponent } from './components/userprofile/add-initiative/add-initiative.component';
import { InitiativeInvitationsComponent } from './components/userprofile/initiative-invitations/initiative-invitations.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
const routes: Routes = [
  { path: 'user-register', component: RegisteruserComponent },
  {
    path: 'user-profile', component: UserprofileComponent, children: [
      { path: 'add-initiative', component: AddInitiativeComponent },
      { path: 'initiative-invite/:init_id', component: InitiativeInvitationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
