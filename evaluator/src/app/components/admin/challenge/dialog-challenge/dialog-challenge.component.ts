import { ToastComponent } from './../../../../shared/components/toast/toast.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-challenge',
  templateUrl: './dialog-challenge.component.html',
  styleUrls: ['./dialog-challenge.component.scss']
})
export class DialogChallengeComponent implements OnInit {
  form!: FormGroup;

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

  @ViewChild(ToastComponent) toast!: ToastComponent;

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: ''
    });
  }

  clearForm(): void { this.form.reset(); }

  patch(data: any): void { this.form.patchValue(data); }

  onSubmit(data: any) {
    if (this.form.valid) if (data.id) {
      this._updateService.startTimer();
      this._httpService.putById('proposition', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Desafio atualizado com sucesso.');
            this.toast.showToast();
            this.clearForm();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao atualizar desafio.');
            this.toast.showToast();
            console.error(error);
          }
        });
    } else {
      this._httpService.post('proposition', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Desafio adicionado com sucesso.');
            this.toast.showToast();
            this.clearForm();
          },
          error: (error: any) => {
            this.toast.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Erro ao adicionar desafio.');
            this.toast.showToast();
            console.error(error);
          }
        });
    }
  }
}
