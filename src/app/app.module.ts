import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatTooltipModule, MatProgressSpinnerModule, MatIconModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './components/app/app.component';
import { HeaderComponent } from './components/header/header.component';
import { PlotlyChartComponent } from './components/plotly-chart/plotly-chart.component';
import { TableComponent } from './components/table/table.component'
import { ChartComponent } from './components/chart/chart.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SubComponent } from './components/sub/sub.component'

import { DataService } from './services/data/data.service';
import { CalculatorService } from './services/calculator/calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    PlotlyChartComponent,
    HeaderComponent,
    TableComponent,
    ChartComponent,
    StatisticsComponent,
    SubComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTableModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    CalculatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
