import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogProjectComponent } from './dialog-project/dialog-project.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  data: any = [];
  elapsedTime: number = 0;
  notification: string = '';

  filter = '';
  filterCols = ['id','name'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogProjectComponent) form!: DialogProjectComponent;

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
    this._httpService.getAll('proposition')
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.elapsedTime = this._updateService.stopTimer();
        }, error: (error: any) => { console.error(error); }
      });
  }

  edit(data: object): void { this.form.patch(data); }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('proposition', data.id, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Projeto removido com sucesso.');
          this._updateService.showToast();
        },
        error: (error: any) => { console.error(error); }
      });
  }

  openDialog(): void { this._dialog.open(DialogProjectComponent); }
}
