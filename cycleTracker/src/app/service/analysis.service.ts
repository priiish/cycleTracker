import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {AnalysisInfo} from "../model/analysis-info";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private storageService: StorageService) { }

  getAnalysisInfo(): Promise<AnalysisInfo> {
    const today = this.storageService.getUnixDay(Date.now());

    return Promise.all([this.getAverageCycleAndPeriodLength(), this.storageService.getCurrentCycle()]).then((values) => {
      let averageCycleLength : number = values[0][0];
      let averagePeriodLength : number = values[0][1];
      let lastCycleStart : number = values[1].records[0].date;
      let analysisInfo = new AnalysisInfo(averageCycleLength, averagePeriodLength, lastCycleStart, today, "HIGH")
      return analysisInfo;
    });
  }

  getAverageCycleAndPeriodLength(): Promise<number[]> {
    // TODO define average cycle length when starting the app
    return this.storageService.getCycles().then(cycles => {
      const numOfCycles = cycles.length - 1;
      let acc = 0;
      let mensAcc = 0;
      for(let i = 0; i < numOfCycles; i++) {
        acc += cycles[i].records.length;
        cycles[i].records.forEach(e => {
          if(e.mens > 0) mensAcc++;
        })
      }




      return [acc / numOfCycles, mensAcc / numOfCycles];
    });
  }
}
