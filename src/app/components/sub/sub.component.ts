import { OnChanges, Input, SimpleChanges } from '@angular/core';

export abstract class SubComponent implements OnChanges {
  @Input() data: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes["data"].currentValue ? changes["data"].currentValue : this.data;
  }
}
