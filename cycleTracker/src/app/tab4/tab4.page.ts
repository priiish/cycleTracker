import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import { CalendarComponentOptions } from 'ion2-calendar';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  date: string;
  type: 'string';

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
   * Popover initial in Tab3 end
   */

  onChange($event) {
    console.log($event);
  }

  ngOnInit() {
  }

}
