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
  cycleProgress: number;
  nextMenstruation: number;
  cycleLength: number;
  riskOfPregnancy: number;
  constructor(private popoverController: PopoverController ,private storageService: StorageService) {
    const cycleData = this.getCycleState('hallo', 'test', 'test');
    this.cycleLength = cycleData[0];
    this.cycleProgress = cycleData[1];
    this.nextMenstruation = cycleData[2];
    this.riskOfPregnancy = cycleData[3];
  }

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
   * Nehme Zyklusbeginn und Ende
   * Berechne Daten für die Visualisierung
   */
  getCycleState(start, end, date){
    const cycleStart = new Date('2021.06.01');
    const cycleEnd = new Date('2021.06.28');
    const currentDay = new Date('2021.06.10');

    const cycleDuration = Math.abs((+cycleStart - +cycleEnd)/ (60*60*24*1000));
    const cycleState = Math.abs((+cycleStart - +currentDay) / (60*60*24*1000));

    const cycleProgress = Math.round((cycleState / cycleDuration)*100);
    const nextMenstruation = cycleDuration - cycleState;

    const riskOfPregnancy = 50;

    return [cycleDuration,cycleProgress,nextMenstruation,riskOfPregnancy];
  }
  /**
   * Ziehe Zyklus Beginn und Ende aus Database
   * In welcher Phase des Zykluses?
   */
  ionViewDidEnter(){

  }
}
