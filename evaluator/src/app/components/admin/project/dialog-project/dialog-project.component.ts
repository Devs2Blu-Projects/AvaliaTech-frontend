import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http/http.service';
import { UpdateService } from 'src/app/shared/services/update/update.service';

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.scss']
})
export class DialogProjectComponent implements OnInit {
  form!: FormGroup;
  elapsedTime: number = 0;
  criteriaList: any[] = ['criterio1', 'criterio2', 'criterio3', 'criterio4', 'criterio5'];

  constructor(public _fb: FormBuilder, private _httpService: HttpService, private _updateService: UpdateService) { }

  ngOnInit(): void { this.buildForm(); }

  buildForm(): void {
    this.form = this._fb.group({
      id: [],
      name: '',
      propositionCriteria: this._fb.array([
        this._fb.group({
          id: [],
          weight: '',
          propositionId: '',
          criterionId: '',
        })
      ]),
      weight: []
    });

    // Adicione controles para seleção e peso de cada critério dinamicamente
    this.criteriaList.forEach((criterion, index) => {
      this.form.addControl('criterion' + index, new FormControl(false)); // Checkbox
      this.form.addControl('weight' + index, new FormControl('')); // Campo de entrada numérica
    });
  }

  clearForm(): void { this.form.reset(); }

  patch(data: object): void { this.form.patchValue(data); }

  onSubmit(data: any) {
    if (this.form.valid) if (data.id) {
      this._updateService.startTimer();
      this._httpService.putById('proposition', data.id, data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Projeto atualizado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    } else {
      this._httpService.post('proposition', data, { responseType: 'text' })
        .subscribe({
          next: () => {
            this.elapsedTime = this._updateService.stopTimer();
            this._updateService.notify('Projeto adicionado com sucesso.');
            this._updateService.showToast();
            this.clearForm();
          },
          error: (error: any) => { console.error(error); }
        });
    }
  }
}
