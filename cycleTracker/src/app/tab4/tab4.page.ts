import { Component } from '@angular/core';
import { CalendarComponentOptions, CalendarModalOptions, DayConfig } from 'ion2-calendar';
import {ModalController, PopoverController} from "@ionic/angular";
import {PopoverViewerComponent} from "../popover-viewer/popover-viewer.component";
import {StorageService} from "../service/storage.service";
import {Record} from '../model/record';
import {ModalPageComponent} from "../modal-page/modal-page.component";
import {AnalysisService} from "../service/analysis.service";


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Page {

  dateMulti: Date[];
  type: 'string';

  options: CalendarComponentOptions = {
    from: new Date(1),
    color: "danger",
    pickMode: 'multi',
    monthPickerFormat: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    weekdays: ['So','Mo','Di','Mi','Do','Fr','Sa'],
    monthFormat: 'MM/YYYY'
  };

  constructor(private popoverController: PopoverController, private storageService: StorageService,
              private modalController: ModalController) {}

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
      let dates = [];
      for(let i = 0; i < records.length; i++) {
        let record : Record = records[i];
        if(record.mens > 0) {
          dates.push(this.getDateInString(record.date));
        }
      }
      this.dateMulti = dates;
      console.log("DateMulti: ", this.dateMulti);
    });
  }

  getDateInString(millis) : Date {
    let date : Date = this.storageService.getDateForUnixDay(millis);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  async viewPopover() {
    const popover = await this.popoverController.create({
      component: PopoverViewerComponent,
      cssClass: 'popover_setting',
      componentProps: {},
      translucent: true
    });
    popover.onDidDismiss().then((result) => {});
    return await popover.present();
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'date': '0'
      }
    });
    await modal.present();
  }
}
