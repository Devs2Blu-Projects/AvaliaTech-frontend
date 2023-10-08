import { HttpService } from '../../../shared/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTeamComponent } from './dialog-team/dialog-team.component';
import { UpdateService } from '../../../shared/services/update/update.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  data: any = [];
  elapsedTime: number = 0;
  notification: string = '';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: () => {
          this.getAll();
          this.notification = this._updateService.getNotification();
        }, error: (error: any) => { console.error(error); }
      });
  }

  getAll(): void {
    this._updateService.startTimer();
    this._httpService.getAll('teams')
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.elapsedTime = this._updateService.stopTimer();
        },
        error: (error: any) => { console.error(error); }
      });
  }

  openDialog(): void { this._dialog.open(DialogTeamComponent); }
}
