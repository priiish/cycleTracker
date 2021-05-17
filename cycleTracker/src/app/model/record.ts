import {Mood} from "./mood.enum";
import {Mens} from "./mens.enum";

export class Record {
  date: number;
  mood: Mood;
  mens: Mens;

  constructor(date: number, mood: Mood, mens: Mens) {
    this.date = date;
    this.mood = mood;
    this.mens = mens;
  }

  static createFromObject(object: any): Record {
    return new Record(object.date, object.mood, object.mens);
  }
}
