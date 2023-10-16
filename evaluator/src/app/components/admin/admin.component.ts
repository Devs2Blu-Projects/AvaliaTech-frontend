import { Subscription } from 'rxjs';
import { UpdateService } from 'src/app/shared/services/update/update.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  data: any = [];
  selectedData: any;
  updateRef!: Subscription;
  notifications: string[] = ['Erro ao carregar eventos.', 'Erro ao carregar evento selecionado.', 'Erro ao alterar evento.'];

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _logoutService: LogoutService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this.updateRef = this._updateService.update
      .subscribe({
        next: () => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  getAll(): void {
    this._httpService.getAll('event', { responseType: 'json' })
      .subscribe({
        next: (response: any) => {
          this.data = response;
          this.getSelectedEvent();
        },
        error: (error: any) => {
          this._updateService.notify(this.notifications[0]);
          console.error(error);
        }
      });
  }

  getSelectedEvent(): void {
    this._updateService.startTimer();
      this._httpService.getAll('global/currentEvent', { responseType: 'json' })
      .subscribe({
        next: (response: any) => { this.selectedData = response.id; },
        error: (error: any) => {
          this._updateService.notify(this.notifications[1]);
          console.error(error);
        }
      });
  }

  putSelectedEvent(id: number): void {
    this._updateService.startTimer();
    this._httpService.putById('global/currentEvent', id, { }, { responseType: 'text' })
      .subscribe({
        next: () => { this._updateService.notify('Evento alterado com sucesso.', true); },
        error: (error: any) => {
          this._updateService.notify(this.notifications[2]);
          console.error(error);
        }
      });
  }

  logout(): void { this._logoutService.logout(); }
}
