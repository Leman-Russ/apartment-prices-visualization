import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Data } from '../../models/data.model';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('assets/data.json').publishLast().refCount();
  }

  validateData(data: any): any {   
    if (Array.isArray(data)) { 
      return this.getArrayWithValidModel(data);
    } else {
      return [];
    }
  }

  getArrayWithValidModel(data: any): any {
    let dataModel = new Data(0, "Foo", 1, 1);
    for (let i = 0; i < data.length; i++) {
      for (let prop in dataModel) {
        if (!data[i].hasOwnProperty(prop)) {
          data.splice(i--, 1);
          break;
        }
        else if (typeof dataModel[prop] !== typeof data[i][prop]) {
          data.splice(i--, 1);
          break;
        }
        else if (typeof data[i][prop] === 'number' && (!Number.isInteger(data[i][prop]) || data[i][prop] <= 0)) {
          data.splice(i--, 1);
          break;
        }
      }
    }
    return data;
  }

}
