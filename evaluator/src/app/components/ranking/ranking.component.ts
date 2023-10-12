import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit{

  groups: any[];
  revelado1: boolean = false;
  revelado2: boolean = false;
  revelado3: boolean = false;
  currentRevelado: number = 3;

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
    this.groups.sort((a, b) => b.rating - a.rating);
  }
  
  ngOnInit(): void {
    
  }
  rainConfetti() {
    const duration = 50000;
  
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');
  
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
  
    const removeCanvas = () => {
      document.body.removeChild(canvas);
    };
  
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
  
    window.addEventListener('resize', handleResize);
    handleResize();
  
    const myConfetti = confetti.create(canvas, {
      resize: true,
    });
  
    myConfetti({
      particleCount: 700,
      spread: 150,
      origin: { y: 0 },
    });
  

    setTimeout(() => {
      window.removeEventListener('resize', handleResize);
      removeCanvas();
    }, duration);
  }

  revelar() {
    const cards = document.querySelectorAll('.card');

    if (this.currentRevelado === 3) {
      //cards[2].classList.remove('tremor3');
      this.revelado3 = true;
      this.currentRevelado = 2;
    } else if (this.currentRevelado === 2) {
      //cards[1].classList.remove('tremor2');
      this.revelado2 = true;
      this.currentRevelado = 1;
    } else if (this.currentRevelado === 1) {
      //cards[0].classList.remove('tremor1');
      this.revelado1 = true;
      this.rainConfetti();
    }
  }
  
}
