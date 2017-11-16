import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  constructor() { }

  avg(numbers: number[]): number {
    let sum = 0;
    numbers.forEach(number => {
      sum += number;
    });
    return sum / numbers.length;
  }

  getMin(data: number[]): number {
    return Math.min(...data);
  }

  getMax(data: number[]): number {
    return Math.max(...data);
  }

  getDataAsArrays(data: any): any {
    let numbersOfResidents = new Array<number>();
    let prices = new Array<number>();
    data.forEach(record => {
      prices.push(record.priceOfAnApartment); 
      numbersOfResidents.push(record.population);
    });
    return { numbersOfResidents, prices };
  }

  calculateReggressionLine(data: any) {
    let x = 0;
    let x2 = 0
    data.numbersOfResidents.forEach(element => {
      x += element;
      x2 += element * element;
    });
    x = x / data.numbersOfResidents.length;
    x2 = x2 / data.numbersOfResidents.length;

    let y = 0;
    data.prices.forEach(element => {
      y += element;
    });
    y = y / data.prices.length;

    let xy = 0;
    for (var index = 0; index < data.numbersOfResidents.length; index++) {
      xy += data.numbersOfResidents[index] * data.prices[index];
    }
    xy = xy / data.numbersOfResidents.length;

    let a = (xy - (x * y)) / (x2 - (x * x));
    let b = y - (a * x);

    let firstLinePoint = a * Math.min(...data.numbersOfResidents) + b;
    let secondLinePoint = a * Math.max(...data.numbersOfResidents) + b;

    return [firstLinePoint, secondLinePoint];
  }

}
