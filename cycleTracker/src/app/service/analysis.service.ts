import { Injectable } from '@angular/core';
import {StorageService} from './storage.service';
import {AnalysisInfo} from "../model/analysis-info";

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private storageService: StorageService) { }

  getAnalysisInfo(): Promise<AnalysisInfo> {
    const today = this.storageService.getUnixDay();

    return Promise.all([this.getAverageCycleLength(), this.storageService.getCurrentCycle()]).then((values) => {
      let averageCycleLength : number = values[0];
      let lastCycleStart : number = values[1].records[0].date;
      let analysisInfo = new AnalysisInfo(averageCycleLength, lastCycleStart, today, "HIGH")
      return analysisInfo;
    });
  }

  getAverageCycleLength(): Promise<number> {
    // TODO define average cycle length when starting the app
    return this.storageService.getCycles().then(cycles => {
      const numOfCycles = cycles.length - 1;
      let acc = 0;
      for(let i = 0; i < numOfCycles; i++) {
        acc += cycles[i].records.length;
      }
      return acc / numOfCycles;
    });
  }
}
