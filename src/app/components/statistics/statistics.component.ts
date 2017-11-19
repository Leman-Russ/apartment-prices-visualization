import { Component, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { SubComponent } from '../sub/sub.component';
import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent extends SubComponent {
  minimum: number;
  maximum: number;
  median: number;
  standardDeviation: string;
  expectedValue: string;
  pearsonCorrelationCoefficient: string;
  linearReggressionFormula: string;
  firstQuartile: number;
  thirdQuartile: number;
  interquartileRange: number;
  consideredAttributeName: string = "price";

  constructor(private calculatorService: CalculatorService) { 
    super();
  }

  onDataChange() {
    this.getAndSetStatistics(this.consideredAttributeName);
  }

  changeConsideredAttribute() {
    this.consideredAttributeName = this.consideredAttributeName == "price" ? "population" : "price";
    this.getAndSetStatistics(this.consideredAttributeName);
  }

  getAndSetStatistics(consideredAttributeName: string) {
    let data = this.calculatorService.getProcessedData(this.data);
    this.minimum = this.calculatorService.getMin(data, consideredAttributeName);
    this.maximum = this.calculatorService.getMax(data, consideredAttributeName);
    this.median = this.calculatorService.getMedian(data, consideredAttributeName).value;
    this.standardDeviation = this.calculatorService.getStandardDeviation(data, consideredAttributeName);
    this.expectedValue = this.calculatorService.getExpectedValue(data, consideredAttributeName);
    this.pearsonCorrelationCoefficient = this.calculatorService.getPearsonCorrelationCoefficient(data);
    let linearReggressionAttributes = this.calculatorService.getLinearReggressionAttributes(data);
    this.linearReggressionFormula = "f(x) = " + linearReggressionAttributes.a.toFixed(5) + "x + " + linearReggressionAttributes.b.toFixed(5);
    let quartileStats = this.calculatorService.getQuartileStats(data, consideredAttributeName);
    this.firstQuartile = quartileStats.q1;
    this.thirdQuartile = quartileStats.q3;
    this.interquartileRange = quartileStats.iqr;
  }

}
