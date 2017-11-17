import { Component, OnInit, SimpleChanges } from '@angular/core';
import { SubComponent } from '../sub/sub.component';
import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent extends SubComponent {
  minimumPrice: number;
  maximumPrice: number;
  medianPrice: number;
  standardDeviationForPrice: string;
  expectedValueForPrice: string;
  pearsonCorrelationCoefficient: string;
  linearReggressionFormula: string;

  constructor(private calculatorService: CalculatorService) { 
    super();
 }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes["data"].currentValue) {
      this.getAndSetStatistics();
    }
  }

  getAndSetStatistics() {
    let data = this.calculatorService.getDataAsArrays(this.data);
    this.minimumPrice = this.calculatorService.getMin(data.prices);
    this.maximumPrice = this.calculatorService.getMax(data.prices);
    this.medianPrice = this.calculatorService.getMedian(data.prices);
    this.standardDeviationForPrice = this.calculatorService.getStandardDeviation(data.prices);
    this.expectedValueForPrice = this.calculatorService.getExpectedValue(data.prices);
    this.pearsonCorrelationCoefficient = this.calculatorService.getPearsonCorrelationCoefficient(data);
    let linearReggressionAttributes = this.calculatorService.getLinearReggressionAttributes(data);
    this.linearReggressionFormula = "f(x) = " + linearReggressionAttributes.a.toFixed(5) + "x + " + linearReggressionAttributes.b.toFixed(5);
  }

}
