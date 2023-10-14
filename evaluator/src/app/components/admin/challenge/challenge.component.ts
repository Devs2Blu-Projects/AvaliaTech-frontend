import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogChallengeComponent } from './dialog-challenge/dialog-challenge.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {
  data: any = [];
  errorMsg: string = 'Erro ao carregar desafios.';
  filter = '';
  filterCols = ['id','name'];

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
    this._httpService.getAll('proposition')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  edit(data: any): void { this.openDialog(data); }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('proposition', data.id, { responseType: 'text' })
      .subscribe({
        next: () => { this._updateService.notify('Desafio excluído com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify('Erro ao excluir desafio.');
          console.error(error);
        }
      });
  }

  openDialog(data: any = null): void { this._dialog.open(DialogChallengeComponent, { data: data }); }
}
