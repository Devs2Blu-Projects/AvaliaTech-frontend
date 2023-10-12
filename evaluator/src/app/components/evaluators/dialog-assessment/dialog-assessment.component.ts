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
      peso: 4,
      nota: null
    },
    {
      nome: 'Desempenho',
      peso: 7,
      nota: null
    },
    {
      nome: 'Segurança',
      peso: 3,
      nota: null
    },
    {
      nome: 'Compatibilidade',
      peso: 6,
      nota: null
    },
    {
      nome: 'Manutenibilidade',
      peso: 8,
      nota: null
    },
    {
      nome: 'Inovação',
      peso: 5,
      nota: null
    },
    {
      nome: 'Custo',
      peso: 2,
      nota: null
    },
    {
      nome: 'Integração',
      peso: 6,
      nota: null
    },
    {
      nome: 'Documentação',
      peso: 4,
      nota: null
    },
    {
      nome: 'Suporte',
      peso: 3,
      nota: null
    }
  ];
  checkInvalidNote(criterion:any): boolean {
    return criterion.nota < 0 || criterion.nota > 5;
  }
  
}
