import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-team',
  templateUrl: './dialog-team.component.html',
  styleUrls: ['./dialog-team.component.scss']
})
export class DialogTeamComponent {

  formTeam: any
  showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  constructor(public _fb:FormBuilder, private _dialogRef:MatDialogRef<DialogTeamComponent>) { 
    this.formTeam = _fb.group({
      representante: '',
      usuario: '',
      senha: '',
      email:''
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }
}
