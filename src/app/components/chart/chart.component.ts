import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { PlotlyChartComponent } from '../plotly-chart/plotly-chart.component';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { SubComponent } from '../sub/sub.component';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent extends SubComponent {
  plotlyData: any;
  plotlyLayout: any;
  plotlyOptions: any;
  @ViewChild(PlotlyChartComponent) plotlyChart;
  
  constructor(private calculatorService: CalculatorService) {
    super();
  }

  onDataChange() {
    this.setLinearReggressionChart();
  }

  setLinearReggressionChart() {
    this.setPlotlyChart(this.calculatorService.getProcessedData(this.data)); 
  }

  setPlotlyChart(data: any) {
    let reggressionLine = this.calculatorService.getLinearReggressionLine(data),
        standardAndDistantPoints = this.calculatorService.getStandardAndDistantPoints(data, "price"),  
        standardPointsArrays = this.calculatorService.getProcessedDataAsArrays(standardAndDistantPoints.standardPoints),
        distantPointsArrays = this.calculatorService.getProcessedDataAsArrays(standardAndDistantPoints.distantPoints);
    this.plotlyData = [{
      x: standardPointsArrays.populations,
      y: standardPointsArrays.prices,
      name: 'Price',
      mode: 'markers',
      type: 'Scatter'    
    },
    {
      x: distantPointsArrays.populations,
      y: distantPointsArrays.prices,
      name: 'Price (DP)',
      mode: 'markers',
      type: 'Scatter'   
    },
    {
      x: [this.calculatorService.getMin(data, "population"), this.calculatorService.getMax(data, "population")],
      y: reggressionLine,
      name: 'Reg',
      mode: 'lines',
      type: 'Lines' 
    }];
    this.plotlyLayout = {
      margin: { t: 0 }    
    };
  }

}
