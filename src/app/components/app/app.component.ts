import { Component, ViewChild } from '@angular/core';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { PlotlyChartComponent } from '../plotly-chart/plotly-chart.component';
import { DataService } from '../../services/data/data.service';
import { Data } from '../../models/data.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  data: Data[];
  copyOfData: Data[];
  isPageActive: boolean = false;

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadDataFromService();
  }

  fileChange(data: any) {
    this.validateAndAssignData(data);
  }

  dataChange(data: any) {
    this.data = Object.create(data);
  }

  dataReset(event: any) {
    this.data = Object.create(this.copyOfData);
  }

  loadDataFromService() {
    this.dataService.getData().subscribe(data => {
      this.validateAndAssignData(data);
    },
    err => {
      console.log("Cannot load .json file (probably the application is not served)");
    });
  }

  validateAndAssignData(data: any) {
    data = this.dataService.validateData(data);
    if (data.length > 0) {
      this.copyOfData = data;
      this.data = Object.create(data);
      this.isPageActive = true;
    } else {
      this.openSnackBar("Invalid selected file");
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
  
}
