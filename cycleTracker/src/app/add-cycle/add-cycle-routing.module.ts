import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCyclePage } from './add-cycle.page';

const routes: Routes = [
  {
    path: '',
    component: AddCyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCyclePageRoutingModule {}
