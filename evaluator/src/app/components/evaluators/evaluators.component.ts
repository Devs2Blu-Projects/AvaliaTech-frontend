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

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialog: MatDialog) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {
    this.getEvaluator(this.data.id);
    this._updateService.update
      .subscribe({
        next: () => {
          this.getEvaluator(this.data.id);
          this.toast.notification = this._updateService.getNotification();
        }
      });
  }

  getEvaluator(id: number): void {
    this._httpService.getbyId('user', id)
      .subscribe({
        next: (response: any) => { this.data = response; },
        error: () => {
          this._updateService.notify('Erro ao carregar avaliador.');
          this.toast.showToast();
        }
      });
  }

  openDialog(): void { this._dialog.open(DialogAssessmentComponent); }
}
