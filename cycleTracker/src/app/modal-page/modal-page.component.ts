import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {StorageService} from "../service/storage.service";
import { Record} from "../model/record";

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {

  date: string;
  mens: string;
  mood: string;

  constructor(private modalController: ModalController, private storageService: StorageService) {}

  ngOnInit(): void {
    this.date = new Date(Date.now()).toISOString();
    this.selectRecord();
  }

  // called, when the popups opens or a new date is selected in the date picker
  selectRecord() {
    let millis = new Date(this.date).getTime();
    let unixDay = this.storageService.getUnixDay(millis);
    this.storageService.getRecord(unixDay).then((record: Record) => {
      console.log("Selected record: ", record);
      if(record) {
        this.mens = record.mens.toString();
        this.mood = record.mood.toString();
      } else {
        this.mens = "0";
        this.mood = "0";
      }
    });
  }

  // called, when the user ticks a box in the radio group
  updateRecord() {
    if(!this.mens) {
      this.mens = "0";
    }
    if(!this.mood) {
      this.mood = "0";
    }
    let millis = new Date(this.date).getTime();
    let unixDay = this.storageService.getUnixDay(millis);
    let record : Record = new Record(unixDay, parseInt(this.mens), parseInt(this.mood));
    console.log("Updated record: ", record);
    this.storageService.updateRecord(record);
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
