import { Component } from '@angular/core';
import { CalendarComponentOptions, CalendarModalOptions, DayConfig } from 'ion2-calendar';
import {PopoverController} from "@ionic/angular";
import {PopoverViewerComponent} from "../popover-viewer/popover-viewer.component";
import {StorageService} from "../service/storage.service";
import {Record} from '../model/record';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Page {

  constructor(private popoverController: PopoverController, private storageService: StorageService) {
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

    // get all records
    this.storageService.getRecords().then(records => {
      console.log("Found " + records.length + "records");
      for(let i = 0; i < records.length; i++) {
        let record : Record = records[i];
        console.log("Date: " + record.date);
        console.log("Moon: " + record.mood);
        console.log("Mens: " + record.mens);
        console.log(Date.now());
      }
    });
  }

  

  dateRange: {from: Date; to: Date} = {
    from:  new Date(Date.now() + 24 * 60 * 60 * 1000 *2),
    to: new Date(Date.now() + 24 * 60 * 60 * 1000 * 5)
  };
  type: 'string';

  options: CalendarComponentOptions = {
    color: "danger",
    pickMode: 'range',
    monthPickerFormat: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    weekdays: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    monthFormat: 'MM/YYYY'
  };

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
