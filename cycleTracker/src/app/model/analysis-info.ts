import {Record} from "./record";


export class AnalysisInfo {

  averageCycleLength: number;
  averagePeriodLength: number;
  lastCycleStart: number;
  today: number;
  fertility: string;

  constructor(averageCycleLength: number, averagePeriodLength, lastCycleStart: number, today: number, fertility: string) {
    this.averageCycleLength = averageCycleLength;
    this.averagePeriodLength = averagePeriodLength;
    this.lastCycleStart = lastCycleStart;
    this.today = today;
    this.fertility = fertility;
  }
}
