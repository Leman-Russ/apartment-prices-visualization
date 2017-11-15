import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CalculatorService {

  constructor(private dataService: DataService) { }

  avg(numbers: number[]): number {
    let sum = 0;
    numbers.forEach(number => {
      sum += number;
    });
    return sum / numbers.length;
  }

  getDataAsArrays(): Subject<any> {
    let result = new BehaviorSubject<any>(null);
    this.dataService.getData().subscribe(data => {
      result.next(this.filterData(data));
    });
    return result;
  }

  filterData(data: any): any {
    let prices = new Array<number>();
    let numbersOfResidents = new Array<number>();
    data.forEach(record => {
      prices.push(record.priceOfAnApartment); 
      numbersOfResidents.push(record.population);
    });
    return [numbersOfResidents, prices];
  }
}
