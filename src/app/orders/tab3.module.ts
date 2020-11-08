import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab3PageRoutingModule } from './tab3-routing.module'
import { CurrentComponent } from './current.component';
import { PreviousComponent } from './previous.component';
import { TrackComponent } from './track.component';
import { OrderStatusPipe } from '../order-status.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page , CurrentComponent, PreviousComponent ,TrackComponent ,OrderStatusPipe]
})
export class Tab3PageModule {}
