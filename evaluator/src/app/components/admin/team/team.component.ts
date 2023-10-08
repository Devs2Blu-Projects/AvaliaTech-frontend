import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTeamComponent } from './dialog-team/dialog-team.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  
  constructor(private _dialog:MatDialog){}

  openDialogTeam(){
    const dialogRef = this._dialog.open(DialogTeamComponent)
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val) this.getTeamsList();
      }
    })
  }

  getTeamsList(){
    
  }
}
