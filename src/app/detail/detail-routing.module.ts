import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginRedirectService } from '../services/loginredirect.service.';
import { DetailComponent } from './detail.component';
import { AuthorizeService } from '../services/authorize.service';
import { TermsAndConditionsPage } from './terms-and-conditions/terms-and-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent
  },
  {
    path: 'terms',
    component: TermsAndConditionsPage ,
    pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
