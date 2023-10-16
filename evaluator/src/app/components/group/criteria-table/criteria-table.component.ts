import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-criteria-table',
  templateUrl: './criteria-table.component.html',
  styleUrls: ['./criteria-table.component.scss']
})
export class CriteriaTableComponent {
  @Input() data: any = [];
}
