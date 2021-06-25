import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import {AnalysisService} from '../service/analysis.service';
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
  cycleProgressCss: number;
  nextMenstruation: number;
  cycleLength: number;
  riskOfPregnancy: string;
  // eslint-disable-next-line max-len
  constructor(private popoverController: PopoverController ,private analysisService: AnalysisService) {
    this.analysisService.getAnalysisInfo().then(value => {
      const cycleData = this.getCycleState(value.lastCycleStart, value.averageCycleLength);
      this.cycleLength = value.averageCycleLength;
      this.cycleProgress = cycleData[1];
      this.nextMenstruation = cycleData[2];
      this.riskOfPregnancy = value.fertility;
      this.cycleProgressCss = 440 - (440 * this.cycleProgress) / 100;
    });
  }

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
    /** Sync event from popover component */

  }
  /**
   * Popover initial in Tab1 end
   */

  /**
   * Nehme Zyklusbeginn und Ende
   * Berechne Daten für die Visualisierung
   */
  getCycleState(cycleStart, cycleLength){
    cycleStart = cycleStart * 86400000;
    console.log(cycleStart);
    cycleStart = new Date(cycleStart);
    /**calculate cycleEnd*/
    const cycleEnd = new Date(cycleStart);
    cycleEnd.setDate(cycleEnd.getDate() + cycleLength);
    const currentDay = new Date();
    console.log(cycleStart);
    console.log(cycleEnd);
    console.log(currentDay);

    const cycleDuration = Math.abs((+cycleStart - +cycleEnd)/ (60*60*24*1000));
    const cycleState = Math.abs((+cycleStart - +currentDay) / (60*60*24*1000));

    const cycleProgress = Math.round((cycleState / cycleDuration)*100);
    const nextMenstruation = Math.round(cycleDuration - cycleState);

    return [cycleDuration,cycleProgress,nextMenstruation];
  }
  /**
   * Ziehe Zyklus Beginn und Ende aus Database
   * In welcher Phase des Zykluses?
   */
  ionViewDidEnter(){

  }
}
