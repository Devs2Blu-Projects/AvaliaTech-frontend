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
  errorMsg: string = 'Erro ao carregar critérios.';
  filter = '';
  filterCols = ['id','name','description'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getAll();
        }
      });
  }

  getAll(): void {
    this._httpService.getAll('criterion')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  edit(data: any): void { this.openDialog(data), { data }; }

  remove(data: any) {
    this._updateService.startTimer();
    this._httpService.deleteById('criterion', data.id)
      .subscribe({
        next: () => { this._updateService.notify('Critério excluído com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify('Erro ao excluir critério.');
          console.error(error);
        }
      });
  }

  openDialog(data: any = null): void { this._dialog.open(DialogCriterionComponent, { data: data }); }
}
