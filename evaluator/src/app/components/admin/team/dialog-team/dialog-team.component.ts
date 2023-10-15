import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-team',
  templateUrl: './dialog-team.component.html',
  styleUrls: ['./dialog-team.component.scss']
})
export class DialogTeamComponent implements OnInit {
  form!: FormGroup;

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService, private _dialogRef: MatDialogRef<DialogTeamComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      username: '',
      role: ''
    });
    if (this.data) this.form.patchValue(this.data);
  }

  clearForm(): void { this.form.reset(); }

  onSubmit(data: any) {
    data.role = 'group';
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('user', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Equipe atualizada com sucesso.', true);
            this.closeDialog();
          },
          error: (error: any) => {
            this._updateService.notify('Erro ao atualizar equipe.');
            console.error(error);
          }
        });
    } else {
      this._httpService.post('user', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Equipe adicionada com sucesso.', true);
            this.clearForm();
          },
          error: (error: any) => {
            this._updateService.notify('Erro ao adicionar equipe.');
            console.error(error);
          }
        });
    }
  }

  closeDialog(): void { this._dialogRef.close(); }
}
