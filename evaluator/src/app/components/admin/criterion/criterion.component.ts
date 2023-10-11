import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCriterionComponent } from './dialog-criterion/dialog-criterion.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit{
  data: any = [];
  elapsedTime: number = 0;
  notification: string = '';

  filter = '';
  filterCols = ['id','name','description'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogCriterionComponent) form!: DialogCriterionComponent;

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
    this._httpService.getAll('criterion')
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.elapsedTime = this._updateService.stopTimer();
        }, error: (error: any) => { console.error(error); }
      });
  }

  edit(data: object): void { this.form.patch(data); }

  remove(data: any) {
    this._updateService.startTimer();
    this._httpService.deleteById('criteria', data.id)
      .subscribe({
        next: () => {
          this.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Critério removido com sucesso.');
          this._updateService.showToast();
        },
        error: (error: any) => { console.error(error); }
      });
  }

  openDialog(): void { this._dialog.open(DialogCriterionComponent); }
}
