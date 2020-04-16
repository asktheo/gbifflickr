import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OccurenceComponent } from './occurence/occurence.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StatsMonthsComponent } from './stats-months/stats-months.component';
import { StatsYearsComponent } from './stats-years/stats-years.component';
import { StatsActivityComponent } from './stats-activity/stats-activity.component';
import { SpeciesListComponent } from './species-list/species-list.component';
import { SpeciesMediaComponent } from './species-media/species-media.component';
import { UserComponent } from './user/user.component';
import {SpeciesMediaService} from "./species-media/species-media.service";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    OccurenceComponent,
    StatsMonthsComponent,
    StatsYearsComponent,
    StatsActivityComponent,
    SpeciesListComponent,
    SpeciesMediaComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    NgbModule,
    FormsModule
  ],
  providers: [HttpClientModule, SpeciesMediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
