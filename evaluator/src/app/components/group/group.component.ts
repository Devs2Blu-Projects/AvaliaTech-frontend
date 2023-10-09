import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  form!: FormGroup
  listaDesafios: string[] = ['desafio1', 'desafio2', 'desafio3'];
  selectedDesafio: string = '';
  tipo:string = 'Enviar'

  criterios = [
    { nome: 'Critério 1', nota: 7.5 },
    { nome: 'Critério 2', nota: 9.0 },
    { nome: 'Critério 3', nota: 6.8 },
    { nome: 'Critério 4', nota: 8.4 },
    { nome: 'Critério 5', nota: 9.8 },
  ];
  onSubmit(data:any){
    
  }
}
