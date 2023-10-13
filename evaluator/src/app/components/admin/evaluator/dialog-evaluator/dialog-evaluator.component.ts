import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-evaluator',
  templateUrl: './dialog-evaluator.component.html',
  styleUrls: ['./dialog-evaluator.component.scss']
})
export class DialogEvaluatorComponent {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService, private _dialogRef: MatDialogRef<DialogEvaluatorComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      username: '',
      password: '',
      role: 'user'
    });

    if (this.data) this.form.patchValue(this.data);
  }

  clearForm(): void { this.form.reset(); }

  onSubmit(data: any) {
    if (this.form.valid) if (data.id) {
      this._updateService.startTimer();
      this._httpService.putById('user', data.id, data)
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Avaliador atualizado com sucesso.');
            this.toast.showToast();
            this.closeDialog();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao atualizar avaliador.');
            this.toast.showToast();
            console.error(error);
          }
        });
    } else {
      this._httpService.post('user', data)
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Avaliador adicionado com sucesso.');
            this.toast.showToast();
            this.clearForm();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao adicionar avaliador.');
            this.toast.showToast();
            console.error(error);
          }
        });
    }
  }

  closeDialog(): void { this._dialogRef.close(); }
}
