import { Subscription } from 'rxjs';
import { UpdateService } from './../../shared/services/update/update.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssessmentComponent } from './dialog-assessment/dialog-assessment.component';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.scss']
})
export class EvaluatorsComponent implements OnInit, OnDestroy {
  data: any = [];
  updateRef!: Subscription;
  errorMsg: string = 'Erro ao carregar apresentações.';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog, private _logoutService: LogoutService, private _authService:AuthService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getPresentationsByEvaluator();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getPresentationsByEvaluator();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  getPresentationsByEvaluator(): void {
    this._httpService.getAll('group/rate', this._authService.getUserId())
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: (error: any) => {
          this._updateService.notify(this.errorMsg);
          console.error(error);
        }
      });
  }

  openDialog(): void { this._dialog.open(DialogAssessmentComponent); }

  logout(): void { this._logoutService.logout(); }
}
