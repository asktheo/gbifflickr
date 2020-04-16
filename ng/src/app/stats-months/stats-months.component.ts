import {Component, OnInit} from '@angular/core';
import {OccurenceService} from '../occurence/occurence.service';
import {Occurence} from '../occurence/occurence';

@Component({
  selector: 'app-stats-months',
  templateUrl: './stats-months.component.html',
  styleUrls: ['./stats-months.component.scss']
})
export class StatsMonthsComponent implements OnInit {

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
  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [{data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Before 2019'}, {
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    label: '2019'
  }];

  ngOnInit() {

  }

  initWithData(){
    const arr0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const arr1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.occurences.forEach(o => {
      if (o.year === 2019) {
        arr1[o.month - 1] = arr1[o.month - 1] + 1;
      } else {
        arr0[o.month - 1] = arr0[o.month - 1] + 1;
      }
    });
    this.barChartData[0].data = arr0;
    this.barChartData[1].data = arr1;
  }

}
