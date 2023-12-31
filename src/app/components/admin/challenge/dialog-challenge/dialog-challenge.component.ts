import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-challenge',
  templateUrl: './dialog-challenge.component.html',
  styleUrls: ['./dialog-challenge.component.scss']
})
export class DialogChallengeComponent implements OnInit {
  form!: FormGroup;
  notifications: string[] = ['Erro ao atualizar desafio.', 'Erro ao adicionar desafio.']

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService, private _dialogRef: MatDialogRef<DialogChallengeComponent>, @Inject(MAT_DIALOG_DATA) private _data: any) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: ''
    });
    if (this._data) this.form.patchValue(this._data);
  }

  clearForm(): void { this.form.reset(); }

  onSubmit(data: any) {
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('proposition', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Desafio atualizado com sucesso.', true);
            this.closeDialog();
          },
          error: (error: any) => {
            this._updateService.notify(this.notifications[0]);
            console.error(error);
          }
        });
    } else {
      this._httpService.post('proposition', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Desafio adicionado com sucesso.', true);
            this.clearForm();
          },
          error: (error: any) => {
            this._updateService.notify(this.notifications[1]);
            console.error(error);
          }
        });
    }
  }

  closeDialog(): void { this._dialogRef.close(); }
}
