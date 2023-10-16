import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-evaluator',
  templateUrl: './dialog-evaluator.component.html',
  styleUrls: ['./dialog-evaluator.component.scss']
})
export class DialogEvaluatorComponent {
  form!: FormGroup;
  notifications: string[] = ['Erro ao atualizar avaliador.', 'Erro ao adicionar avaliador.'];

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService, private _dialogRef: MatDialogRef<DialogEvaluatorComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

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
    data.role = 'user';
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('user', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Avaliador atualizado com sucesso.', true);
            this.closeDialog();
          },
          error: (error: any) => {
            this._updateService.notify(this.notifications[0]);
            console.error(error);
          }
        });
    } else {
      this._httpService.post('user', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this._updateService.notify('Avaliador adicionado com sucesso.', true);
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
