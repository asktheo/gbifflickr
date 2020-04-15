import {Component, OnInit} from '@angular/core';
import {OccurenceService} from '../occurence/occurence.service';

@Component({
  selector: 'app-stats-years',
  templateUrl: './stats-years.component.html',
  styleUrls: ['./stats-years.component.scss']
})
export class StatsYearsComponent implements OnInit {

  constructor(private occurenceService: OccurenceService) {
    this.occurenceService = occurenceService;
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['Before 2015', '2015', '2016', '2017', '2018', '2019', '2020'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{data: [0, 0, 0, 0, 0, 0, 0], label: 'Occurences'}];

  ngOnInit() {
    const arr = [0, 0, 0, 0, 0, 0, 0];
    if (this.occurenceService.initialized) {
      this.occurenceService.fromCache().forEach(o => {
        if (o.year < 2015) {
          arr[0] = arr[0] + 1;
        } else {
          arr[o.year - 2015 + 1] = arr[o.year - 2015 + 1] + 1;
        }

      });
      this.barChartData[0].data = arr;
    }
  }
}
