import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-assessment',
  templateUrl: './dialog-assessment.component.html',
  styleUrls: ['./dialog-assessment.component.scss']
})
export class DialogAssessmentComponent {

  listCriteria: any[] = [
    {
      nome: 'Usabilidade',
      peso: 4
    },
    {
      nome: 'Desempenho',
      peso: 7
    },
    {
      nome: 'Segurança',
      peso: 3
    },
    {
      nome: 'Compatibilidade',
      peso: 6
    },
    {
      nome: 'Manutenibilidade',
      peso: 8
    },
    {
      nome: 'Inovação',
      peso: 5
    },
    {
      nome: 'Custo',
      peso: 2
    },
    {
      nome: 'Integração',
      peso: 6
    },
    {
      nome: 'Documentação',
      peso: 4
    },
    {
      nome: 'Suporte',
      peso: 3
    }
  ];
  
}
