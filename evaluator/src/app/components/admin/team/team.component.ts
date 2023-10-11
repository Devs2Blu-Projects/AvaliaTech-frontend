import * as bootstrap from 'bootstrap';
import { HttpService } from '../../../shared/services/http/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTeamComponent } from './dialog-team/dialog-team.component';
import { UpdateService } from '../../../shared/services/update/update.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  data: any = [];
  newPassword: string = '';

  filter = '';
  filterCols = ['id','name','username'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(DialogTeamComponent) form!: DialogTeamComponent;
  @ViewChild(ToastComponent) toast!: ToastComponent;

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
          this.toast.notification = this._updateService.getNotification();
        }
      });
  }

  getAll(): void {
    this._httpService.getAll('user/role/group')
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify('Erro ao carregar equipes.');
          this.toast.showToast();
          console.error(error);
        }
      });
  }

  edit(data: object): void { this.form.patch(data); }

  remove(data: any): void {
    this._updateService.startTimer();
    this._httpService.deleteById('user', data.id, { responseType: 'text' })
      .subscribe({
        next: () => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Equipe excluída com sucesso.');
          this.toast.showToast();
        },
        error: (error: any) => {
          this.toast.elapsedTime = this._updateService.stopTimer();
          this._updateService.notify('Erro ao excluir equipe.');
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
  openDialog(): void { this._dialog.open(DialogTeamComponent); }
}
