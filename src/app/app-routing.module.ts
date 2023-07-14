import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'jira-board', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: '', redirectTo: 'jira-board', pathMatch: 'full'
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'logout', component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
