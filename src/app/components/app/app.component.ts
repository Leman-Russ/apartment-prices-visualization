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
    this.setLinearReggressionForValkyrie();
  }

  setLinearReggressionForValkyrie() {
    this.setLinearReggressionForOperator("NAVYSEAL-VALKYRIE");
  }

  setLinearReggressionForOperator(operator: string) {
    this.calculatorService.getOperatorPickPercentagePerSkillRank(operator).subscribe(data => {
      if (data) {
        this.setPlotlyChart(data, operator);
      }
    });   
  }

  setPlotlyChart(data: any, operator: string) {
    let reggressionLine = this.calculateReggressionLine(data);
    this.plotlyData = [{
      x: data[1],
      y: data[0],
      name: 'Pick percentage',
      mode: 'markers',
      type: 'Scatter'    
    },
    {
      x: [data[1][0], data[1][data[1].length - 1]],
      y: reggressionLine,
      name: 'Reggression',
      mode: 'lines',
      type: 'Lines' 
    }];
    this.plotlyLayout = {
      //title: 'Linear Reggression for ' + operator,
      margin: { t: 0 }    
    };
    this.plotlyChart.ngOnInit();
    this.isChartLoaded = true;
  }

  calculateReggressionLine(data: any) {
    let y = 0;
    data[0].forEach(element => {
      y += element;
    });
    y = y / data[0].length;

    let x = 0;
    let x2 = 0
    data[1].forEach(element => {
      x += data[1].indexOf(element);
      x2 += data[1].indexOf(element) * data[1].indexOf(element);
    });
    x = x / data[1].length;
    x2 = x2 / data[1].length;

    let xy = 0;
    for (var index = 0; index < data[0].length; index++) {
      xy += data[0][index] * index;
    }
    xy = xy / data[0].length;

    let a = (xy - (x * y)) / (x2 - (x * x));
    let b = y - (a * x);
    
    let firstLinePoint = a * 0 + b;
    let secondLinePoint = a * (data[1].length - 1) + b;

    return [firstLinePoint, secondLinePoint];
  }

}
