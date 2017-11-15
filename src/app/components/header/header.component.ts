import { Component } from '@angular/core';
import { CalculatorService } from '../../services/calculator/calculator.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private calculatorService: CalculatorService) { }

  getDataFromDataService() {

  }
}
