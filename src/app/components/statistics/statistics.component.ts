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

  constructor(private calculatorService: CalculatorService) { 
    super();
 }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes["data"].currentValue) {
      this.getStatistics();
    }
  }

  getStatistics() {
    var data = this.calculatorService.getDataAsArrays(this.data);
    this.minimumPrice = this.calculatorService.getMin(data.prices);
    this.maximumPrice = this.calculatorService.getMax(data.prices);
  }

}
