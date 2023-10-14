import { UpdateService } from './../../shared/services/update/update.service';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAssessmentComponent } from './dialog-assessment/dialog-assessment.component';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';

@Component({
  selector: 'app-evaluators',
  templateUrl: './evaluators.component.html',
  styleUrls: ['./evaluators.component.scss']
})
export class EvaluatorsComponent implements OnInit {
  data: any;
  errorMsg: string = 'Erro ao carregar apresentações.';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getPresentationsByEvaluator();
    this._updateService.update
      .subscribe({
        next: (response: string) => {
          this.toast.elapsedTime = this._updateService.getElapsedTime();
          this.toast.notification = this._updateService.getNotification();
          this.toast.showToast();

          if (response !== this.errorMsg) this.getPresentationsByEvaluator();
        }
      });
  }

  getPresentationsByEvaluator(): void {

  }

  openDialog(): void { this._dialog.open(DialogAssessmentComponent); }
}
