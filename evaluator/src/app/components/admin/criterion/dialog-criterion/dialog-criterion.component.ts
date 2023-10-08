import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-criterion',
  templateUrl: './dialog-criterion.component.html',
  styleUrls: ['./dialog-criterion.component.scss']
})
export class DialogCriterionComponent {
  form!: FormGroup;
  elapsedTime: number = 0;

  constructor(public _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

<<<<<<< Updated upstream
  ngOnInit(): void { this.buildForm(); }
=======
  constructor(public _fb:FormBuilder, private _dialogRef:MatDialogRef<DialogCriterionComponent>) { 
    this.formCriterion = _fb.group({
      nome: '',
      descricao: ''
    })
  }
>>>>>>> Stashed changes

  buildForm(): void {
    this._fb.group({
      type: '',
      description: ''
    });
  }

  clearForm(): void { this.form.reset(); }

  patch(data: object): void { this.form.patchValue(data); }

  onSubmit(data: any) {
    if (this.form.valid) if (data.id) {
      this._updateService.startTimer();
      this._httpService.putById('criteria', data.id, data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Critério atualizado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    } else {
      this._httpService.post('criteria', data)
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Critério adicionado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    }
  }
}
