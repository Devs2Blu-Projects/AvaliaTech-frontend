import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCriterionComponent } from './dialog-criterion/dialog-criterion.component';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent {

  constructor(private _dialog:MatDialog){}

  openDialogCriterion(){
    const dialogRef = this._dialog.open(DialogCriterionComponent)
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val) this.getCriteriaList();
      }
    })
  }

  getCriteriaList(){
    
  }
}
