import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../../services/data/data.service';
import { SubComponent } from '../sub/sub.component';
import 'rxjs/add/observable/of';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends SubComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'population'];
  dataSource: MyDataSource;

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes["data"].currentValue) {
      this.dataSource = new MyDataSource(this.data)
    }
  }
}

export class MyDataSource extends DataSource<any> {

  constructor(private data: any) { 
    super(); 
  }

  connect(): Observable<any> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
