import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-evaluator',
  templateUrl: './dialog-evaluator.component.html',
  styleUrls: ['./dialog-evaluator.component.scss']
})
export class DialogEvaluatorComponent {
  form!: FormGroup;
  elapsedTime: number = 0;
  showPassword: boolean = false;

  constructor(public _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      username: '',
      password: '',
      role: 'user'
    });
  }

  clearForm(): void { this.form.reset(); }

  patch(data: object): void { this.form.patchValue(data); }

  onSubmit(data: any) {
    if (this.form.valid) if (data.id) {
      this._updateService.startTimer();
      this._httpService.putById('user', data.id, data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Avaliador atualizado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    } else {
      this._httpService.post('user', data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Avaliador adicionado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    }
  }

  togglePasswordVisibility() { this.showPassword = !this.showPassword; }
}
