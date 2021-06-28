import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';
import {PopoverController} from "@ionic/angular";
import {PopoverViewerComponent} from "../popover-viewer/popover-viewer.component";
import {StorageService} from "../service/storage.service";


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Page {
  dateRange: {from: string; to: string;};
  type: 'string';

  options: CalendarComponentOptions = {
    pickMode: 'range',
    monthPickerFormat: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    weekdays: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    monthFormat: 'MM/YYYY'
  };

  constructor(private popoverController: PopoverController,private storageService: StorageService) {
  }
 /* Initialize function to choose mod for calendar for tab4 */
  ngOnInit(): void {
    this.storageService.getSetting("isDarkmode").then((value) => {
      if(value == 'true'){
        document.body.classList.add('dark');
        document.getElementById("calendar__edit").classList.add('calender--black');
      }else{
        document.body.classList.remove('dark');
        document.getElementById("calendar__edit").classList.remove('calender--black');
      }
    });

  }

  onChange($event) {
    console.log($event);
  }
  /* PopOver function */
  async viewPopover() {
    const popover = await this.popoverController.create({
      component: PopoverViewerComponent,
      cssClass: 'popover_setting',
      componentProps: {},
      translucent: true
    });

    popover.onDidDismiss().then((result) => {

    });

    return await popover.present();

  }
  /* End PopOver-function */
}
