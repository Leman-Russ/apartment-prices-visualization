import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  getAverage(data: number[]): number {
    let sum = 0;
    data.forEach(number => {
      sum += number;
    });
    return sum / data.length;
  }

  getVariance(data: number[]): number {  
    let average = this.getAverage(data);
    let variance = 0;
    data.forEach(number => {
      variance += Math.pow((number - average), 2);
    });
    return variance / data.length;
  }

  getMin(data: number[]): number {
    let min = data[0];
    for (let i = 1, len = data.length; i < len; i++) {
      if (data[i] < min) {
        min = data[i];
      }
    }
    return min;
  }

  getMax(data: number[]): number {
    let max = data[0];
    for (let i = 1, len = data.length; i < len; i++) {
      if (data[i] > max) {
        max = data[i];
      }
    }
    return max;
  }

  getMedian(data: number[]): number {
    data.sort((a, b) => a - b);
    if (data.length % 2 == 0) {
      return (data[data.length / 2] + data[(data.length / 2) + 1]) / 2;
    } else {
      return data[Math.ceil(data.length / 2)];
    }
  }

  getStandardDeviation(data: number[]): string {
    return Math.sqrt(this.getVariance(data)).toFixed(4);
  }

  getExpectedValue(data: number[]): string {
    let result = this.getOccurrencesInArray(data);
    let expectedValue = 0;
    for (let i = 0, len = result.numbers.length; i < len; i++) {
      expectedValue += result.numbers[i] * result.occurrences[i];
    }
    return (expectedValue / data.length).toFixed(4);
  }

  getOccurrencesInArray(data: number[]): any {
    var a = [], b = [], prev;
    data.sort();
    for (var i = 0, len = data.length; i < len; i++ ) {
      if (data[i] !== prev) {
        a.push(data[i]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = data[i];
    }
    return { numbers: a, occurrences: b };
  }

  getPearsonCorrelationCoefficient(data: any): string {
    console.log(data);
    let avgX = this.getAverage(data.numbersOfResidents);
    let avgY = this.getAverage(data.prices);

    let diffX = new Array<number>();
    data.numbersOfResidents.forEach(x => {
      diffX .push(x - avgX); 
    });

    let diffY = new Array<number>();
    data.prices.forEach(y => {
      diffY.push(y - avgY); 
    });

    let diffXDiffY = 0;
    for (var i = 0, len = diffX.length; i < len; i++ ) {
      diffXDiffY += diffX[i] * diffY[i];
    }

    let diffX2 = 0;
    diffX.forEach(x => {
      diffX2 += x * x;
    });

    let diffY2 = 0;
    diffY.forEach(y => {
      diffY2 += y * y;
    });

    return (diffXDiffY / Math.sqrt(diffX2 * diffY2)).toFixed(4);
  }

  getLinearReggressionAttributes(data: any) {
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

    return { a, b }
  }

  getLinearReggressionLine(data: any): any {
    let linearReggressionAttributes = this.getLinearReggressionAttributes(data);
    let firstLinePoint = linearReggressionAttributes.a * this.getMin(data.numbersOfResidents) + linearReggressionAttributes.b;
    let secondLinePoint = linearReggressionAttributes.a * this.getMax(data.numbersOfResidents) + linearReggressionAttributes.b;
    return [firstLinePoint, secondLinePoint];
  }

  getDataAsArrays(rawData: any): any {
    let numbersOfResidents = new Array<number>();
    let prices = new Array<number>();
    rawData.forEach(record => {
      prices.push(record.priceOfAnApartment); 
      numbersOfResidents.push(record.population);
    });
    return { numbersOfResidents, prices };
  }

}
