import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit{

  groups: any[];
  public revelado: boolean = false;
  public botaoVisivel: boolean = true;

  constructor() {
    this.groups = [
      {
        projectName: 'Hack Week Evaluator',
        stack: 'Angular',
        teamMembers: 'Caio Diego, Helena Luz, Rafael Reinerd, Rob, Claudia, Raphael Theodoro, Francisco José, Pedro Nascimento, Maria Antônia',
        rating: 9.5,
      },
      {
        projectName: 'Projeto 2',
        stack: 'React',
        teamMembers: 'Membro 4, Membro 5, Membro 6',
        rating: 8.8,
      },
      {
        projectName: 'Projeto 3',
        stack: 'Vue.js',
        teamMembers: 'Membro 7, Membro 8, Membro 9',
        rating: 7.2,
      },
      {
        projectName: 'Projeto 4',
        stack: 'Node.js',
        teamMembers: 'Membro 10, Membro 11, Membro 12',
        rating: 6.0,
      },
      {
        projectName: 'Projeto 5',
        stack: 'Express.js',
        teamMembers: 'Membro 13, Membro 14, Membro 15',
        rating: 8.2,
      },
    ];
  }
  
  ngOnInit(): void {
    this.groups.sort((a, b) => b.rating - a.rating);
  }

  revelarOcultar() {
    this.botaoVisivel = false;
    setTimeout(() => {
      this.revelado = true;
    }, 100);
  }
}
