import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssessmentComponent } from './dialog-assessment/dialog-assessment.component';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.scss']
})
export class EvaluatorsComponent {

  constructor(private _dialog: MatDialog){
    
  }
  
  openDialog(): void { this._dialog.open(DialogAssessmentComponent); }

}
