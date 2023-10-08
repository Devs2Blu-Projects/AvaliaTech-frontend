import { Component } from '@angular/core';
import { DialogGroupComponent } from './dialog-group/dialog-group.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  constructor(private _dialog:MatDialog){
    
  }

  openDialog(): void { this._dialog.open(DialogGroupComponent); }
}
