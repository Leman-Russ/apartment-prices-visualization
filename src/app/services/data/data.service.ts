import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/Rx';

@Injectable()
export class DataService {
  private data: Observable<any>;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    if (!this.data) {
      this.data = this.http.get('assets/data.json').publishLast().refCount();
    } 
    return this.data;
  }

}
