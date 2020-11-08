import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { HotelListComponent } from './hotels/hotel-list.component';
import { HotelMenuComponent } from './hotels/hotel-menu.component';
import { CartComponent } from './cart/cart.component';
import { Address } from './address/address.component';
import { TiffinComponent } from './tiffin/tiffin.component';

const routes: Routes = [
  {
    path: '',
    component: HotelListComponent,
  },
    {
      path: 'other/:id',
      component: TiffinComponent,
      pathMatch: 'full'
    },
    {
      path:'hotel/:id',
      component: HotelMenuComponent,
      pathMatch: 'full'
    },{
      path:'cart',
      component: CartComponent,
      pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
