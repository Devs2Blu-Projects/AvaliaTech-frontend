import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  form!: FormGroup

  challengeList: string[] = ['desafio1', 'desafio2', 'desafio3'];
  challenge: string = '';
  type: string = 'Enviar';

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: '',
      challenge: '',
      description: '',
      language: '',
      title: '',
    });
  }

  criteria = [
    { name: 'Critério 1', grade: 7.5 },
    { name: 'Critério 2', grade: 9.0 },
    { name: 'Critério 3', grade: 6.8 },
    { name: 'Critério 4', grade: 8.4 },
    { name: 'Critério 5', grade: 9.8 },
  ];

  onSubmit(data: any) {

  }
}
