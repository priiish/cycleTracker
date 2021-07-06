import {
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chart, ChartItem, registerables} from 'chart.js';
import {Cycle} from "../model/cycle";
import {StorageService} from "../service/storage.service";
import {ChartConfig} from "../model/chart-config";
import {ModalPageComponent} from "../modal-page/modal-page.component";
import {ModalController} from "@ionic/angular";
import {BubbleChartItem} from "../model/bubble-chart-item";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements AfterViewChecked {

  @Input()
  cycles: Cycle[];
  chartConfigs: ChartConfig[] = [];
  title: string = "Aktueller Zyklus";
  bars: any;

  dataLoaded: boolean = false;


  constructor(private storageService: StorageService, private modalController: ModalController) {
    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.storageService.getCycles().then((cycles) => {
      this.cycles = cycles.reverse();
      console.log("Found " + this.cycles.length + " cycles:" , this.cycles);

      for(let i = 0; i < this.cycles.length; i++) {
        let config = this.generateChartConfig(this.cycles[i]);
        this.chartConfigs.push(config);
      }
      this.dataLoaded = true;
    })
  }

 ngAfterViewChecked() {
   if(this.dataLoaded) {
     this.dataLoaded = false;

      for(let i = 0; i < this.cycles.length; i++) {
        this.createBubbleChart('barChart' + i, this.chartConfigs[i]);
      }
   }
  }

  generateChartConfig(cycle: Cycle) : ChartConfig {

    let config : ChartConfig = new ChartConfig();
    config.mensData = [];
    config.moodData = [];
    config.mensColors = [];
    config.moodColors = [];
    config.bars = [];
    config.labels = [];

    config.xMax = Math.max(21, cycle.records.length);
    let bubbleWidth = 120 / config.xMax;
    config.yMax = 2;


    for (let i = 0; i < cycle.records.length; i++) {
      let mensColor = '#FFFFFF';
      let moodColor = '#FFFFFF';
      let bar = 1;

      switch (cycle.records[i].mens) {
        case 1:
          mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mens1');
          config.mensData.push(new BubbleChartItem(i, 0, bubbleWidth));
          break;
        case 2:
          mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mens2');
          config.mensData.push(new BubbleChartItem(i, 0, bubbleWidth));
          break;
        case 3:
          mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mens3');
          config.mensData.push(new BubbleChartItem(i, 0, bubbleWidth));
          break;
        default:
          mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mens4');
          config.mensData.push(new BubbleChartItem(i, 0, 1));
      }

      switch (cycle.records[i].mood) {
        case 1:
          moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mood1');
          config.moodData.push(new BubbleChartItem(i, 1.2, bubbleWidth));
          break;
        case 2:
          moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mood2');
          config.moodData.push(new BubbleChartItem(i, 1.2, bubbleWidth));
          break;
        case 3:
          moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mood3');
          config.moodData.push(new BubbleChartItem(i, 1.2, bubbleWidth));
          break;
        default:
          moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-mood4');
          config.moodData.push(new BubbleChartItem(i, 1.2, 1));
      }

      config.mensColors.push(mensColor);
      config.moodColors.push(moodColor);
      config.bars.push(bar);
      config.labels.push('')
    }

    let startDate: Date = this.storageService.getDateForUnixDay(cycle.records[0].date);
    let endDate: Date = this.storageService.getDateForUnixDay(cycle.records[cycle.records.length - 1].date);
    config.title = "Zeitraum: " + startDate.getDate() + '.' + this.getMonth(startDate.getMonth()) + ' - ' + endDate.getDate() + '.' + this.getMonth(endDate.getMonth());
    config.subtitle = "Zyklusdauer: " + cycle.records.length + " Tage";

    return config;
  }

  createBubbleChart(id: string, config: ChartConfig) {

    let chart = document.getElementById(id) as ChartItem;

    this.bars = new Chart(chart, {
      type: 'bubble',
      data: {
        datasets: [{
          label: 'First Dataset',
          data: config.mensData,
          backgroundColor: config.mensColors
        },
        {
          label: 'First Dataset',
          data: config.moodData,
          backgroundColor: config.moodColors
        }]
      },
      options: {
        aspectRatio: 10,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          xAxes: {
            display: false,
            max: config.xMax,
            grid: {
              lineWidth : 0
            }
          },
          yAxes: {
            display: false,
            max: config.yMax,
            grid: {
              lineWidth : 0
            },
          }
        }
      }
    });
  }

  createBarChart(id: string, config: ChartConfig) {

    let barChart = document.getElementById(id) as ChartItem;

    this.bars = new Chart(barChart, {
      type: 'bar',
      data: {
        labels: config.labels,
        datasets: [{
          label: 'a',
          data: config.bars,
          backgroundColor: config.mensColors, // array should have same number of elements as number of dataset
          borderColor: config.mensColors,// array should have same number of elements as number of dataset
          borderWidth: 1
        },
          {
            label: 'b',
            data: config.bars,
            backgroundColor: config.moodColors, // array should have same number of elements as number of dataset
            borderColor: config.moodColors,// array should have same number of elements as number of dataset
            borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          xAxes: {
            stacked: true,
            grid: {
              lineWidth : 0
            }
          },
          yAxes: {
            stacked: true,
            grid: {
              lineWidth : 0
            },
            ticks: {
              display: false
            }
          }
        }
      },
    });

  }

  getMonth(num: number): string {
    switch(num) {
      case 0:
        return "Januar";
      case 1:
        return "Februar";
      case 2:
        return "März";
      case 3:
        return "April";
      case 4:
        return "Mai";
      case 5:
        return "Juni";
      case 6:
        return "Juli";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "Oktober";
      case 10:
        return "November";
      case 11:
        return "Dezember";
    }
  }

  async createModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'date': '0'
      }
    });
    await modal.present();
  }
}
