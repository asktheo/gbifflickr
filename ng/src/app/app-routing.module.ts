import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatsMonthsComponent} from './stats-months/stats-months.component';
import {StatsYearsComponent} from './stats-years/stats-years.component';
import {OccurenceComponent} from './occurence/occurence.component';
import {StatsActivityComponent} from './stats-activity/stats-activity.component';
import {SpeciesListComponent} from './species-list/species-list.component';


const routes: Routes = [
  {
    path: 'occurences/user/:userid',
    component: OccurenceComponent
  },
  {
    path: 'occurences/stats-months',
    component: StatsMonthsComponent
  },
  {
    path: 'occurences/stats-years',
    component: StatsYearsComponent
  },
  {
    path: 'occurences/stats-activity',
    component: StatsActivityComponent
  },
  {
    path: 'occurences/species-list',
    component: SpeciesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
