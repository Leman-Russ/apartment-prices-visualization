import { OnChanges, Input, SimpleChanges } from '@angular/core';
import { Data } from '../../models/data.model';

export abstract class SubComponent implements OnChanges {
  @Input() data: Data[];

  ngOnChanges(changes: SimpleChanges) {
    if (this.data !== undefined) {
      this.onDataChange();
    }
  }

  abstract onDataChange();
}
