import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class CalculatorService {
  readonly ranks: string[] = ["Unranked", "Copper", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];

  constructor(private dataService: DataService) { }

  avg(numbers: number[]): number {
    let sum = 0;
    numbers.forEach(number => {
      sum += number;
    });
    return sum / numbers.length;
  }

  getOperatorPickPercentagePerSkillRank(operator: string): Subject<any> {
    let result = new BehaviorSubject<any>(null);
    this.dataService.getData().subscribe(data => {
      let operatorData = data.filter(d => d.operator == operator);    
      let pickPercentages = this.calculateOperatorPickPercentagePerSkillRank(data, operatorData);
      result.next([ pickPercentages, this.ranks ]);
    });
    return result;
  }

  calculateOperatorPickPercentagePerSkillRank(data: any, operatorData: any): Array<number> {
    let pickPercentages = new Array<number>();
    let numberOfAllPicksInRank = 0;
    let numberOfOperatorPicksInRank = 0;
    this.ranks.forEach(rank => {
      data.filter(d => d.skillrank == rank).forEach(record => {
        numberOfAllPicksInRank += Number(record.nbpicks);
      });
      operatorData.filter(o => o.skillrank == rank).forEach(record => {
        numberOfOperatorPicksInRank += Number(record.nbpicks);
      });
      pickPercentages.push((numberOfOperatorPicksInRank / numberOfAllPicksInRank) * 100);
      numberOfAllPicksInRank = numberOfOperatorPicksInRank = 0;
    });
    return pickPercentages;
  }
}
