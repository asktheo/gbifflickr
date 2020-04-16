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
    route.paramMap.subscribe((params) => {
      occurenceService.changeUser(params.get('userid'));
    });
  }

  ngOnInit() {
    this.count = 0;
    this.occurenceService.currentOccurences.subscribe(data => {
      this.occurrences = data;
      this.count = data.length;
    });
  }

  ngOnChanges() {
    console.log('changed');
  }


}
