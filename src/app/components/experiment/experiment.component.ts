import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SubComponent } from '../sub/sub.component';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { SimpleDataSource } from '../../models/simple-data-source.model';

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent extends SubComponent {
  linearReggressionAttributes: any;
  displayedColumns: string[] = [ 'population', 'calculatedPrice'];
  dataSource: SimpleDataSource;

  constructor(private calculatorService: CalculatorService) {
    super();
  }

  onDataChange() {
    this.linearReggressionAttributes = this.calculatorService.getLinearReggressionAttributes(
      this.calculatorService.getProcessedData(this.data));
    if (!this.dataSource) {
      this.dataSource = new SimpleDataSource(this.generateExperimentalData());
    }
  }

  generateNewExperimentalData() { 
    this.dataSource = new SimpleDataSource(this.generateExperimentalData());
  }

  generateExperimentalData(): any {
    let experimentalData = new Array<any>(),
        experimentalPopulation, 
        calculatedPrice;
    for (let i = 0; i < 10; i++) {
        experimentalPopulation = (Math.random() * (500000 - 10000) + 10000).toFixed(0);
        calculatedPrice = this.linearReggressionAttributes.a * experimentalPopulation + this.linearReggressionAttributes.b;
        experimentalData.push({ population: experimentalPopulation, calculatedPrice: calculatedPrice.toFixed(0) })
    }
    experimentalData.sort((a, b) => a["population"] - b["population"]);
    return experimentalData;
  }

}