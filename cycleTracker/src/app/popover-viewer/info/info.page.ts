import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(private storageService: StorageService) { }

  /* Initialize function to choose mod for calendar for info page  */
  ngOnInit() {

    this.storageService.getSetting("isDarkmode").then((value) => {
      if(value == 'true'){
        document.body.classList.add('dark');
      }else{
        document.body.classList.remove('dark');
      }
    });

  }

}
