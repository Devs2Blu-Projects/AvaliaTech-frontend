import { Subscription } from 'rxjs';
import { UpdateService } from './../../shared/services/update/update.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssessmentComponent } from './dialog-assessment/dialog-assessment.component';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { LogoutService } from 'src/app/shared/services/logout/logout.service';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.scss']
})
export class EvaluatorsComponent implements OnInit, OnDestroy {
  data: any;
  updateRef!: Subscription;
  errorMsg: string = 'Erro ao carregar apresentações.';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog, private _logoutService: LogoutService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getPresentations();
    this.updateRef = this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getPresentations();
        }
      });
  }

  ngOnDestroy(): void { this.updateRef.unsubscribe(); }

  getPresentations(): void {
    // TODO
  }

  openDialog(): void { this._dialog.open(DialogAssessmentComponent); }

  logout(): void { this._logoutService.logout(); }
}
