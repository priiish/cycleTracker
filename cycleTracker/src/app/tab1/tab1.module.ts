import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {ModalPageModule} from "../modal-page/modal-page.module";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    NgCircleProgressModule.forRoot(),
    Tab1PageRoutingModule,
    ModalPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
