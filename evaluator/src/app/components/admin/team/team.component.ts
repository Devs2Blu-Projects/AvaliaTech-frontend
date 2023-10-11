import * as bootstrap from 'bootstrap';
import { HttpService } from '../../../shared/services/http/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  filter = '';
  filterCols = ['id','name','username'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogTeamComponent) form!: DialogTeamComponent;

  ngAfterViewInit() {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  }

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
    this._httpService.getAll('user/role/group')
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.elapsedTime = this._updateService.stopTimer();
        },
        error: (error: any) => { console.error(error); }
      });
  }

  edit(data: object): void { this.form.patch(data); }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('user', data.id, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Equipe removida com sucesso.');
          this._updateService.showToast();
        },
        error: (error: any) => { console.error(error); }
      });
  }

  openDialog(): void { this._dialog.open(DialogTeamComponent); }
}
