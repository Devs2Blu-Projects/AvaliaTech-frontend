import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.scss']
})
export class DialogProjectComponent {

  formProject: FormGroup;

  listaCriterios: any[] = ['criterio1', 'criterio2', 'criterio3', 'criterio4', 'criterio5'];

  constructor(public _fb: FormBuilder, private _dialogRef: MatDialogRef<DialogProjectComponent>) { 
    this.formProject = _fb.group({
      titulo: '',
    });

    // Adicione controles para seleção e peso de cada critério dinamicamente
    this.listaCriterios.forEach((criterio, index) => {
      this.formProject.addControl('selecionarCriterio' + index, new FormControl(false)); // Checkbox
      this.formProject.addControl('pesoCriterio' + index, new FormControl('')); // Campo de entrada numérica
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Lógica de submissão aqui
  }
}
