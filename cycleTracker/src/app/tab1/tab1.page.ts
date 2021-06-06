import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import {StorageService} from '../service/storage.service';
import {Record} from '../model/record';
import {Mood} from '../model/mood.enum';
import {Mens} from '../model/mens.enum';
import {Cycle} from '../model/cycle';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Popover initial in Tab1
   */
  constructor(private popoverController: PopoverController ,private storageService: StorageService) { }

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

  /**
   * Wie viele Tage zur nähsten Menstruation?
   * In welcher Phase des Zykluses?
   */
  logCurrentCycle() {
    this.storageService.getCurrentCycle().then(value => console.log(value.records));
    this.storageService.getCurrentCycle().then(value => this.displayInformation(value.records));
  }

  displayInformation(record) {
    console.log('test');
    console.log(record);
    console.log(record[record.length-1]);
    console.log(typeof record);
  }

  ionViewDidEnter(){
    this.logCurrentCycle();
  }

}
