import {Component, OnInit} from '@angular/core';
import {OccurenceService} from '../occurence/occurence.service';
import {SpeciesStat} from './species-stat';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit {

  constructor(private occurenceService: OccurenceService) {
    this.occurenceService = occurenceService;
  }

  private species: any;
  public speciesName: any;
  public speciesList: SpeciesStat[] = [];
  public selectedSpecies: SpeciesStat;

  // month distribution chart

  public monthChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public monthChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public monthChartType = 'bar';
  public monthChartLegend = true;
  public monthChartData = [{data: [], label: 'Total of individuals'}];

  filterSpecies() {
    this.selectedSpecies = this.speciesList.find(s => s.danishName === this.speciesName);
    this.makeBarChart();
  }

  selectSpecies(spec: SpeciesStat) {
    this.selectedSpecies = spec;
    this.speciesName = spec.danishName;
    this.makeBarChart();
  }

  makeBarChart() {
    // reset data
    this.monthChartData[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    this.selectedSpecies.records.forEach(o => {
      this.monthChartData[0].data[o.month - 1] = this.monthChartData[0].data[o.month - 1] + o.individualCount;
    });
  }

  reset() {
    this.selectedSpecies = null;
    this.speciesName = null;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.speciesList
          .filter(v => v.danishName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .map(s => s.danishName)
          .slice(0, 10))
    )

  ngOnInit() {
    if (this.occurenceService.initialized) {

      this.species = _.groupBy(this.occurenceService.fromCache(), o => o.speciesKey);

      for (const spec in this.species) {
        const occurencesForSpecies = this.species[spec]; // get the object
        this.speciesList.push({
          // take the vernacular name from the first (all should have the same, since it is the same species
          danishName: occurencesForSpecies[0].vernacularName,
          numberOfSites: _.chain(occurencesForSpecies).groupBy('locationID').toPairs().value().length, // group by site
          totalOfIndividuals: _.sumBy(occurencesForSpecies, 'individualCount'), // sum through all records
          records: occurencesForSpecies
        });
      }
    }
  }
}
