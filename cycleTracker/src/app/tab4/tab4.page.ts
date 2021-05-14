import { Component } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss']
})
export class Tab4Page {
  date: string;
  type: 'string';

  options: CalendarComponentOptions = {
    monthPickerFormat: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'],
    weekdays: ['Mo','Di','Mi','Do','Fr','Sa','So'],
    monthFormat: 'MM/YYYY'
    };

  constructor() {}
  onChange($event) {
    console.log($event);
  }
}
