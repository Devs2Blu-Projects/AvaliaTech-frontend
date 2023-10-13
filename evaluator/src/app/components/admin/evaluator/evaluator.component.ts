import * as bootstrap from 'bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEvaluatorComponent } from './dialog-evaluator/dialog-evaluator.component';
import { HttpService } from '../../../shared/services/http/http.service';
import { UpdateService } from '../../../shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-evaluator',
  templateUrl: './evaluator.component.html',
  styleUrls: ['./evaluator.component.scss']
})
export class EvaluatorComponent implements OnInit {
  data: any = [];
  newPassword: string = '';

  filter = '';
  filterCols = ['id', 'name', 'username'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogEvaluatorComponent) form!: DialogEvaluatorComponent;
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
    this._httpService.getAll('user/role/user')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar avaliadores.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  edit(data: object): void { this.form.patch(data); }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('user', data.id)
      .subscribe({
        next: () => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Avaliador excluído com sucesso.');
          this.toast.showToast();
        },
        error: (error: any) => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Erro ao excluir avaliador.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  generatePassword(data: any) {
    this.newPassword = 'Gerando...'

    this._httpService.getAll(`user/${data.id}/redefine`, { responseType: 'text' }).subscribe({
      next: (response) => {
        console.log(this.newPassword)
        this.newPassword = response
        console.log(this.newPassword)
      },
      error: (error: any) => { console.error(error); }
    })
  }
  copyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    this._updateService.notify('Senha copiada com sucesso.');
    this.toast.showToast();
  }
  openDialog(): void { this._dialog.open(DialogEvaluatorComponent); }
}
