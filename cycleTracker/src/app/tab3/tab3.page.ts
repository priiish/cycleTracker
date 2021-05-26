import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverViewerComponent} from '../popover-viewer/popover-viewer.component';
import { Platform } from '@ionic/angular';
import {StorageService} from '../service/storage.service';

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
  //subtitle = 'Viewers per day for';
  width: number;
  height: number;
  margin = { top: 60, right: 20, bottom: 130, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;

  /**
   * Popover initial in Tab3
   */
  constructor(private popoverController: PopoverController, private _platform: Platform,
              private storageService: StorageService) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  barData = [
    { day: 'Montag', viewers: 4, smiley: ':-)' },
    { day: 'Dienstag', viewers: 3, smiley: ':-)' },
    { day: 'Mittwoch', viewers: 3, smiley: ':-)' },
    { day: 'Donnerstag', viewers: 2, smiley: ':-)' },
    { day: 'Freitag', viewers: 2, smiley: ':-)' },
    { day: 'Samstag', viewers: 3, smiley: ':-)' },
    { day: 'Sonntag', viewers: 4, smiley: ':-)' }
  ];

  ngOnInit() {
    this.init();
    this.initAxes();
    this.drawAxes();
    this.drawChart();
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
    this.x.domain(this.barData.map((d) => d.day));
    this.y.domain([0, d3Array.max(this.barData, (d) => d.viewers)]);
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
      .call(d3Axis.axisLeft(this.y).ticks(4))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr('font-size', '30')
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(34,139,34)')
      .attr('font-size', '50')
      .text('viewers');
  }

  drawChart() {
    this.g.selectAll('.line') //former .bar
      .data(this.barData)
      .enter()
      .append('rect')
      .attr('class', 'line') //former bar
      .attr('fill', 'rgb(34,139,34)')
      .attr('x', (d) => this.x(d.day))
      .attr('y', (d) => this.y(d.viewers))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.viewers));
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
