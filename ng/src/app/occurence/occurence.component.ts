import {Component, OnInit, OnChanges} from '@angular/core';
import {OccurenceService} from './occurence.service';
import {Occurence} from './occurence';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-occurence-result',
  templateUrl: './occurence.component.html',
  styleUrls: []
})

export class OccurenceComponent implements OnInit, OnChanges {

  occurrences: Occurence[] = [];
  count: number;

  constructor(private route: ActivatedRoute, private occurenceService: OccurenceService) {
    this.occurenceService = occurenceService;
    route.paramMap.subscribe((params) => {
      this.getByUser(params.get('userid'));
    });
  }

  ngOnInit() {
    this.count = 0;
  }

  getByUser(userId: string) {
    this.occurenceService.getByUser(userId).subscribe((data: Occurence[]) => {
      this.occurrences = data;
      this.count += data.length;
      this.occurenceService.cache(data);
    });

  }

  ngOnChanges() {
    console.log('changed');
  }


}
