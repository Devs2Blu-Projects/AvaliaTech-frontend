import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEvaluatorComponent } from './dialog-evaluator/dialog-evaluator.component';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.scss']
})
export class EvaluatorComponent {
  
  constructor(private _dialog:MatDialog){}

  openDialogEvaluator(){
    const dialogRef = this._dialog.open(DialogEvaluatorComponent)
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val) this.getEvaluatorsList();
      }
    })
  }

  getEvaluatorsList(){
    
  }
}
