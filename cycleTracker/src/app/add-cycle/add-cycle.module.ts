import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCyclePageRoutingModule } from './add-cycle-routing.module';

import { AddCyclePage } from './add-cycle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCyclePageRoutingModule
  ],
  declarations: [AddCyclePage]
})
export class AddCyclePageModule {}
