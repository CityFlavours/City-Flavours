import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { TermsAndConditionsPage } from './terms-and-conditions/terms-and-conditions.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DetailRoutingModule
  ],
  declarations: [DetailComponent , TermsAndConditionsPage]
})
export class DetailModule {}
