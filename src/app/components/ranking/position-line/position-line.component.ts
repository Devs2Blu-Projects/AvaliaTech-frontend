import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-position-line',
  templateUrl: './position-line.component.html',
  styleUrls: ['./position-line.component.scss']
})
export class PositionLineComponent {
  @Input() index: number = 0;
  @Input() data: any;
}
