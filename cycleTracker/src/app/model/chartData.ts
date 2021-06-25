export class chartData {
  date: number;
  month: number;
  feeling: number;
  dateMonth: string;


  constructor(date: number, month: number, feeling: number, dateMonth: string) {
    this.date = date;
    this.month = month;
    this.feeling = feeling;
    this.dateMonth = dateMonth;
  }
}
