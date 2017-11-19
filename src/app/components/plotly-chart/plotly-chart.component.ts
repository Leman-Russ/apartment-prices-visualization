import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'plotly-chart',
  templateUrl: './plotly-chart.component.html',
  styleUrls: ['./plotly-chart.component.css']
})
export class PlotlyChartComponent implements OnChanges {
  @Input() data: any;
  @Input() layout: any;
  @Input() options: any;
  @Input() displayRawData: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (this.data !== undefined) {
      Plotly.newPlot('myPlotlyDiv', { data: this.data, layout: this.layout, options: this.options });
    }
  }

}
