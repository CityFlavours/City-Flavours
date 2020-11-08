import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HotelListComponent } from './hotels/hotel-list.component';
import { HotelMenuComponent } from './hotels/hotel-menu.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { TiffinComponent } from './tiffin/tiffin.component';
import { TiffinDetailsComponent } from './tiffin/tiffin-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [Tab2Page , HotelListComponent, HotelMenuComponent , CartComponent, AddressComponent , TiffinComponent ,TiffinDetailsComponent],
  entryComponents:[AddressComponent,TiffinDetailsComponent]
})
export class Tab2PageModule {}
