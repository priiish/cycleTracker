import { Component } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Popover initial in Tab1
   */
  constructor(private popoverController: PopoverController) { }

  async viewPopover() {
    const popover = await this.popoverController.create({
      component: PopoverViewerComponent,
      cssClass: 'popover_setting',
      componentProps: {},
      translucent: true
    });

    popover.onDidDismiss().then((result) => {
      console.log(result.data);
    });

    return await popover.present();
    /** Sync event from popover component */

  }
  /**
   * Popover initial in Tab1 end
   */


}
