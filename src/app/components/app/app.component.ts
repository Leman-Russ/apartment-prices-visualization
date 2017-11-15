import { Component, ViewChild } from '@angular/core';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { PlotlyChartComponent } from '../plotly-chart/plotly-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plotlyData: any;
  plotlyLayout: any;
  plotlyOptions: any;
  @ViewChild(PlotlyChartComponent) plotlyChart;
  isChartLoaded: boolean = false;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.setLinearReggression();
  }

  setLinearReggression() {
    this.calculatorService.getDataAsArrays().subscribe(data => {
      if (data) {
        console.log(data);
        this.setPlotlyChart(data);
      }
    });   
  }

  setPlotlyChart(data: any) {
    let reggressionLine = this.calculateReggressionLine(data);
    this.plotlyData = [{
      x: data[0],
      y: data[1],
      name: 'Price',
      mode: 'markers',
      type: 'Scatter'    
    },
    {
      x: [Math.min(...data[0]), Math.max(...data[0])],
      y: reggressionLine,
      name: 'Reggression',
      mode: 'lines',
      type: 'Lines' 
    }];
    this.plotlyLayout = {
      margin: { t: 0 }    
    };
    this.plotlyChart.ngOnInit();
    this.isChartLoaded = true;
  }

  calculateReggressionLine(data: any) {
    let x = 0;
    let x2 = 0
    data[0].forEach(element => {
      x += element;
      x2 += element * element;
    });
    x = x / data[0].length;
    x2 = x2 / data[0].length;

    let y = 0;
    data[1].forEach(element => {
      y += element;
    });
    y = y / data[1].length;

    let xy = 0;
    for (var index = 0; index < data[0].length; index++) {
      xy += data[0][index] * data[1][index];
    }
    xy = xy / data[0].length;

    let a = (xy - (x * y)) / (x2 - (x * x));
    let b = y - (a * x);
    
    let firstLinePoint = a * Math.min(...data[0]) + b;
    let secondLinePoint = a * Math.max(...data[0]) + b;

    return [firstLinePoint, secondLinePoint];
  }

}
