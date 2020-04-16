import {Component, OnInit} from '@angular/core';
import {OccurenceService} from '../occurence/occurence.service';
import {Occurence} from '../occurence/occurence';

@Component({
  selector: 'app-stats-activity',
  templateUrl: './stats-activity.component.html',
  styleUrls: ['./stats-activity.component.scss']
})
export class StatsActivityComponent implements OnInit {

  userId : string;
  occurences : Occurence[] = [];

  constructor(private occurenceService: OccurenceService) {
    occurenceService.currentUser.subscribe(id => {
      this.userId = id;
    });
    occurenceService.currentOccurences.subscribe(data => {
      this.occurences = data;
      this.initWithData();
    });
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Before 2015', '2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'Sites visited'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Species found'},
    {data: [0, 0, 0, 0, 0, 0, 0], label: 'Days in field'}];

  ngOnInit() {
  }

  initWithData(){
      const before2015 = this.occurences.filter(o => o.year < 2015);
      this.groupBy(0, before2015);
      this.range(2015, 2021).forEach(y => {
        this.groupBy(y - 2015 + 1, this.occurences.filter(o => o.year === y));
      });
  }

  groupBy(index: number, occurences: Occurence[]): void {
    const siteGroup = {};
    const speciesGroup = {};
    const daysGroup = {};
    occurences.forEach(o => {
      if (!siteGroup[o.locationID]) {
        siteGroup[o.locationID] = [o];
      } else {
        siteGroup[o.locationID].push(o);
      }

      if (!speciesGroup[o.speciesKey]) {
        speciesGroup[o.speciesKey] = [o];
      } else {
        speciesGroup[o.speciesKey].push(o);
      }

      if (!daysGroup[o.month + '_' + o.day]) {
        daysGroup[o.month + '_' + o.day] = [o];
      } else {
        daysGroup[o.month + '_' + o.day].push(o);
      }

    });

    this.barChartData[0].data[index] = Object.keys(siteGroup).length;
    this.barChartData[1].data[index] = Object.keys(speciesGroup).length;
    this.barChartData[2].data[index] = Object.keys(daysGroup).length;

  }

  range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

}
