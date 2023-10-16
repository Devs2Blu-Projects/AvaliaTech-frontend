import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-criteria-table',
  templateUrl: './criteria-table.component.html',
  styleUrls: ['./criteria-table.component.scss']
})
export class CriteriaTableComponent {
  maxWeight: number = 0;

  _data: any;
  get data(): any {
      return this._data;
  }
  @Input() set data(value: any) {
      this._data = value;
      this.maxWeight = this.updateMaxWeight();
  }

  updateMaxWeight(): number {
    let result = 0;
    this._data?.groupRatings.forEach((rating: any) => {
      result += rating.criterion.weight * 5;
    });
    return result;
  }
}
