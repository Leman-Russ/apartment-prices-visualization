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

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes["data"].currentValue) {
      this.setLinearReggression();
    }
  }

  setLinearReggression() {
    this.setPlotlyChart(this.calculatorService.getDataAsArrays(this.data)); 
  }

  setPlotlyChart(data: any) {
    let reggressionLine = this.calculatorService.getLinearReggressionLine(data);
    this.plotlyData = [{
      x: data.numbersOfResidents,
      y: data.prices,
      name: 'Price',
      mode: 'markers',
      type: 'Scatter'    
    },
    {
      x: [Math.min(...data.numbersOfResidents), Math.max(...data.numbersOfResidents)],
      y: reggressionLine,
      name: 'Reggression',
      mode: 'lines',
      type: 'Lines' 
    }];
    this.plotlyLayout = {
      margin: { t: 0 }    
    };
  }

}
