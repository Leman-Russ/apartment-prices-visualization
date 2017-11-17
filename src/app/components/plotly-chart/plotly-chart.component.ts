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
    if (changes["data"]) {
      this.data = changes["data"].currentValue;
    } else if (changes["layout"]) {
      this.layout = changes["layout"].currentValue;
    } else if (changes["options"]) {
      this.options = changes["options"].currentValue;
    } else if (changes["displayRawData"]) {
      this.displayRawData = changes["displayRawData"].currentValue;
    }
    Plotly.newPlot('myPlotlyDiv', { data: this.data, layout: this.layout, options: this.options });
  }

}
