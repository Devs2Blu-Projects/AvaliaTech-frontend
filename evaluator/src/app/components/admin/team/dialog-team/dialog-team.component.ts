import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-team',
  templateUrl: './dialog-team.component.html',
  styleUrls: ['./dialog-team.component.scss']
})
export class DialogTeamComponent implements OnInit {
  form!: FormGroup;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, 
    private _httpService: HttpService, 
    private _updateService: UpdateService,
    private _dialogRef: MatDialogRef<DialogTeamComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      username: '',
      role: 'group'
    });

    if (this.data) {
      this.form.patchValue(this.data)
    }
  }

  clearForm(): void { this.form.reset(); }

  patch(data: any): void { this.data = data; }

  onSubmit(data: any) {
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('user', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Equipe atualizada com sucesso.');
            this.toast.showToast();
            this._dialogRef.close();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao atualizar equipe.');
            this.toast.showToast();
            console.error(error);
          }
        });
    } else {
      this._httpService.post('user', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Equipe adicionada com sucesso.');
            this.toast.showToast();
            this.clearForm();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao adicionar equipe.');
            this.toast.showToast();
            console.error(error);
          }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
