import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCriterionComponent } from './dialog-criterion/dialog-criterion.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit{
  data: any = [];

  filter = '';
  filterCols = ['id','name','description'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogCriterionComponent) form!: DialogCriterionComponent;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: () => {
          this.getAll();
          this.toast.notification = this._updateService.getNotification();
        }
      });
  }

  getAll(): void {
    this._httpService.getAll('criterion')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar critérios.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  edit(data: any): void { this.form.patch(data); }

  remove(data: any) {
    this._updateService.startTimer();
    this._httpService.deleteById('criterion', data.id)
      .subscribe({
        next: () => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Critério excluído com sucesso.');
          this.toast.showToast();
        },
        error: (error: any) => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Erro ao excluir critério.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  openDialog(): void { this._dialog.open(DialogCriterionComponent); }
}
