import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Record} from '../model/record';
import * as $ from 'jquery';
import {Cycle} from '../model/cycle';
import {Mood} from '../model/mood.enum';
import {Mens} from '../model/mens.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.initStorageFromJSON();
  }

  /**
   * Returns an array that contains all tracked cycles with a record (mood & mens) for each day.
   */
  getCycles(): Promise<Cycle[]> {
    return this.getCyclesFromStorage();
  }

  /**
   * Returns the currently active cycle with a record (mood & mens) for each day.
   */
  getCurrentCycle(): Promise<Cycle> {
    return this.getCyclesFromStorage().then(cycles => cycles[cycles.length - 1]);
  }

  /**
   * Updates a record in the database (adds, updates or deletes).
   */
  updateRecord(newRecord: Record): void {
    this.storage.get('db').then((records: Record[]) => {
      const oldRecord = records.find(r => r.date == newRecord.date);
      if(oldRecord) {
        records = records.filter(r => r !== oldRecord);
      }
      if(newRecord.mood !== Mood.none || newRecord.mens !== Mens.none) {
        records.push(newRecord);
      }
      this.storage.set('db', records).then(value => console.log('Updated storage: ', value));
    });
  }

  /**
   * Returns the current Unix day (e.g. 01.01.1970 = 0, 17.05.2021 = 18764).
   */
  getUnixDay(): number {
    // TODO currently in UTC timezone
    const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor(Date.now() / MILLIS_PER_DAY);
  }

  private getCyclesFromStorage(): Promise<Cycle[]> {
    return this.storage.get('db').then(records => {
      records.sort((a, b) => (a.date > b.date) ? 1 : -1);

      let result: Record[] = [];
      const cycles: Cycle[] = [];
      let lastRecord: Record = null;

      const firstDate = records[0].date;
      const lastDate = this.getUnixDay();
      for(let i = firstDate; i <= lastDate; i++) {
        const record = records.find(r => r.date == i);

        if (!lastRecord && record && result.length > 0) {
          cycles.push(new Cycle(result));
          result = [];
        }

        if(record) {
          result.push(Record.createFromObject(record));
        } else {
          result.push(new Record(i, Mood.none, Mens.none));
        }
        lastRecord = record;
      }
      cycles.push(new Cycle(result));
      return cycles;
    });
  }

  private initStorageFromJSON(): void {
    this.storage.create().then((val) => {
      console.log('Create storage: ', val);
    });
    $.getJSON('../../assets/data.json', (json) => {
      this.storage.set('db', json).then((val) => {
        console.log('Init storage: ', val);
      });
    });
    console.log(this.getUnixDay());
  }

  // try to create function returning fake Record[] data
 /* returnFakeData(): Record[] {
    let data: Record[];
    let begin: number = 1;
    let okay = Mood;
    let m = Mens;
    data.fill(begin, okay, m);
    return data;
  }*/

}
