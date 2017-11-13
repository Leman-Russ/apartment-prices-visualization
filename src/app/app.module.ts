import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { PlotlyChartComponent } from './components/plotly-chart/plotly-chart.component';

import { DataService } from './services/data/data.service';

@NgModule({
  declarations: [
    AppComponent,
    PlotlyChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
