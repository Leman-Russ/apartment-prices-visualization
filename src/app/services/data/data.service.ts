import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  data: any;

  constructor(private http: HttpClient) { 
    this.loadData();
  }

  loadData() {
    this.http.get('assets/r6siege-data.json').subscribe(data => this.data = data);
  }

}
