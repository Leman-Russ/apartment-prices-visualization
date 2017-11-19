import { Injectable } from '@angular/core';

@Injectable()
export class CalculatorService {

  getAverage(data: any[], prop: string): number {
    let sum = 0;
    data.forEach(element => {
      sum += element[prop];
    });
    return sum / data.length;
  }

  getVariance(data: any[], prop: string): number {  
    let average = this.getAverage(data, prop),
        variance = 0;
    data.forEach(element => {
      variance += Math.pow((element[prop] - average), 2);
    });
    return variance / data.length;
  }

  getMin(data: any[], prop: string): number {
    let min = data[0][prop];
    for (let i = 1, len = data.length; i < len; i++) {
      if (data[i][prop] < min) {
        min = data[i][prop];
      }
    }
    return min;
  }

  getMax(data: any[], prop: string): number {
    let max = data[0][prop];
    for (let i = 1, len = data.length; i < len; i++) {
      if (data[i][prop] > max) {
        max = data[i][prop];
      }
    }
    return max;
  }

  getMedian(data: number[], prop: string): any {
    data.sort((a, b) => a[prop] - b[prop]);
    let halfLength = data.length / 2,
        index = 0;
    if (data.length % 2 == 0) {
      index = (halfLength + halfLength - 1) / 2; 
      return { index: index, value: (data[halfLength][prop] + data[halfLength - 1][prop]) / 2 };
    } else {
      index = Math.floor(halfLength);
      return { index: index, value: data[index][prop] };
    }
  }

  getQuartileStats(data: any[], prop: string): any {
    let median = this.getMedian(data, prop),
        firstHalf = new Array<any>(),
        secondHalf = new Array<any>();
    for (let i = 0, len = data.length; i < len; i++ ) {
      if (i <= median.index) {
        firstHalf.push(data[i]);
      }
      if (i >= median.index) {
        secondHalf.push(data[i]);
      }
    }
    let q1 = this.getMedian(firstHalf, prop).value,
        q3 = this.getMedian(secondHalf, prop).value;
    return { q1: q1, q3: q3, iqr: q3 - q1 }
  }

  getStandardAndDistantPoints(data: any[], prop: string): any {
    let quartileStats = this.getQuartileStats(data, prop),
        standardPoints = new Array<any>(),
        distantPoints = new Array<any>();
    for (let i = 0, len = data.length; i < len; i++ ) {
      if (data[i][prop] < quartileStats.q1 - (1.5 * quartileStats.iqr) || data[i][prop] > quartileStats.q3 + (1.5 * quartileStats.iqr)) {
        distantPoints.push(data[i]);
      } else {
        standardPoints.push(data[i]);
      }
    }
    return { standardPoints, distantPoints }; 
  }

  getStandardDeviation(data: any[], prop: string): string {
    return Math.sqrt(this.getVariance(data, prop)).toFixed(4);
  }

  getExpectedValue(data: number[], prop: string): string {
    let result = this.getOccurrencesInArray(data, prop),
        expectedValue = 0;
    for (let i = 0, len = result.numbers.length; i < len; i++) {
      expectedValue += result.numbers[i] * result.occurrences[i];
    }
    return (expectedValue / data.length).toFixed(4);
  }

  getOccurrencesInArray(data: any[], prop: string): any {
    let a = [], b = [], prev;
    data.sort((a, b) => a[prop] - b[prop]);
    for (let i = 0, len = data.length; i < len; i++ ) {
      if (data[i][prop] !== prev) {
        a.push(data[i][prop]);
        b.push(1);
      } else {
        b[b.length - 1]++;
      }
      prev = data[i][prop];
    }
    return { numbers: a, occurrences: b };
  }

  getPearsonCorrelationCoefficient(data: any): string {
    let avgX = this.getAverage(data, "population"),
        avgY = this.getAverage(data, "price");

    let diffX = new Array<number>(), diffY = new Array<number>(), diffXDiffY = 0;
    for (let i = 0, len = data.length; i < len; i++ ) {
      diffX.push(data[i]["population"] - avgX);
      diffY.push(data[i]["price"] - avgY);
      diffXDiffY += diffX[i] * diffY[i];
    }
    
    let diffX2 = 0, diffY2 = 0;
    for (let i = 0, len = diffX.length; i < len; i++ ) {
      diffX2 += diffX[i] * diffX[i];
      diffY2 += diffY[i] * diffY[i];
    }

    return (diffXDiffY / Math.sqrt(diffX2 * diffY2)).toFixed(4);
  }

  getLinearReggressionAttributes(data: any): any {
    let x = 0, x2 = 0, y = 0, xy = 0;
    for (let i = 0; i < data.length; i++) {
      x += data[i]["population"];
      x2 += data[i]["population"] * data[i]["population"];
      y += data[i]["price"];
      xy += data[i]["population"] * data[i]["price"];
    }
    x = x / data.length;
    x2 = x2 / data.length;
    y = y / data.length;
    xy = xy / data.length;

    let a = (xy - (x * y)) / (x2 - (x * x)),
        b = y - (a * x); 
    return { a, b }
  }

  getLinearReggressionLine(data: any): any {
    let linearReggressionAttributes = this.getLinearReggressionAttributes(data);
    let firstLinePoint = linearReggressionAttributes.a * this.getMin(data, "population") + linearReggressionAttributes.b;
    let secondLinePoint = linearReggressionAttributes.a * this.getMax(data, "population") + linearReggressionAttributes.b;
    return [firstLinePoint, secondLinePoint];
  }

  getProcessedData(rawData: any): any {
    let processedData = new Array<any>();
    rawData.forEach(record => {
      processedData.push({ population: record.population, price: record.priceOfAnApartment })
    });
    return processedData;
  }

  getProcessedDataAsArrays(data: any): any {
    let populations = new Array<number>(), prices = new Array<number>();
    data.forEach(element => {
      populations.push(element["population"]);
      prices.push(element["price"]);
    });
    return { populations, prices };
  }

}
