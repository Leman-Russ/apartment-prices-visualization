import { Component, ViewChild } from '@angular/core';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { PlotlyChartComponent } from '../plotly-chart/plotly-chart.component';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => this.data = data);
  }
}
