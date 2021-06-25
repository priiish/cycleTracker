import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, AlertController } from '@ionic/angular';
import { CalendarComponent } from 'ion2-calendar';

@Component({
  selector: 'app-add-cycle',
  templateUrl: './add-cycle.page.html',
  styleUrls: ['./add-cycle.page.scss'],
})
export class AddCyclePage implements OnInit {

  event = {title: "", location: "", message: "", startDate: "", endDate: ""};
  
  constructor(public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: CalendarComponent) { }

  ngOnInit() {
  }

}
