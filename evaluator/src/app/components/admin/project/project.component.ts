import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectComponent } from './dialog-project/dialog-project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  constructor(private _dialog: MatDialog){

  }

  openDialogProject(){
    const dialogRef = this._dialog.open(DialogProjectComponent)
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val) this.getProjectsList();
      }
    })
  }

  getProjectsList(){
    
  }
}
