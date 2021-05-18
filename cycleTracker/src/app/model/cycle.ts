import {Record} from "./record";

export class Cycle {
  records: Record[];

  constructor(records: Record[]) {
    this.records = records;
  }
}
