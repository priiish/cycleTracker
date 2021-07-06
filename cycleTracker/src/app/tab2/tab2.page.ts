import {AfterViewChecked, Component} from '@angular/core';
import {Chart, ChartItem, registerables} from 'chart.js';
import {Cycle} from "../model/cycle";
import {StorageService} from "../service/storage.service";
import {ChartConfig} from "../model/chart-config";
import {ModalPageComponent} from "../modal-page/modal-page.component";
import {ModalController, PopoverController} from "@ionic/angular";
import {BubbleChartItem} from "../model/bubble-chart-item";
import {AnalysisService} from "../service/analysis.service";
import {PopoverViewerComponent} from "../popover-viewer/popover-viewer.component";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements AfterViewChecked {

  averageCycleLength: number;
  averagePeriodLength: number;

  cycles: Cycle[];
  chartConfigs: ChartConfig[] = [];
  title: string = "Aktueller Zyklus";
  charts: Chart[] = [];
  dataLoaded: boolean = false;


  constructor(private storageService: StorageService, private analysisService: AnalysisService,
              private modalController: ModalController, private popoverController: PopoverController) {
    Chart.register(...registerables);
  }

  ionViewWillEnter() {
    this.storageService.getCycles().then((cycles) => {
      this.refreshCharts();
      this.cycles = cycles.reverse();
      console.log("Found " + this.cycles.length + " cycles:", this.cycles);

      for (let i = 0; i < this.cycles.length; i++) {
        let isCurrentCycle = i === 0;
        let config = this.generateChartConfig(this.cycles[i], isCurrentCycle);
        this.chartConfigs.push(config);
      }

      this.dataLoaded = true;
    })

    this.analysisService.getAnalysisInfo().then(e => {
      this.averageCycleLength = Math.round(e.averageCycleLength);
      this.averagePeriodLength = Math.round(e.averagePeriodLength);
    })
  }

  ngAfterViewChecked() {
    if (this.dataLoaded) {
      this.dataLoaded = false;

      for (let i = 0; i < this.cycles.length; i++) {
        this.createBubbleChart('barChart' + i, this.chartConfigs[i]);
      }
    }
  }

  refreshCharts() {
    this.chartConfigs = [];
    this.charts.forEach(e => e.clear());
  }

  generateChartConfig(cycle: Cycle, isCurrentCycle: boolean): ChartConfig {

    let config: ChartConfig = new ChartConfig();
    config.mensData = [];
    config.moodData = [];
    config.mensColors = [];
    config.moodColors = [];

    config.xMax = Math.max(21, cycle.records.length);
    let bubbleWidth = 120 / config.xMax;
    config.yMax = 2.0;


    for (let i = 0; i < cycle.records.length; i++) {
      let mensColor = '#FFFFFF';
      let moodColor = '#FFFFFF';

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
          mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-graphgrey');
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
          moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-graphgrey');
          config.moodData.push(new BubbleChartItem(i, 1.2, 1));
      }

      config.mensColors.push(mensColor);
      config.moodColors.push(moodColor);
    }

    if (isCurrentCycle) {

      for (let i = cycle.records.length; i < 21; i++) {
        let mensColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-graphgrey');
        config.mensData.push(new BubbleChartItem(i, 0, 1));
        config.mensColors.push(mensColor);
        let moodColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-graphgrey');
        config.moodData.push(new BubbleChartItem(i, 1.2, 1));
        config.moodColors.push(moodColor);

        let startDate: Date = this.storageService.getDateForUnixDay(cycle.records[0].date);
        config.title = "Aktueller Zyklus - " + startDate.getDate() + '. ' + this.getMonth(startDate.getMonth()) + ' ' + startDate.getFullYear();
        config.subtitle = "";
      }
    } else {
      let startDate: Date = this.storageService.getDateForUnixDay(cycle.records[0].date);
      let endDate: Date = this.storageService.getDateForUnixDay(cycle.records[cycle.records.length - 1].date);
      config.title = startDate.getDate() + '. ' + this.getMonth(startDate.getMonth()) + ' ' + startDate.getFullYear() + ' - ' + endDate.getDate() + '. ' + this.getMonth(endDate.getMonth()) + ' ' + startDate.getFullYear();
      config.subtitle = cycle.records.length + " Tage";
    }


    return config;
  }

  createBubbleChart(id: string, config: ChartConfig) {

    let chart = document.getElementById(id) as ChartItem;

    this.charts.push(new Chart(chart, {
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
        aspectRatio: 8,
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
              lineWidth: 0
            }
          },
          yAxes: {
            display: false,
            max: config.yMax,
            grid: {
              lineWidth: 0
            },
          }
        }
      }
    }));
  }

  getMonth(num: number): string {
    switch (num) {
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
    let modal = await this.modalController.create({
      component: ModalPageComponent,
      componentProps: {
        'date': '0'
      }
    });

    modal.onDidDismiss().then(() => this.ionViewWillEnter());

    await modal.present();
  }

  async viewPopover() {
    const popover = await this.popoverController.create({
      component: PopoverViewerComponent,
      cssClass: 'popover_setting',
      componentProps: {},
      translucent: true
    });
    popover.onDidDismiss().then((result) => {
    });
    return await popover.present();
  }
}
