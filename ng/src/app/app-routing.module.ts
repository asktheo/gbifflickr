import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StatsMonthsComponent} from './stats-months/stats-months.component';
import {StatsYearsComponent} from './stats-years/stats-years.component';
import {OccurenceComponent} from './occurence/occurence.component';
import {StatsActivityComponent} from './stats-activity/stats-activity.component';
import {SpeciesListComponent} from './species-list/species-list.component';
import {UserComponent} from "./user/user.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'occurences/user/5e947e7e4938265112b0a6b6',
    pathMatch: 'full'
  },
  {
    path: 'occurences/user/:userid',
    component: UserComponent,
    children: [
      {
        path: '',
        component: OccurenceComponent
      },
      {
        path: 'stats-months',
        component: StatsMonthsComponent
      },
      {
        path: 'stats-years',
        component: StatsYearsComponent
      },
      {
        path: 'stats-activity',
        component: StatsActivityComponent
      },
      {
        path: 'species-list',
        component: SpeciesListComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
