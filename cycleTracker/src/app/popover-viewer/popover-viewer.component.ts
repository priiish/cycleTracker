import { Component, OnInit } from '@angular/core';
import { PopoverController, } from '@ionic/angular';
import {StorageService} from "../service/storage.service";

@Component({
  selector: 'app-popover-viewer',
  templateUrl: './popover-viewer.component.html',
  styleUrls: ['./popover-viewer.component.scss'],
})
export class PopoverViewerComponent implements OnInit {
  /**
   * Popover Items funktions
   */

  constructor(private popoverController: PopoverController,private storageService: StorageService) { }
  logout() {
    // code for logout
    this.popoverController.dismiss();
  }
/* init function to first visualisation */
  ngOnInit(): void {
    this.storageService.getSetting("isDarkmode").then((value) => {
      if(value == 'true'){
        document.getElementById("dark__toggle").classList.add('toggle-checked');
      }else{
        document.getElementById("dark__toggle").classList.remove('toggle-checked');
      }
    });

  }
  /**
   * Popover Items funktions end
   */
  /* Toggle-Button-Event */
  /**
   * No exception, problem with compiling ts and js
    * @param event
   */

  /* Toggle Button functionality */
  onClick(event){

    this.storageService.getSetting("isDarkmode").then((value) => {
      if(value == 'true'){
        this.storageService.updateSetting("isDarkmode", "false");
        document.body.classList.remove('dark');
        document.getElementById("dark__toggle").classList.remove('toggle-checked');
        if(document.body.contains(document.getElementById('calendar__edit'))){
          document.getElementById("calendar__edit").classList.remove('calender--black');
        }
      }else{
        this.storageService.updateSetting("isDarkmode", "true");
        document.body.classList.add('dark');
        document.getElementById("dark__toggle").classList.add('toggle-checked');
        if(document.body.contains(document.getElementById('calendar__edit'))){
          document.getElementById("calendar__edit").classList.add('calender--black');
        }
      }
    });

  }



}
