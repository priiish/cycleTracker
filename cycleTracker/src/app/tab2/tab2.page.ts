import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import {StorageService} from '../service/storage.service';
import {Record} from '../model/record';
import {Mood} from '../model/mood.enum';
import {Mens} from '../model/mens.enum';
import {AnalysisService} from '../service/analysis.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  /**
   * Popover initial in Tab2
   */
  constructor(private popoverController: PopoverController, private storageService: StorageService, private analysisService: AnalysisService) { }

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
   * Popover initial in Tab2 end
   */



  logCurrentCycle() {
    this.storageService.getCurrentCycle().then(value => console.log(value));
  }

  logAllCycles() {
    this.storageService.getCycles().then(value => console.log(value));
  }

  updateStorage() {
    this.storageService.updateRecord(new Record(18759, Mood.none, Mens.m));
  }

  logAnalysisInfo() {
    this.analysisService.getAnalysisInfo().then(value => console.log(value))
  }
}
