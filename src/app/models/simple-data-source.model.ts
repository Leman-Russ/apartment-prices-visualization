import { Observable } from "rxjs/Observable";
import { DataSource } from "@angular/cdk/collections";

export class SimpleDataSource extends DataSource<any> {
  
    constructor(private data: any) { 
      super(); 
    }
  
    connect(): Observable<any> {
      return Observable.of(this.data);
    }
  
    disconnect() {}
    
  }