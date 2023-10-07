import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-evaluator',
  templateUrl: './dialog-evaluator.component.html',
  styleUrls: ['./dialog-evaluator.component.scss']
})
export class DialogEvaluatorComponent {

  formEvaluator: any
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(public _fb:FormBuilder, private _dialogRef:MatDialogRef<DialogEvaluatorComponent>) { 
    this.formEvaluator = _fb.group({
      nome: '',
      usuario: '',
      senha: '',
      email: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
}
