import { Component, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data/data.service';
import { SubComponent } from '../sub/sub.component';
import 'rxjs/add/observable/of';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';
import { CalculatorService } from '../../services/calculator/calculator.service';
import { MatSnackBar } from '@angular/material';
import { SimpleDataSource } from '../../models/simple-data-source.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends SubComponent {
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataReset: EventEmitter<boolean> = new EventEmitter<boolean>();
  formName: string;
  formPopulation: number;
  formPrice: number;
  displayedColumns: string[] = ['id', 'name', 'price', 'population'];
  dataSource: SimpleDataSource;

  constructor(private calculatorService: CalculatorService, private snackBar: MatSnackBar) {
    super();
  }

  onDataChange() {
    this.dataSource = new SimpleDataSource(this.data)
  }

  addNewRecord() {
    if (Number.isInteger(this.formPrice) && this.formPrice > 0 && Number.isInteger(this.formPopulation) && this.formPopulation > 0) {
      this.data.push({ id: this.calculatorService.getMax(this.data, "id") + 1, townName: this.formName,
        priceOfAnApartment: this.formPrice, population: this.formPopulation })
      this.dataChange.emit(this.data);
    } else {
      this.openSnackBar("Input values are not correct");
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  resetData() {
    this.dataReset.emit(true);
  }

}


