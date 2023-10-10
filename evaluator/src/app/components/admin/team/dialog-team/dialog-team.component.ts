import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-team',
  templateUrl: './dialog-team.component.html',
  styleUrls: ['./dialog-team.component.scss']
})
export class DialogTeamComponent implements OnInit {
  form!: FormGroup;
  elapsedTime: number = 0;
  showPassword: boolean = false;

  constructor(private _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      username: '',
      password: '',
      role: 'Group'
    });
  }

  clearForm(): void { this.form.reset(); }

  patch(data: object): void { this.form.patchValue(data); }

  onSubmit(data: any) {
    this._updateService.startTimer();
    if (this.form.valid) if (data.id) {
      this._httpService.putById('teams', data.id, data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Equipe atualizada com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    } else {
      this._httpService.post('teams', data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Equipe adicionada com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    }
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }
}
