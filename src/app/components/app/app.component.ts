import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plotlyData: any;
  plotlyLayout: any;
  plotlyOptions: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.plotlyData = [{
      x: [1, 2, 3, 4, 5],
      y: [1, 2, 4, 8, 16],
      type: "scatter"
    }];
    this.plotlyLayout = {
      margin: { t: 0 }
    };
  }

}
