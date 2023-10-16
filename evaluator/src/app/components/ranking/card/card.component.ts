import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() cardColor: 'gold' | 'silver' | 'bronze' = 'bronze';
  @Input() cardTitle: string = '';
  @Input() revealed: boolean = false;
  @Input() data?: any;
}
