import {Component} from '@angular/core';
import {ModalController, PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import {StorageService} from '../service/storage.service';
import {Record} from '../model/record';
import {Mood} from '../model/mood.enum';
import {Mens} from '../model/mens.enum';
import {AnalysisService} from '../service/analysis.service';
import {ModalPageComponent} from "../modal-page/modal-page.component";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private popoverController: PopoverController, private storageService: StorageService,
              private analysisService: AnalysisService, private modalController: ModalController) { }
  /**
   * Popover initial in Tab2
   */
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
  /* Init function to dark-mode to tab2 */
  ngOnInit(): void {
    this.storageService.getSetting("isDarkmode").then((value) => {
      if(value == 'true'){
        document.body.classList.add('dark');
      }else{
        document.body.classList.remove('dark');
      }
    });

  }


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

  currentModal;

  async createModal() {

    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });

    await modal.present();
    this.currentModal = modal;
  }

  dismissModal() {
    if (this.currentModal) {
      this.currentModal.dismiss().then(() => { this.currentModal = null; });
    }
  }
}
