import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EventModel } from '../../../../shared/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../../../shared/services/http/http.service';
import { UpdateService } from '../../../../shared/services/update/update.service';
import { ToastComponent } from '../../../../shared/components/toast/toast.component';
import { DialogTeamComponent } from '../../team/dialog-team/dialog-team.component';

@Component({
  selector: 'app-dialog-presentation',
  templateUrl: './dialog-presentation.component.html',
  styleUrls: ['./dialog-presentation.component.scss']
})
export class DialogPresentationComponent implements OnInit {
  event: EventModel = this._data.event;
  action: 'close' | 'publish' = this._data.action as 'close' | 'publish';

  constructor(private _httpService: HttpService, private _updateService: UpdateService, private _dialogRef: MatDialogRef<DialogTeamComponent>,@Inject(MAT_DIALOG_DATA) private _data: { action: string, event: EventModel }) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void {

  }

  closeEvent(event: EventModel) {
    this.event.isClosed = true;
    this._httpService.put('global/currentEvent/close', this.event)
      .subscribe({
        next: () => {
          this._updateService.notify('Evento fechado com sucesso!');
          this.toast.showToast();
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao fechar evento.');
          this.toast.showToast();
          console.error(error);
        }
      })

    this.closeDialog();
  }

  publishEvent(event: EventModel) {
    this.event.isPublic = true;
    this._httpService.put('global/currentEvent/public', this.event)
      .subscribe({
        next: () => {
          this._updateService.notify('Evento publicado com sucesso!');
          this.toast.showToast();
        },
        error: (error: any) => {
          this._updateService.notify('Erro ao publicar evento.');
          this.toast.showToast();
          console.error(error);
        }
      })

    this.closeDialog();
  }

  closeDialog() { this._dialogRef.close() }
}
