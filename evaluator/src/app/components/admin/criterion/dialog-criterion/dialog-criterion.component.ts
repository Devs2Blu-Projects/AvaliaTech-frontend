import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-criterion',
  templateUrl: './dialog-criterion.component.html',
  styleUrls: ['./dialog-criterion.component.scss']
})
export class DialogCriterionComponent {

  formCriterion: any

  constructor(public _fb:FormBuilder, private _dialogRef:MatDialogRef<DialogCriterionComponent>) { 
    this.formCriterion = _fb.group({
      tipo: '',
      descricao: ''
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
}
