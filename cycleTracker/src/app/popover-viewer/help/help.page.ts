import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(private storageService: StorageService) { }
  /* Initialize function to choose mod for calendar for help page  */
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
