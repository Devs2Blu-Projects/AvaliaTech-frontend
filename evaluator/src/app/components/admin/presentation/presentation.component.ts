import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogRandomComponent } from './dialog-random/dialog-random.component';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {

  constructor(private _dialog: MatDialog){

  }

  openDialogRandom(){
    const dialogRef = this._dialog.open(DialogRandomComponent)
  }

}
