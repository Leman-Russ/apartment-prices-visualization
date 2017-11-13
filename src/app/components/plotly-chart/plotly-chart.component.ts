import { Component, Input } from '@angular/core';

@Component({
  selector: 'plotly-chart',
  templateUrl: './plotly-chart.component.html',
  styleUrls: ['./plotly-chart.component.css']
})
export class PlotlyChartComponent {
  @Input() data: any;
  @Input() layout: any;
  @Input() options: any;
  @Input() displayRawData: boolean;

  ngOnInit() {
    Plotly.newPlot('myPlotlyDiv', this.data, this.layout, this.options);
  }
}
