import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  form!: FormGroup

  challengeList: string[] = ['desafio1', 'desafio2', 'desafio3'];
  challenge: string = '';
  type: string = 'Enviar';

  constructor() { }

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
