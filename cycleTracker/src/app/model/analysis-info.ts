import {Record} from "./record";


export class AnalysisInfo {

  averageCycleLength: number;
  lastCycleStart: number;
  today: number;
  fertility: string;

  constructor(averageCycleLength: number, lastCycleStart: number, today: number, fertility: string) {
    this.averageCycleLength = averageCycleLength;
    this.lastCycleStart = lastCycleStart;
    this.today = today;
    this.fertility = fertility;
  }
}
