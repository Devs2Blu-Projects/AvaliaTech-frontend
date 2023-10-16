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
  updateRef!: Subscription;
  errorMsg: string = 'Erro ao carregar eventos.';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _logoutService: LogoutService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getAll();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: any) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getAll();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  getAll(): void {
    this._httpService.getAll('event', { responseType: 'json' })
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  logout(): void { this._logoutService.logout(); }
}
