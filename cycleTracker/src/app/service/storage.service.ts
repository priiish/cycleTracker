import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {Record} from '../model/record';
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
   * Returns the currently active cycle with a record (mood & mens) for each day.
   */
  getRecords(): Promise<Record[]> {
    return this.storage.get('db');
  }

  getRecord(unixDay) : Promise<Record> {
    return this.storage.get('db').then((records: Record[]) => {
      return records.find(r => r.date == unixDay);
    });
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
   * Updates a settings entry (key-value-pair)
   */
  updateSetting(key: string, value: string): void {
    this.storage.set(key, value).then(value => console.log('Updated storage: ', key, " = ", value));
  }

  /**
   * Returns a settings entry (key-value-pair)
   */
  getSetting(key: string): Promise<string> {
    return this.storage.get(key);
  }


  /**
   * Returns the date as Unix day (e.g. 01.01.1970 = 0, 17.05.2021 = 18764).
   */
  getUnixDay(dateInMillis: number): number {
    // TODO currently in UTC timezone
    const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    return Math.floor(dateInMillis / MILLIS_PER_DAY);
  }

  getDateForUnixDay(unixDay: number): Date {
    const MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
    return new Date(unixDay * MILLIS_PER_DAY);
  }

  private getCyclesFromStorage(): Promise<Cycle[]> {
    return this.storage.get('db').then(records => {
      records.sort((a, b) => (a.date > b.date) ? 1 : -1);

      let result: Record[] = [];
      let cycles: Cycle[] = [];
      let lastRecord: Record = null;
      let mensStopped : boolean = false;

      const firstDate = records[0].date;
      const lastDate = this.getUnixDay(Date.now());
      for(let i = firstDate; i <= lastDate; i++) {
        const record = records.find(r => r.date == i);

        if (record && result.length > 0 && record.mens > 0 && mensStopped) {
          cycles.push(new Cycle(result));
          result = [];
          mensStopped = false;
        }

        if(record) {
          if(record.mens === 0) {
            mensStopped = true;
          }
          result.push(Record.createFromObject(record));
        } else {
          mensStopped = true;
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

      let records: Record[] = [];
      records.push(new Record(18700, 1, 3));
      records.push(new Record(18701, 1, 3));
      records.push(new Record(18702, 1, 1));
      records.push(new Record(18730, 2, 0));
      records.push(new Record(18731, 2, 0));
      records.push(new Record(18732, 1, 2));
      records.push(new Record(18733, 1, 2));
      records.push(new Record(18734, 1, 2));
      records.push(new Record(18735, 1, 1));
      records.push(new Record(18761, 2, 0));
      records.push(new Record(18762, 2, 0));
      records.push(new Record(18763, 1, 3));
      records.push(new Record(18764, 1, 2));
      records.push(new Record(18765, 1, 2));
      records.push(new Record(18766, 1, 1));
      records.push(new Record(18804, 1, 2));
      records.push(new Record(18805, 1, 3));
      records.push(new Record(18806, 1, 3));

      this.storage.set('db', records).then((val) => {
        console.log('Create storage: ', val);
      });
    });
  }
}
