import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { LoginRedirectService } from '../services/loginredirect.service.';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [LoginRedirectService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
