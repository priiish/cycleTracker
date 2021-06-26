import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import { Platform } from '@ionic/angular';
import {StorageService} from '../service/storage.service';
import {chartData} from '../model/chartData';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  title = 'Dein Befinden während deines aktuellen Zyklus';
  subtitle = 'Wie geht es dir heute?';
  width: number;
  height: number;
  margin = { top: 60, right: 20, bottom: 130, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  today: number = new Date().getDate();
  month: number = new Date().getMonth() + 1;
  private n: boolean;
  disablePin: boolean = false;
  selectedMonth: number;
  barDataForTest: chartData[] = [];
  barData: chartData[] = [];
  barDataSaved: chartData[] = [];
  filteredBarData: chartData[] = [];


  /**
   * Popover initial in Tab3
   */
  constructor(private popoverController: PopoverController, private _platform: Platform,
              private storageService: StorageService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    if (this.barData.length != 0) {
      this.getData();
      this.init();
      this.initAxes();
      this.drawAxes();
      this.drawChart();
    }
  }

  getData(): chartData[] {
    return this.barData;
  }

 getCurrentDataDrawChart(): void {
    this.init();
   this.getData();
   this.initAxes();
   this.drawAxes();
   this.drawChart();
 }

 initializeFilter() {

   let chart = document.getElementById('lineChart');

   if (this.selectedMonth != 0) {
     for (let i = 0; i < this.barData.length; i++) {
       // @ts-ignore -> muss this.barData[i].month muss als String geparsed werden weil sonst Vergleich nicht funktioniert
       if (this.barData[i].month.toLocaleString() === this.selectedMonth) {
         this.filteredBarData.push({
           date: this.barData[i].date,
           month: this.barData[i].month,
           feeling: this.barData[i].feeling,
           dateMonth: this.barData[i].date + "." + this.barData[i].month
         });
       }
     }
     console.log("Array gefiltert" + JSON.stringify(this.filteredBarData));

     if (this.filteredBarData.length == 0) {
       alert("Für diesen Monat gibt es leider keine Aufzeichnungen.");
     } else {
       this.barDataSaved = this.barData; // current barData saved in this.barDataSaved so it will not be overridden
       this.barData = this.filteredBarData;

       if (chart && chart.firstChild) {
         console.log("Case 1");
         chart.firstChild.removeChild(chart.firstChild.firstChild);
         chart.removeChild(chart.firstChild);
         chart.remove();

         let node = document.createElement("div");
         node.setAttribute("id", "lineChart");
         document.getElementById('ion-card').firstElementChild.append(node);
       } else if (chart) {
         console.log("Case 2");
         chart.remove();

         let node = document.createElement("div");
         node.setAttribute("id", "lineChart");
         document.getElementById('ion-card').firstElementChild.append(node);
       } else if (!chart) {
         let node = document.createElement("div");
         node.setAttribute("id", "lineChart");
         document.getElementById('ion-card').firstElementChild.append(node);
       }
       this.getCurrentDataDrawChart();
     }
   } else if (this.selectedMonth == 0) {
     this.barData = this.barDataSaved;
     if (chart && chart.firstChild) {
       console.log("Case 1");
       chart.firstChild.removeChild(chart.firstChild.firstChild);
       chart.removeChild(chart.firstChild);
       chart.remove();

       let node = document.createElement("div");
       node.setAttribute("id", "lineChart");
       document.getElementById('ion-card').firstElementChild.append(node);
     } else if (chart) {
       console.log("Case 2");
       chart.remove();

       let node = document.createElement("div");
       node.setAttribute("id", "lineChart");
       document.getElementById('ion-card').firstElementChild.append(node);
     } else if (!chart) {
       let node = document.createElement("div");
       node.setAttribute("id", "lineChart");
       document.getElementById('ion-card').firstElementChild.append(node);
     }
     this.getCurrentDataDrawChart();
   }
 }

  init() {
    this.svg = d3.select('#lineChart') //former bar chart
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxes() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.barData.map((d) => d.dateMonth));
    this.y.domain([0, d3Array.max(this.barData, (d) => d.feeling)]);
  }

  drawAxes() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-35)")
      .attr('font-size', '30');
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y).tickValues([]))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr('font-size', '30')
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-30)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(255,192,203)')
      .attr('font-size', '50')
      .text('feeling');
  }

  drawChart() {
    this.g.selectAll('.line') //former .bar
      .data(this.barData)
      .enter()
      .append('rect')
      .attr('class', 'line') //former bar
      .attr('x', (d) => this.x(d.dateMonth))
      .attr('y', (d) => this.y(d.feeling))
      .attr('fill', function (d) {
        if (d.feeling == 1) {
          return "#eb445a";
        } else if (d.feeling == 2) {
          return "#ffc409";
        }
        return "#2dd36f";
      })
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.feeling));
  }

  /**
   * Function adds date + value = 3 to barData array and chart. If current date is already included in the array,
   * the date will not be added to the chart.
   */
  feelGood(): void {
    this.disablePin = true;
    let chart = document.getElementById('lineChart');
    if (chart && chart.firstChild && this.barData.length !== 0) {
      console.log("Case 1");
      chart.firstChild.removeChild(chart.firstChild.firstChild);
      chart.removeChild(chart.firstChild);
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (chart && this.barData.length !== 0) {
      console.log("Case 2");
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (!chart) {
      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    }


    console.log(JSON.stringify(this.barData));

    if (this.barData.length === 0) {
      console.log("Array leer" + JSON.stringify(this.barData));
      this.barData.push({
        date: this.today,
        month: this.month,
        feeling: 3,
        dateMonth: this.today + "." + this.month
      });
      console.log("Array initial befüllt" + JSON.stringify(this.barData));
     this.getCurrentDataDrawChart();
    } else {
      for (let i = 0; i < this.barData.length; i++) {
        if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling == 3) {
          this.n = true;
          console.log("Datum bereits enthalten" + JSON.stringify(this.barData));
          alert("Sie haben heute bereits so abgestimmt.");
        } else if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling != 3) {
          this.barData[i].feeling = 3;
        } else {
          console.log("Datum nicht enthalten" + JSON.stringify(this.barData));
          this.barData.push({
            date: this.today,
            month: this.month,
            feeling: 3,
            dateMonth: this.today + "." + this.month
          });
        }
      }
      this.getCurrentDataDrawChart();
    }
    setTimeout(() => {
      this.disablePin = false;
    }, 3000);
 }

  feelOkay(): void {
    this.disablePin = true;
    let chart = document.getElementById('lineChart');

    if (chart && chart.firstChild && this.barData.length !== 0) {
      console.log("Case 1");
      chart.firstChild.removeChild(chart.firstChild.firstChild);
      chart.removeChild(chart.firstChild);
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (chart && this.barData.length !== 0) {
      console.log("Case 2");
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (!chart) {
      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    }

    console.log(JSON.stringify(this.barData));

    if (this.barData.length === 0) {
      console.log("Array leer" + JSON.stringify(this.barData));
      this.barData.push({
        date: this.today,
        month: this.month,
        feeling: 2,
        dateMonth: this.today + "." + this.month
      });
      console.log("Array initial befüllt" + JSON.stringify(this.barData));
      this.getCurrentDataDrawChart();
    } else {
      for (let i = 0; i < this.barData.length; i++) {
        if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling == 2) {
          this.n = true;
          console.log("Datum bereits enthalten" + JSON.stringify(this.barData));
          alert('Sie haben heute bereits so abgestimmt.');
        } else if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling != 2) {
          this.barData[i].feeling = 2;
        } else {
          console.log("Datum nicht enthalten" + JSON.stringify(this.barData));
          this.barData.push({
            date: this.today,
            month: this.month,
            feeling: 2,
            dateMonth: this.today + "." + this.month
          });
        }
      }
      this.getCurrentDataDrawChart();
    }
    setTimeout(() => {
      this.disablePin = false;
    }, 3000);
  }

  feelSad(): void {
    this.disablePin = true;
    let chart = document.getElementById('lineChart');

    if (chart && chart.firstChild && this.barData.length !== 0) {
      console.log("Case 1");
      chart.firstChild.removeChild(chart.firstChild.firstChild);
      chart.removeChild(chart.firstChild);
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (chart && this.barData.length !== 0) {
      console.log("Case 2");
      chart.remove();

      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    } else if (!chart) {
      let node = document.createElement("div");
      node.setAttribute("id", "lineChart");
      document.getElementById('ion-card').firstElementChild.append(node);
    }

    console.log(JSON.stringify(this.barData));

    if (this.barData.length === 0) {
      console.log("Array leer" + JSON.stringify(this.barData));
      this.barData.push({
        date: this.today,
        month: this.month,
        feeling: 1,
        dateMonth: this.today + "." + this.month
      });
      console.log("Array initial befüllt" + JSON.stringify(this.barData));
      this.getCurrentDataDrawChart();
    } else {
      for (let i = 0; i < this.barData.length; i++) {
        if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling == 1) {
          this.n = true;
          console.log("Datum bereits enthalten" + JSON.stringify(this.barData));
          alert('Sie haben heute bereits so abgestimmt.');
        } else if (this.barData[i].date == this.today && this.barData[i].month == this.month && this.barData[i].feeling != 1) {
          this.barData[i].feeling = 1;
        } else {
          console.log("Datum nicht enthalten" + JSON.stringify(this.barData));
          this.barData.push({
            date: this.today,
            month: this.month,
            feeling: 1,
            dateMonth: this.today + "." + this.month
          });
        }
      }
      this.getCurrentDataDrawChart();
    }
    setTimeout(() => {
      this.disablePin = false;
    }, 3000);
  }

 createTestData() {
   this.disablePin = true;

   let chart = document.getElementById('lineChart');

   if (chart && chart.firstChild && this.barData.length !== 0) {
     console.log("Case 1");
     chart.firstChild.removeChild(chart.firstChild.firstChild);
     chart.removeChild(chart.firstChild);
     chart.remove();

     let node = document.createElement("div");
     node.setAttribute("id", "lineChart");
     document.getElementById('ion-card').firstElementChild.append(node);
   } else if (chart && this.barData.length !== 0) {
     console.log("Case 2");
     chart.remove();

     let node = document.createElement("div");
     node.setAttribute("id", "lineChart");
     document.getElementById('ion-card').firstElementChild.append(node);
   } else if (!chart) {
     let node = document.createElement("div");
     node.setAttribute("id", "lineChart");
     document.getElementById('ion-card').firstElementChild.append(node);
   }

     let randomFeeling: number;
     let testDay: number = 1;
     let testMonth: number = this.month;
     let testDayMonth: string;

     for (let i = 7; i > 0; i--) {
       randomFeeling = Math.floor(Math.random() * 3) + 1;
       testDay = testDay + 1;
       testDayMonth = testDay + "." + testMonth;
       this.barDataForTest.push({
         date: testDay,
         month: testMonth,
         feeling: randomFeeling,
         dateMonth: testDayMonth
       });
     }
   this.barData = this.barDataForTest;
   console.log("Test Daten vor 0 setzen: " + JSON.stringify(this.barData));
   console.log("Daten vor 0 setzen: " + JSON.stringify(this.barData));
  this.getCurrentDataDrawChart();

   setTimeout(() => {
     document.getElementById('lineChart').remove();
     this.disablePin = false;
     this.barData.length = 0;
     this.barDataForTest.length = 0;
     console.log("Test Daten nach 0 setzen: " + JSON.stringify(this.barData));
     console.log("Daten nach 0 setzen: " + JSON.stringify(this.barData));
   }, 10000);

 }

  async viewPopover() {
    const popover = await this.popoverController.create({
      component: PopoverViewerComponent,
      cssClass: 'popover_setting',
      componentProps: {},
      translucent: true
    });

    popover.onDidDismiss().then((result) => {
      console.log(result.data);
    });

    return await popover.present();
    /** Sync event from popover component */

  }

}
