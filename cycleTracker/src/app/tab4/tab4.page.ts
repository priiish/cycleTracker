import { Component, OnInit } from '@angular/core';
import { CalendarComponentOptions } from 'ion2-calendar';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  date: string;
  type: 'string';

  constructor() { }

  onChange($event) {
    console.log($event);
  }

  ngOnInit() {
  }

}
