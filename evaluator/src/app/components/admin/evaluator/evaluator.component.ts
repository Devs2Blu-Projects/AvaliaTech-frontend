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
  errorMsg: string = 'Erro ao carregar avaliadores.';
  newPassword: string = '';
  filter = '';
  filterCols = ['id', 'name', 'username'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this._updateService.update
      .subscribe({
        next: (response: any) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getAll();
        }
      });
  }

  getAll(): void {
    this._httpService.getAll('user/role/user')
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
    this._httpService.deleteById('user', data.id, { responseType: 'text' })
      .subscribe({
        next: () => { this._updateService.notify('Avaliador excluído com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify('Erro ao excluir avaliador.', true);
          console.error(error);
        }
      });
  }

  generatePassword(data: any) {
    this._updateService.startTimer();
    this.newPassword = 'Gerando...'
    this._httpService.getAll(`user/${data.id}/redefine`, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          this.newPassword = response;
          this._updateService.notify('Senha gerada com sucesso.', true);
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao gerar senha.');
          console.error(error);
        }
    });
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text);
    this._updateService.notify('Senha copiada para a área de transferência.');

    // const textArea = document.createElement('textarea');
    // textArea.value = text;
    // document.body.appendChild(textArea);
    // textArea.select();
    // document.execCommand('copy');
    // document.body.removeChild(textArea);
  }

  openDialog(data: any = null): void { this._dialog.open(DialogEvaluatorComponent, { data: data }); }
}
