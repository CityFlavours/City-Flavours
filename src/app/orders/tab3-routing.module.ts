import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentComponent } from './current.component';
import { PreviousComponent } from './previous.component';
import { Tab3Page } from './tab3.page';
import { TrackComponent } from './track.component';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  },
  {
    path: 'current-orders',
    component: CurrentComponent,
  },
  {
    path: 'previous-orders',
    component: PreviousComponent,
  },
  {
    path: 'tracking/:id',
    component: TrackComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
